import Container from './container';
import InputField from './input-field';
import { useState, Children } from 'react';
import Form from './form';
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '../lib/form-utils';
import ReactMarkdown from 'react-markdown';

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

const JoinPage = ({ memberships }) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedMembershipPriceId, setSelectedMembershipPriceId] = useState(null);

  const onSubmit = (data) => {
    console.log('Called onSubmit with data: ', data);
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

  return (
    <Container className='prose my-10 md:my-20'>
      <h1>Join NZSE</h1>
      This text should be CMSable. Should contain a link to the privacy policy (so it should be
      richtext)
      <Form onSubmit={onSubmit}>
        <Section title='Your Details'>
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
          <ReactMarkdown>CMSable description</ReactMarkdown>
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
          <p>
            Please enter your email address and a password to setup your account. Your account will
            be activated after successful payment.
          </p>
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
          <p>Description goes here</p>
          <InputField
            type='checkbox'
            name='terms-and-conditions'
            validations={{ required: 'Please accept the terms and conditions to continue' }}
          >
            <span>
              By ticking, you are confirming that you have read, understood, and agree to our{' '}
              <a>terms and conditions</a>.
            </span>
          </InputField>
          <InputField
            name='continue'
            className='cursor-pointer block mx-auto my-0 md:mx-0 bg-light-blue hover:bg-lightest-blue shadow hover:text-dark-blue text-white py-2 px-4 rounded transition-colors duration-150 w-[80%] md:w-[60%] lg:w-[20%] border-none'
            type='submit'
            value='Continue to payment'
            disabled={submitted}
          />
        </Section>
      </Form>
    </Container>
  );
};

export default JoinPage;
