import { initStripe } from "../../../lib/stripe";
// import { buffer } from "micro";
import { activateMember } from "../members/activate-member";
import { deletePendingMember } from "../members/delete-pending-member";

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
  // console.log('Called delete pending member account with charge);
  const { customer: customerId } = charge;
  const customerObject = await findStripeCustomerById(customerId);
  const { email: customerEmail } = customerObject;
  console.log('deleting acc with email: ', customerEmail);

  if(!customerEmail) {
    throw new Error('No email address was found in the customer stripe object. Cannot activate member');
  }

  const deletionResult = await deletePendingMember(customerEmail);
  console.log('Deletion result: ', deletionResult);

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
  // const bodyBuffer = await buffer(req);
  const buf = await buffer(req);
  const rawBody = buf.toString('utf8');
  const signature = req.headers['stripe-signature'];

  // TODO: add console logs to deletion and activation fns above to see if they are triggering
  // console.log('req.body: ', req.body);
  // console.log('req.rawBody: ', req.rawBody);
  // console.log('rawBody: ', rawBody);

  // const body = process.env.NODE_ENV === 'development' ? bodyBuffer : req.body;

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET_KEY);
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
    return;
  }
  
  // Return 200 here so that the webhook doesn't timeout
  // res.status(200).json({ received: true });
  console.log('event.type: ', event.type);

  try {
    switch (event.type) {
      case 'charge.captured':
        await activatePendingMemberAccount(event.data.object);
        break;
      case 'charge.refunded':
        console.log('HANDLING charge.refunded event');
        await deletePendingMemberAccount(event.data.object);
        break;
      case 'charge.expired':
        console.log('HANDLING charge.expired event');
        await deletePendingMemberAccount(event.data.object);
        break;
      case 'charge.failed':
        console.log('HANDLING charge.failed event');
        await deletePendingMemberAccount(event.data.object);
        break;
    }
  } catch(error) {
    console.log('Error handling webhook event: ', error.message);
  }

  res.status(200).json({ received: true });
}


