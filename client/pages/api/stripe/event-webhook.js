import { initStripe } from "../../../lib/stripe";
import { activateMember } from "../members/activate-member";
import { deleteMember } from "../members/delete-member";

// Disable the body parser for this api route because we need to send the raw body to Stripe for
// verification
export const config = {
  api: {
    bodyParser: false,
  }
};

const findStripeCustomerById = async (customerId) => {
  const stripe = await initStripe();
  const stripeCustomer = await stripe.customers.retrieve(customerId);
  return stripeCustomer;
};

// Activate the firebase account of the customer in the charge object
const activatePendingMemberAccount = async (charge) => {
  const { customer: customerId } = charge;
  const customerObject = await findStripeCustomerById(customerId);
  const { email: customerEmail } = customerObject;

  if(!customerEmail) {
    throw new Error('No email address was found in the customer stripe object. Cannot activate member');
  }

  const activationResult = await activateMember(customerEmail);

  if(activationResult.error) {
    throw new Error('Failed to activate member: ', activationResult.error.message);
  }
};

// Delete the firebase account of the customer in the charge object.
//
// Deleting the firebase account is important to free up the email address in firebase, ensuring that
// subsequent attempts at registering with the same email address is not blocked by 'email already
// exists' error in firebase
const deletePendingMemberAccount = async (charge) => {
  const { customer: customerId } = charge;
  const customerObject = await findStripeCustomerById(customerId);
  const { email: customerEmail } = customerObject;

  if(!customerEmail) {
    throw new Error('No email address was found in the customer stripe object. Cannot activate member');
  }

  const deletionResult = await deleteMember(customerEmail);

  if(deletionResult.error) {
    throw new Error('Failed to activate member: ', deletionResult.error.message);
  }
};

const pauseSubscriptionOnCreate = async (subscription) => {
  const stripe = await initStripe();
  const { id } = subscription;
  
  await stripe.subscriptions.update(id, { 
    pause_collection: { 
      behavior: 'keep_as_draft'
    }
  });
};

const handleSubscriptionChange = async (subscription) => {
  const { pause_collection: pauseCollection, customer: customerId } = subscription;

  if(pauseCollection) return;

  // If the subscription has been unpaused, this means that the NZSE committee has approved the
  // membership. Therefore, activate the account in firebase to enable their login
  const customerObject = await findStripeCustomerById(customerId);
  const { email: customerEmail } = customerObject;
  
  if(!customerEmail) {
    throw new Error('No email address was found in the customer stripe object. Cannot activate member');
  }

  const activationResult = await activateMember(customerEmail);

  if(activationResult.error) {
    throw new Error('Failed to activate member: ', activationResult.error.message);
  }
};

// When a subscription is deleted, one of 2 scenarios have taken place
// - The subscription was in the initial trial period and was manually rejected by the NZSE
// committee after a manual review
// - The subscription was cancelled manually by NZSE for some other reason (i.e. not because the
// member's application failed to meet the acceptance criteria)
//
// In either case, the member's account is deleted in firebase, irrespective if they were a
// pending/disabled member (which would be the case if the subscription was in the initial trial
// period) or not.
//
// By deleting the account in firebase, login access is effectively revoked.
const handleSubscriptionDeleted = async (subscription) => {
  const { customer: customerId } = subscription;
  const customerObject = await findStripeCustomerById(customerId);
  const { email: customerEmail } = customerObject;

  if(!customerEmail) {
    throw new Error('No email address was found in the customer stripe object. Cannot activate member');
  }

  const deletionResult = await deleteMember(customerEmail);

  if(deletionResult.error) {
    throw new Error('Failed to activate member: ', deletionResult.error.message);
  }
};

// https://vercel.com/guides/how-do-i-get-the-raw-body-of-a-serverless-function#with-node.js
async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if(req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  const stripe = await initStripe();
  const buf = await buffer(req);
  const rawBody = buf.toString('utf8');
  const signature = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET_KEY);
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
    return;
  }

  console.log('------------ event.type: ', event.type);
  
  try {
    switch (event.type) {

      // TODO: Are these charge events needed?
      // TODO: Need to handle if a subscription has not been paid?
      // TODO: Need to not collect payment information on initial sign up, and send an invoice for manual payment...
      // On invoice pay, only then is the account activated... (approval action is to send the invoice) - This will apply for free
      // Events of interest: invoice.paid. invoice.payment_failed
      
      case 'charge.captured':
        await activatePendingMemberAccount(event.data.object);
        break;
      case 'charge.refunded':
        await deletePendingMemberAccount(event.data.object);
        break;
      case 'charge.expired':
        await deletePendingMemberAccount(event.data.object);
        break;
      case 'charge.failed':
        await deletePendingMemberAccount(event.data.object);
        break;
      case 'customer.subscription.created':
        await pauseSubscriptionOnCreate(event.data.object);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionChange(event.data.object);
        break;
      case 'customer.subscription.deleted':
        handleSubscriptionDeleted(event.data.object);
        break;
    }
  } catch(error) {
    console.log('Error handling webhook event: ', error.message);
  }

  res.status(200).json({ received: true });
}


