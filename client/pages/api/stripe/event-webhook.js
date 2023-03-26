import { initStripe } from "../../../lib/stripe";
import { buffer } from "micro";
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
  const { customer: customerId } = charge;
  const customerObject = await findStripeCustomerById(customerId);
  const { email: customerEmail } = customerObject;

  if(!customerEmail) {
    throw new Error('No email address was found in the customer stripe object. Cannot activate member');
  }

  const deletionResult = await deletePendingMember(customerEmail);

  if(deletionResult.error) {
    throw new Error('Failed to activate member: ', deletionResult.error.message);
  }
};

export default async function handler(req, res) {
  if(req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  const stripe = await initStripe();
  const bodyBuffer = await buffer(req);
  const signature = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(bodyBuffer, signature, process.env.STRIPE_WEBHOOK_SECRET_KEY);
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
    return;
  }
  
  // Return 200 here so that the webhook doesn't timeout
  res.status(200).json({ received: true });

  try {
    switch (event.type) {
      case 'charge.captured':
        activatePendingMemberAccount(event.data.object);
        break;
      case 'charge.refunded':
        deletePendingMemberAccount(event.data.object);
        break;
      case 'charge.expired':
        deletePendingMemberAccount(event.data.object);
        break;
      case 'charge.failed':
        deletePendingMemberAccount(event.data.object);
        break;
    }
  } catch(error) {
    console.log('Error handling webhook event: ', error.message);
  }
}