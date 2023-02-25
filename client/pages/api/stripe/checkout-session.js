import { initStripe } from "../../../lib/stripe";

const validRequestBody = (req) => {
  if(!req.body) return false;
  const hasAllProperties = Object.keys(req.body).every((key) => ["item", "customer"].includes(key));
  const hasAllItemProperties = Object.keys(req.body.item).every((key) => ["price", "quantity"].includes(key));
  const hasAllCustomerProperties = Object.keys(req.body.customer).every((key) => ["email"].includes(key));
  return hasAllProperties && hasAllItemProperties && hasAllCustomerProperties;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
    return;
  }
  
  try {
    if(!validRequestBody(req)) {
      res.status(400).json({ message: "Request body must contain an 'item' object with the properties '{ price: <price_id>, quantity: <number> }' and a 'customer' object with the properties '{email: <email address>}'"});
      return;
    }

    const stripe = await initStripe();

    const customer = await stripe.customers.create({
      email: req.body.customer.email
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        req.body.item
      ],
      customer: customer.id,

      // Note: template string comes from Stripe
      // https://stripe.com/docs/payments/checkout/custom-success-page
      success_url: `${req.headers.origin}/join/?successful_session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/join`
    });

    res.status(200).json({ checkoutSessionUrl: session.url });

  } catch(error) {
    res.status(error.statusCode || 500).json(
      {
        error: {
          message: error.message || 'Something went wrong. Please try again later', 
          status: error.statusCode || 500
        }
      }
    );
  }
}
