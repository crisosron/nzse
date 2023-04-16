import { initStripe } from "../../../lib/stripe";

const validRequestBody = (req) => {
  if(!req.body) return false;
  return Object.keys(req.body).every((key) => ['checkoutSessionId'].includes(key));
};

const findCheckoutSession = async (checkoutSessionId) => {
  const stripe = await initStripe();
  let successfulCheckoutSession = null;

  const defaultError = {
    status: 500,
    message:
      'Something went wrong. Please contact info@nzse.org.nz for more information about your request'
  };

  successfulCheckoutSession = await stripe.checkout.sessions.retrieve(checkoutSessionId);
  if (!successfulCheckoutSession) throw new Error(defaultError.message);

  return {
    successfulCheckoutSession
  };
};

export default async function handler(req, res) {
  try {
    if(!validRequestBody(req)) {
      res.status(400).json({ message: "Expected a checkoutSessionId' field to be provided in the request body"});
      return;
    }

    const { checkoutSessionId } = req.body;
    const checkoutSession = await findCheckoutSession(checkoutSessionId);

    // If a checkout session wasn't found, then the catch block will be executed. This is here as
    // a secondary check to ensure that if stripe does not throw an error, but hasn't returned anything,
    // then we consider it as an invalid checkout session
    if(!checkoutSession) {
      res.status(200).json({ valid: false });
    }

    res.status(200).json({ valid: true });

  } catch(error) {
    // If a checkout session was not found, stripe will throw an error. Return the result as a
    // successful request, but the checkout session id supplied was not valid
    if(error.statusCode === 404) {
      res.status(200).json({ valid: false });
      return;
    }

    res.status('500').json({
      error: error.message
    });
  }
}
