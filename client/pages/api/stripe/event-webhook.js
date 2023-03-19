import { initStripe } from "../../../lib/stripe";
import { buffer } from "micro";

// Disable the body parser for this api route because we need to send the raw body to Stripe
export const config = {
  api: {
    bodyParser: false,
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
  
  res.status(200).json({ received: true });

  console.log('event: ', event);
}