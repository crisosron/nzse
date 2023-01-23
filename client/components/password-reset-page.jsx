import { Container } from '../components';
import Link from 'next/link';
import Image from 'next/image';
import { Form, InputField } from '../components';
import { EMAIL_REGEX } from '../lib/form-utils';
import { useForm } from 'react-hook-form';

const PasswordResetPage = () => {
  const {
    setError,
    clearErrors,
    formState: { errors: manualErrors } // This is noted as manualErrors as form errors are usually generated and handled by the Form component
  } = useForm();

  const onSubmit = () => {
    console.log('Called onSubmit');
  };
  return (
    <Container className='h-[100vh]'>
      <div className='LoginPage mx-auto w-full h-full flex flex-col justify-center items-center font-poppins'>
        <div className='w-[70%] md:w-[20rem] min-h-[10rem] relative md:mb-10'>
          <Link href='/'>
            <a>
              <Image src='/nzse-logo.svg' alt='nzse-logo' layout='fill' objectFit='contain' />
            </a>
          </Link>
        </div>

        <div className='prose flex grow md:grow-0 md:flex-shrink flex-col justify-center mb-10 w-full md:w-[70%] lg:w-[60%] md:border md:border-gray-300 md:p-10 md:shadow-lg md:rounded-md'>
          <span className='text-center mb-10 text-charcoal text-h2 font-medium'>
            Password Reset
          </span>
          <span className='md:text-center mb-8'>
            Enter your email address below to get a password reset link.
          </span>
          <Form onSubmit={onSubmit}>
            <InputField
              type='text'
              name='emailAddress'
              className='mb-10'
              validations={{
                required: 'Please enter your email address',
                pattern: { value: EMAIL_REGEX, message: 'Please enter a valid email address' }
              }}
              label='Email'
              applyInvalidHighlight={manualErrors && manualErrors.invalidLogin}
            />
            <InputField
              name='continue'
              className='cursor-pointer block mx-auto my-0 bg-light-blue hover:bg-lightest-blue shadow hover:text-dark-blue text-white py-2 px-4 rounded transition-colors duration-150 w-[80%] md:w-[60%] mb-8 border-none'
              type='submit'
              value='Continue'
              onClick={() => {
                clearErrors();
              }}
            />
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default PasswordResetPage;
