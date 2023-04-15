import Container from './container';
import InputField from './input-field';
import { useState, Children } from 'react';
import Form from './form';
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '../lib/form-utils';
import ReactMarkdown from 'react-markdown';
import { buildPageUrl } from '../lib/utils';
import axios from 'axios';
import { useEffect } from 'react';
import { getCookie, setCookie, deleteCookie, hasCookie } from 'cookies-next';
import { useAuth } from '../lib/hooks/use-auth';
import { TickIcon } from './svg-components';
import Notice from './notice';
import { useRouter } from 'next/router';
import { COOKIE_NAMES } from '../lib/constants';
import { TailSpin } from 'react-loader-spinner';

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

const SuccessState = ({ message }) => {
  // To set the minimum height such that the content container fills the page, whilst making sure
  // the footer remains visible in the viewport:
  // md:min-h calc: 13rem (h-52) = footer height, 6rem (h-24): nav height
  return (
    <Container className='md:min-h-[calc(100vh-13rem-6rem)] prose flex justify-center items-center'>
      <div>
        <div className='flex justify-center items-center'>
          <TickIcon className='fill-affirmative-green md:w-[15%] md:h-[15%] mb-8' />
        </div>
        <div className='text-center'>
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>
      </div>
    </Container>
  );
};

const FormLoadingState = () => {
  return (
    <Container className='md:min-h-[calc(100vh-13rem-6rem)] prose flex justify-center items-center'>
      <div className='flex justify-center items-center'>
        <TailSpin
          height='64'
          width='64'
          color='#4cbedb'
          ariaLabel='tail-spin-loading'
          radius='1'
          visible={true}
        />
      </div>
    </Container>
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
  successMessage,
  specialisationOptions: specialisationOptionsString
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [selectedMembershipPriceId, setSelectedMembershipPriceId] = useState(null);
  const [showSuccessState, setShowSuccessState] = useState(false);
  const [processingError, setProcessingError] = useState(null);
  const [formLoading, setFormLoading] = useState(true);

  const termsAndConditionsPageUrl = buildPageUrl(termsAndConditionsPage?.data);
  const privacyPolicyPageUrl = buildPageUrl(privacyPolicyPage?.data);

  const { authenticatedUser } = useAuth();
  const router = useRouter();

  const specialisationOptions = specialisationOptionsString
    .split(',')
    .map((option) => ({ label: option.trim(), value: option.trim() }));

  const nzdaMemberOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ];

  const onSubmit = async (data) => {
    if (submitting) return;
    setSubmitting(true);

    const {
      membership: membershipPriceId,
      email,
      password,
      firstName,
      surname,
      dob,
      mobileNumber,
      address,
      suburb,
      city,
      postcode,
      nzdaMember,
      dcnzLicenseNumber,
      specialisation,
    } = data;

    const item = {
      price: membershipPriceId,
      quantity: 1
    };

    // This is the information stored under the customer object in Stripe
    const customer = {
      firstName,
      surname,
      dob,
      email,
      mobileNumber,
      address,
      suburb,
      city,
      postcode,
      nzdaMember,
      dcnzLicenseNumber,
      specialisation,
    };

    try {
      const { data } = (await axios.post('/api/stripe/checkout-session', { item, customer })) || {};
      if (!data || !data.checkoutSessionUrl)
        throw new Error('Something went wrong. Please try again later');

      await axios.post('/api/members/create-member', { email, password });

      setCookie(COOKIE_NAMES.PENDING_MEMBER_EMAIL, email);

      window.location.href = data.checkoutSessionUrl;
    } catch (error) {
      setProcessingError(error);
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

    // This prevents the flashing of the join form after a successful checkout session redirect.
    // The result is that the form loading state is displayed, and will directly transition into
    // the success state once processPostCheckout has been completed
    if(router.isReady && Object.keys(router.query).length > 0 && router.query.successful_session_id) {
      setFormLoading(true);

      // This will take effect if successful_session_id query is invalid (i.e. not processed
      // by processPostCheckout)
      setTimeout(() => {
        setFormLoading(false);
        router.replace('/join', undefined, { shallow: true });
      }, [5000]);
      
      return;
    }

    setFormLoading(!router.isReady);

  }, [router.isReady]);

  useEffect(() => {

    const deletePendingMember = async (email) => {
      await axios.post('/api/members/delete-member', { email, pendingOnly: true });
      deleteCookie(COOKIE_NAMES.PENDING_MEMBER_EMAIL);
    };

    const processPostCheckout = async () => {

      // A 'successful_session_id' query will exist if this page is redirected to by Stripe after a
      // successful payment (see /api/stripe/checkout-session)
      //
      // If this is the case, then we know that the user has completed the checkout session, and
      // therefore any processing that needs to take place to transition to the success state of
      // this form should be exected
      const { successful_session_id: successfulSessionId } = router.query;

      if(successfulSessionId) {

        // Before transitioning to the success state, the value of successfulSessionId in the url
        // query string should be verified. If it is not a valid value, then cancel the transition
        // to a success state
        const verifyCheckoutSessionResult = await axios.post('/api/stripe/verify-checkout-session', { 
          checkoutSessionId: successfulSessionId 
        });

        const { valid: validCheckoutSession } = verifyCheckoutSessionResult.data;

        if(validCheckoutSession && hasCookie(COOKIE_NAMES.PENDING_MEMBER_EMAIL)) {
          deleteCookie(COOKIE_NAMES.PENDING_MEMBER_EMAIL);
          setShowSuccessState(true);
          router.replace('/join', undefined, { shallow: true });
          return;
        }
      }

      if (!hasCookie(COOKIE_NAMES.PENDING_MEMBER_EMAIL)) return;

      // If this page is rendered without a 'successful_session_id' query string AND there exists a 
      // cookie '_nzse_pendingMemberEmail', this means that the user entered the checkout session, but
      // exited the checkout without successfully completing it.
      //
      // When this happens, the firebase user created for the member when the form is submitted
      // should be deleted to ensure that subsequent attempts at membership registration is not 
      // blocked by Firebase because the email already exists in the system
      const pendingMemberEmail = getCookie(COOKIE_NAMES.PENDING_MEMBER_EMAIL);
      deletePendingMember(pendingMemberEmail).catch((error) => {
        setProcessingError(error);
      });
    };

    // Don't process the checkout session if the router query has not been hydrated yet. router.isReady
    // will be false on initial render because of nextjs automatic static optimisation on pages
    // that use SSG, which means that the query string will be inaccessible, and therefore the
    // execution of the code below should be deferred to a subsequent render.
    if(!router.isReady) return;

    processPostCheckout().catch((error) => {
      setProcessingError(error);
    });

  }, [router.query, router.isReady]);

  useEffect(() => {
    if(processingError) window.scrollTo(0, 0);
  }, [processingError]);

  if (showSuccessState) {
    return <SuccessState message={successMessage} />;
  }

  if(formLoading) {
    return <FormLoadingState />;
  }

  return (
    <Container className='prose my-10 md:my-20'>
      <h1>Join NZSE</h1>
      {
        (processingError) &&
        <Notice type='danger'>
          <span>
            An error occurred trying to process your request. Please try again later, or contact{' '}
            <a href='mailto:info@nzse.org.nz'>info@nzse.org.nz</a> for more information.
          </span>
        </Notice>        
      }
      {authenticatedUser && (
        <Notice type='info'>
          <span>
            Please note that you already have a membership. If you are looking to change or
            discontinue your membership, please contact{' '}
            <a href='mailto:info@nzse.org.nz'>info@nzse.org.nz</a> for more information.
          </span>
        </Notice>
      )}
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
              maxLength={4}
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
            <InputField 
              type='select'
              name='nzdaMember'
              label='Are you a member of the NZDA?'
              options={nzdaMemberOptions}
              placeholder='Select an option' 
              validations={{ required: 'Please select an option'}}
            />
            <InputField type='text' name='dcnzLicenseNumber' label='DCNZ (Dental Council of NZ) License Number' />
          </SplitRow>
          <SplitRow>
            <InputField 
              type='select'
              name='specialisation'
              label='Specialisation/Category of Dentistry'
              options={specialisationOptions}
              placeholder='Select an option' 
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
              name='email'
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
