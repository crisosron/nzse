import Container from './container';
import InputField from './input-field';
import { useState } from 'react';
import Form from './form';

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

const JoinPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log('Called onSubmit with data: ', data);
  };

  return (
    <Container className='prose my-10 md:my-20'>
      <h1>Join NZSE</h1>
      This text should be CMSable. Should contain a link to the privacy policy (so it should be
      richtext)
      <Form onSubmit={onSubmit}>
        <Section title='Your Details'>
          <InputField
            type='text'
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
          <InputField
            type='date'
            name='dob'
            validations={{ required: 'Please enter your date of birth ' }}
            label='Date of birth'
          />
        </Section>

        <Section title='Address'>
          <InputField
            type='text'
            name='address'
            validations={{ required: 'Please enter your address' }}
            label='Street number and name'
          />
          <InputField type='text' name='suburb' label='Suburb' />
          <InputField type='text' name='city' label='City' />
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
        </Section>

        <Section title='Your professional details'>
          <InputField type='text' name='institution' label='Institution' />
          <InputField type='text' name='department' label='Department' />
          <InputField
            type='select'
            name='designation'
            label='Designation'
            placeholder='Select a designation'
            options={DESIGNATION_OPTIONS}
          />
        </Section>

        <Section title='Creating your account'>
          <p>
            Please enter your email address and a password to setup your account. Your account will
            be activated after successful payment.
          </p>
          <InputField
            type='text'
            name='emailAddress'
            validations={{ required: 'Please enter your email address' }}
            label='Email'
          />
          <InputField
            type='text'
            name='password'
            validations={{ required: 'Please enter your password' }}
            label='Password'
          />
          <InputField
            type='text'
            name='confirmPassword'
            validations={{ required: 'Please re-enter your password' }}
            label='Confirm password'
          />
        </Section>

        <Section title='Declaration and payment'>
          <p>Description goes here</p>
          <InputField
            type='checkbox'
            name='terms-and-conditions'
            validations={{ required: 'Please accept the terms and conditions to continue' }}
          >
            <span>
              By ticking, you are confirming that you have read, understood and agree to our{' '}
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
