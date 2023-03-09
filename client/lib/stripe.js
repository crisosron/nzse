let stripe;

export const initStripe = async () => {
  if(!stripe) {
    stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  }

  return stripe;
};

