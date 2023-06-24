import { initStripe } from "../../../lib/stripe";
import { updateMemberLoginStatus } from "../../../lib/member-actions";
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

const activateMemberLogin = async (customerId) => {
  const customerObject = await findStripeCustomerById(customerId);
  const { email: customerEmail } = customerObject;

  if(!customerEmail) {
    throw new Error('No email address was found in the customer stripe object. Cannot activate member');
  }

  const activationResult = await updateMemberLoginStatus({ email: customerEmail, loginDisabled: false });

  if(activationResult.error) {
    throw new Error('Failed to activate member: ', activationResult.error.message);
  }
};

const deactivateMemberLogin = async (customerId) => {
  const customerObject = await findStripeCustomerById(customerId);
  const { email: customerEmail } = customerObject;

  if(!customerEmail) {
    throw new Error('No email address was found in the customer stripe object. Cannot deactivate member');
  }

  const deactivationResult = await updateMemberLoginStatus({ email: customerEmail, loginDisabled: true });

  if(deactivationResult.error) {
    throw new Error('Failed to deactivate member: ', deactivationResult.error.message);
  }
};

// When a subscription is created, the payment collection should be paused
//
// By pausing payment collection, the process of manually approving the membership application can
// begin. The idea is to ensure that the applicant IS NOT charged until after the NZSE committee 
// has reviewed and approved the application.
//
// Note that in addition to pausing the subscription, the subscription starts off with a trial
// period (as setup in stripe) to prevent the automatic charging of the applicant in between
// the creation of the subscription, and pausing the payment collection.
// 
// The collection method is also set to 'send invoice' so that when stripe requires the user to
// pay for their membership, an invoice is sent with instructions on how to pay, instead of
// automatically charging the user's payment method
const handleSubscriptionCreate = async (subscription) => {
  console.log('HANDLE SUBSCRIPTION CREATE CALLED');
  const stripe = await initStripe();
  const { id } = subscription;
  
  try {
    await stripe.subscriptions.update(id, { 
      pause_collection: { 
        behavior: 'keep_as_draft'
      },
      collection_method: 'send_invoice',
      days_until_due: 14 // Days until the invoice is due after it was sent to the user
    });
  } catch (error) {
    throw new Error('Got an error handling subscription create event: ', error);
  }
};

const handleSubscriptionChange = async (subscription) => {
  try {
    const { pause_collection: pauseCollection, customer: customerId, status } = subscription;

    // Deactivate member login if collection was paused, or the subscription has not been paid on
    // time or if it has entered some 'negative' state where payment has not been processed
    if(
      pauseCollection || 
      status === 'unpaid' || 
      status === 'past_due' ||
      status === 'canceled' || 
      status === 'incomplete' || 
      status === 'incomplete_expired' ||
      status === 'paused'
    ) {
      await deactivateMemberLogin(customerId);
      return;
    }

    // If the subscription has been unpaused (i.e. when pauseCollection is null), this means that the 
    // NZSE committee has approved the membership. Therefore, activate the account in firebase to 
    // enable their login
    //
    // 'active' or 'trialling' status is also required to ensure that when the unpause takes place, 
    // the account is only activated if the subscription is in a valid/paid for state (this will 
    // apply if the subscription has been paused and this function has been called because it has 
    // been unpaused)
    if(!pauseCollection && (status === 'active' || status === 'trialing')) {
      await activateMemberLogin(customerId);
      return;
    }

  } catch(error) {
    throw new Error('Error occurred trying to handle a subscription change: ', error);
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
//
// To re-subscribe and gain login access again, a user would have to register again via the join
// page form.
const handleSubscriptionDeleted = async (subscription) => {
  const { customer: customerId } = subscription;
  const customerObject = await findStripeCustomerById(customerId);
  const { email: customerEmail } = customerObject;

  if(!customerEmail) {
    throw new Error('No email address was found in the customer stripe object. Cannot activate member');
  }

  const deletionResult = await deleteMember(customerEmail);

  if(deletionResult.error) {
    throw new Error('Failed to delete member: ', deletionResult.error.message);
  }
};

// A function that converts the request body into a buffer so we can pass it to stripe for
// verification
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
    event = stripe.webhooks.constructEvent(rawBody, signature, 'whsec_d94cdf906ce5cfbce8fb03ddb288a82ef750a970efa6c493a2c56e2cc7696e48');
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
    return;
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
        await handleSubscriptionCreate(event.data.object);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionChange(event.data.object);
        break;
      case 'customer.subscription.deleted':
        handleSubscriptionDeleted(event.data.object);
        break;
      default:
        res.status(200).json({ received: true });
        return;
    }
  } catch(error) {
    throw new Error('Error handling webhook event: ', error.message);
  }

  res.status(200).json({ received: true });
}


