import { initStripe } from "../../../lib/stripe";
import { hasRequiredProperties } from "../../../lib/api-utils";

const validRequestBody = (req) => {
  if(!req.body) return false;

  const hasAllProperties = hasRequiredProperties(["item", "customer"], req.body);
  if(!hasAllProperties) return false;

  const hasAllRequiredItemProperties = hasRequiredProperties(["price", "quantity"], req.body.item);
  if(!hasAllRequiredItemProperties) return false;

  const hasAllRequiredCustomerProperties = hasRequiredProperties(['email', 'firstName', 'surname', 'address'], req.body.customer);
  return hasAllRequiredCustomerProperties;
};

const customerMetadata = (customerDetails) => {
  const { 
    firstName,
    surname,
    email,
    dob,
    mobileNumber,
    address,
    suburb,
    city,
    postcode,
    nzdaMember,
    dcnzLicenseNumber,
    specialisation 
  } = customerDetails || {};
  
  return {
    'First name': firstName,
    'Last name': surname,
    'Email': email,
    'Date of Birth': dob,
    'Mobile number': mobileNumber || 'Not specified',
    'Address': address,
    'Suburb': suburb || 'Not specified',
    'City': city || 'Not specified',
    'Post code': postcode || 'Not specified',
    'NZDA Member?': nzdaMember,
    'DCNZ License Number': dcnzLicenseNumber || 'Not specified',
    'Specialisation/Category of Dentistry': specialisation || 'Not specified'
  };
};

const updateCustomer = async (customerDetails, stripeCustomerData) => {
  const stripe = await initStripe();

  const { firstName, surname, address, city, postcode } = customerDetails || {};

  const customer = await stripe.customers.update(
    stripeCustomerData.id,
    {
      shipping: {
        address: {
          city,
          country: 'NZ',
          line1: address,
          postal_code: postcode
        },
        name: `${firstName} ${surname}`
      },
      metadata: {
        ...customerMetadata(customerDetails)
      }
    }
  );

  return customer;

};

const createCustomer = async (customerDetails) => {
  const stripe = await initStripe();
  const { email, firstName, surname, address, city, postcode, mobileNumber } = customerDetails || {};

  const customer = await stripe.customers.create(
    {
      email: email,
      name: `${firstName} ${surname}`,
      phone: mobileNumber,
      shipping: {
        address: {
          city,
          country: 'NZ',
          line1: address,
          postal_code: postcode
        },
        name: `${firstName} ${surname}`
      },
      metadata: {
        ...customerMetadata(customerDetails)
      }
    }
  );

  return customer;

};

const findOrCreateStripeCustomer = async (customerDetails) => {
  const stripe = await initStripe();

  const { email } = customerDetails;
  const customers = await stripe.customers.list({
    email,
  });

  const customerExists = customers.data && customers.data.length > 0;
  return customerExists  ? updateCustomer(customerDetails, customers.data[0]) : createCustomer(customerDetails);
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

    const customer = await findOrCreateStripeCustomer(req.body.customer);

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        req.body.item
      ],
      customer: customer.id,
      subscription_data: {
        metadata: customerMetadata(req.body.customer),
        trial_period_days: 14
      },

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
