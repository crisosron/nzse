import { Container } from '../components';
import { EMAIL_REGEX } from '../lib/form-utils';
import Link from 'next/link';
import Image from 'next/image';
import { Form, InputField } from '../components';
import { useAuth } from '../lib/hooks/use-auth';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Notice from './notice';
import { PAGE_LINKS } from '../lib/constants';

const LoginPage = () => {
  const { signInUser, authLoading, authError } = useAuth();
  const {
    setError,
    clearErrors,
    formState: { errors: manualErrors } // This is noted as manualErrors as form errors are usually generated and handled by the Form component
  } = useForm();

  const onSubmit = (data) => {
    const { emailAddress, password } = data;
    signInUser(emailAddress, password);
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
    <Container className='h-full md:h-[100vh]'>
      <div className='LoginPage mx-auto w-full h-full flex flex-col justify-center items-center font-poppins'>
        <div className='w-[70%] md:w-[20rem] min-h-[10rem] relative md:mb-10'>
          <Link href='/'>
            <a>
              <Image src='/nzse-logo.svg' alt='nzse-logo' layout='fill' objectFit='contain' />
            </a>
          </Link>
        </div>

        <Notice type='info' className='lg:w-[80%]'>
          <span>
            If you are a NZSE member and this is your first time logging into the new website,
            navigate to the{' '}
            <Link href={PAGE_LINKS.PASSWORD_RESET}>
              <a>password reset</a>
            </Link>{' '}
            page and follow the instructions to activate your account.
          </span>
        </Notice>

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
              <Link href={PAGE_LINKS.PASSWORD_RESET}>
                <a className='text-[14px] font-normal'>Forgot your password?</a>
              </Link>
            </div>
            <InputField
              name='login'
              type='submit'
              value='Login'
              loading={authLoading}
              onClick={() => {
                clearErrors();
              }}
            />
            <div className='flex justify-center'>
              <Link href={PAGE_LINKS.MEMBERSHIP_INFO}>
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
