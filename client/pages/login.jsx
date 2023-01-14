import { Container } from '../components';
import { EMAIL_REGEX } from '../lib/form-utils';
import Link from 'next/link';
import Image from 'next/image';
import { Form, InputField } from '../components';
import { useAuth } from '../lib/hooks/use-auth';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TailSpin } from 'react-loader-spinner';
// import { signIn } from 'next-auth/react';

const LoginPage = ({ navigation: navigationData, footer: footerData }) => {
  const { signInUser, authLoading, authError } = useAuth();
  const {
    setError,
    clearErrors,
    formState: { errors: manualErrors } // This is noted as manualErrors as form errors are usually generated and handled by the Form component
  } = useForm();

  const onSubmit = (data) => {
    const { emailAddress, password } = data;
    signInUser(emailAddress, password);
    // 'redirect: false' required to handle login error on this page: https://next-auth.js.org/getting-started/client#using-the-redirect-false-option
    // without this, next-auth will redirect to a default 'try again' login page
    // signIn('credentials', { email: emailAddress, password, redirect: false });
  };

  // Set an error on the form manually to indicate invalid login credentials were used
  useEffect(() => {
    if (!authError) clearErrors();
    if (authError) {
      setError(
        'invalidLogin',
        { type: 'custom', message: 'Email or password is incorrect' },
        { shouldFocus: false }
      );
    }
  }, [authError]);

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
          <span className='text-center mb-10 text-charcoal text-h2 font-medium'>Member Login</span>
          <Form onSubmit={onSubmit}>
            <InputField
              type='text'
              name='emailAddress'
              validations={{
                required: 'Please enter your email address',
                pattern: { value: EMAIL_REGEX, message: 'Please enter a valid email address' }
              }}
              label='Email'
              applyInvalidHighlight={manualErrors && manualErrors.invalidLogin}
            />
            <InputField
              type='password'
              name='password'
              validations={{ required: 'Please enter your password' }}
              label='Password'
              applyInvalidHighlight={manualErrors && manualErrors.invalidLogin}
            />
            {manualErrors && manualErrors.invalidLogin && (
              <span className='text-alert-red'>{manualErrors.invalidLogin.message}</span>
            )}
            <div className='flex justify-end mb-8 mt-[-15px]'>
              <Link href='/reset-password'>
                <a className='text-[14px] font-normal'>Forgot your password?</a>
              </Link>
            </div>
            {!authLoading && (
              <InputField
                name='login'
                className='cursor-pointer block mx-auto my-0 bg-light-blue hover:bg-lightest-blue shadow hover:text-dark-blue text-white py-2 px-4 rounded transition-colors duration-150 w-[80%] md:w-[60%] mb-8 border-none'
                type='submit'
                value='Login'
                onClick={() => {
                  clearErrors();
                }}
              />
            )}
            {authLoading && (
              <div className='flex justify-center items-center bg-light-blue py-2 w-[80%] md:w-[60%] mb-5 mx-auto border-none'>
                <TailSpin
                  height='28'
                  width='28'
                  color='white'
                  ariaLabel='tail-spin-loading'
                  radius='1'
                  visible={true}
                />
              </div>
            )}
            <div className='flex justify-center'>
              <Link href='/memberships'>
                <a className='text-[14px] font-normal'>Find out more about our memberships</a>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
