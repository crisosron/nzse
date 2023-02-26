import Container from './container';
import InputField from './input-field';
import { useState, Children } from 'react';
import Form from './form';
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '../lib/form-utils';
import ReactMarkdown from 'react-markdown';
import { buildPageUrl } from '../lib/utils';
import axios from 'axios';
import { useEffect } from 'react';

const DESIGNATION_OPTIONS = [
  { value: 'test-1', label: 'Test 1' },
  { value: 'test-2', label: 'Test 2' },
  { value: 'test-3', label: 'Test 3' }
];

const Section = ({ title, children }) => {
  return (
    <div className='prose bg-light-blue-50 w-full max-w-[100%] p-5 rounded-md my-10'>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

/**
 * This component is meant to control the width of the input fields on the form, particularly
 * for tablet and desktop breakpoints.
 *
 * For mobile, the form input fields are layed out vertically, with the input fields occupying the
 * full width of their containers, and are therefore not styled in any way by this component
 */
const SplitRow = ({ children }) => {
  const singleChild = Children.toArray(children).length === 1;

  return (
    // Note that the children selector &>div etc. targets InputField components. If the container
    // Of an input field changes to a different element, the selector here should be updated as well
    <div className='md:flex md:justify-between md:[&>div]:w-[100%] md:first:[&>div]:mr-5'>
      {children}
      {singleChild && <div className='hidden lg:block'></div>}
    </div>
  );
};

const JoinPage = ({
  memberships,
  formIntro,
  yourDetailsSectionDescription,
  addressSectionDescription,
  professionalDetailsSectionDescription,
  membershipSectionDescription,
  yourAccountSectionDescription,
  declarationSectionDescription,
  termsAndConditionsPage,
  privacyPolicyPage,
  showPaymentSuccessState
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [selectedMembershipPriceId, setSelectedMembershipPriceId] = useState(null);

  const termsAndConditionsPageUrl = buildPageUrl(termsAndConditionsPage?.data);
  const privacyPolicyPageUrl = buildPageUrl(privacyPolicyPage?.data);

  const onSubmit = async (data) => {
    if (submitting) return;
    setSubmitting(true);

    const { membership: membershipPriceId, email } = data;

    const item = {
      price: membershipPriceId,
      quantity: 1
    };

    const customer = {
      email
    };

    try {
      const { data } = (await axios.post('/api/stripe/checkout-session', { item, customer })) || {};
      if (!data || !data.checkoutSessionUrl)
        throw new Error('Something went wrong. Please try again later');

      // TODO: store all data in localStorage so we don't lose it as a result of the checkout redirect (don't store the password though)

      window.location.href = data.checkoutSessionUrl;
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const membershipOptions = memberships.map((membership) => {
    return {
      value: membership.stripePriceId,
      label: `${membership.title} ($${membership.priceDollar})`
    };
  });

  const handleMembershipOptionSelected = (value) => {
    setSelectedMembershipPriceId(value);
  };

  const renderSelectedMembershipDescription = () => {
    const description = memberships.find(
      (membership) => membership.stripePriceId === selectedMembershipPriceId
    )?.description;

    return (
      <div className='md:mt-[-20px]'>
        <ReactMarkdown>
          {description || 'Select a membership option above to see its features and benefits'}
        </ReactMarkdown>
      </div>
    );
  };

  useEffect(() => {
    // TODO: if showPaymentSuccessState, return a form with an email field that is disabled and preloaded
    // with the email address the user entered in stripe, and a password, and a confirm password field
    // Submitting this form creates the user in stripe, shows a success state, and redirects to the homepage with the user logged in
    //
    // A user should also somehow be created in strapi that records the user's details (that isn't the password)
    // User should receive an email via firebase?
    //
    // TODO: Alternative
    // Don't ask for password in the initial form
    // After succesful payment - Send a sign in email link (which will also verify the email address) https://firebase.google.com/docs/auth/web/email-link-auth
    //  - be sure to pass in actionCodeSettings = { url :'..../join/finish-sign-up=<stripe successful checkout session id>', handleCodeInApp: true }
    // When user clicks the link, they will should be signed in, and will be redirected to the above page, which should have a password and confirm password field
    // when this form is submitted, do this: https://firebase.google.com/docs/auth/web/account-linking#link-email-address-and-password-credentials-to-a-user-account
    //
    // TODO: OR use Firebase Admin SDK (more granular and programmatic control over user creation)
    // - Create a user BEFORE PAYMENT with the profile disabled
    // - On succcessful payment (in getStaticProps?), update the user (disabled: false)
    // On payment cancel, delete the user!
  }, []);

  console.log('showSuccessState: ', showPaymentSuccessState);

  // TODO: If signed in, add an alert message that the user already has a membership
  return (
    <Container className='prose my-10 md:my-20'>
      <h1>Join NZSE</h1>
      <ReactMarkdown>{formIntro}</ReactMarkdown>
      <Form onSubmit={onSubmit}>
        <Section title='Your Details'>
          <ReactMarkdown>{yourDetailsSectionDescription}</ReactMarkdown>
          <SplitRow>
            <InputField
              type='text'
              className='w-[100%]'
              name='firstName'
              validations={{ required: 'Please enter your first name ' }}
              label='First name'
            />
            <InputField
              type='text'
              name='surname'
              validations={{ required: 'Please enter your surname ' }}
              label='Surname'
            />
          </SplitRow>
          <SplitRow>
            <InputField
              type='date'
              name='dob'
              validations={{ required: 'Please enter your date of birth ' }}
              label='Date of birth'
            />
          </SplitRow>
          <SplitRow>
            <InputField
              type='tel'
              name='mobileNumber'
              validations={{
                pattern: {
                  value: PHONE_NUMBER_REGEX,
                  message: 'Please enter a valid NZ mobile phone number (should start with 02)'
                }
              }}
              label='Mobile number'
            />
          </SplitRow>
        </Section>

        <Section title='Address'>
          <ReactMarkdown>{addressSectionDescription}</ReactMarkdown>
          <InputField
            type='text'
            name='address'
            validations={{ required: 'Please enter your address' }}
            label='Street number and name'
          />
          <SplitRow>
            <InputField type='text' name='suburb' label='Suburb' />
            <InputField type='text' name='city' label='City' />
          </SplitRow>
          <SplitRow>
            <InputField
              type='number'
              name='postcode'
              validations={{
                required: 'Please enter your postcode',
                minLength: { value: 4, message: 'Please enter a valid postcode ' },
                maxLength: { value: 4, message: 'Please enter a valid postcode ' }
              }}
              label='Post code'
            />
          </SplitRow>
        </Section>

        <Section title='Your professional details'>
          <ReactMarkdown>{professionalDetailsSectionDescription}</ReactMarkdown>
          <SplitRow>
            <InputField type='text' name='institution' label='Institution' />
            <InputField type='text' name='department' label='Department' />
          </SplitRow>
          <SplitRow>
            <InputField
              type='select'
              name='designation'
              label='Designation'
              placeholder='Select a designation'
              options={DESIGNATION_OPTIONS}
            />
          </SplitRow>
        </Section>

        <Section title='Select a membership'>
          <ReactMarkdown>{membershipSectionDescription}</ReactMarkdown>
          <SplitRow>
            <InputField
              type='select'
              name='membership'
              label='Membership'
              validations={{ required: 'Please select a membership' }}
              placeholder='Select a membership'
              options={membershipOptions}
              onOptionSelect={handleMembershipOptionSelected}
            />
          </SplitRow>
          {renderSelectedMembershipDescription()}
        </Section>

        <Section title='Creating your account'>
          <ReactMarkdown>{yourAccountSectionDescription}</ReactMarkdown>
          <SplitRow>
            <InputField
              type='email'
              name='emailAddress'
              validations={{
                required: 'Please enter your email address',
                pattern: { value: EMAIL_REGEX, message: 'Please enter a valid email address' }
              }}
              label='Email'
            />
          </SplitRow>
          <SplitRow>
            <InputField
              type='password'
              name='password'
              validations={{ required: 'Please enter a password' }}
              label='Password'
            />
            <InputField
              type='password'
              name='confirmPassword'
              validations={{ required: 'Please re-enter your chosen password' }}
              label='Confirm password'
            />
          </SplitRow>
        </Section>

        <Section title='Declaration and payment'>
          <ReactMarkdown>{declarationSectionDescription}</ReactMarkdown>
          <InputField
            type='checkbox'
            name='terms-and-conditions'
            validations={{ required: 'Please accept the terms and conditions to continue' }}
            checkboxText={`By ticking, you are confirming that you have read, understood, and agree to our [terms and conditions](${termsAndConditionsPageUrl}) and have read our [privacy policy](${privacyPolicyPageUrl}).`}
          />
          <InputField
            name='continue'
            size='small'
            type='submit'
            value='Continue to payment'
            loading={submitting}
          />
        </Section>
      </Form>
    </Container>
  );
};

export default JoinPage;
