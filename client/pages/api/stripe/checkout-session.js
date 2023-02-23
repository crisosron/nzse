import { initStripe } from "../../../lib/stripe";

const validRequestBody = (req) => {
  const { item } = req.body || {};
  if(!item) return false;
  const hasAllProperties = Object.keys(item).every((key) => ["price", "quantity"].includes(key));
  return hasAllProperties;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
    return;
  }
  
  try {
    if(!validRequestBody(req)) {
      res.status(400).json({ message: "Request body must contain an 'item' object with the properties '{ price: <price_id>, quantity: <number> }'"});
      return;
    }

    const stripe = await initStripe();
    
    const { item } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        item
      ],
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/`
    });

    res.redirect(303, session.url);

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