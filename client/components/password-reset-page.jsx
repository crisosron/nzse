import { useState, useEffect } from 'react';
import { Container } from '../components';
import Link from 'next/link';
import Image from 'next/image';
import { Form, InputField } from '../components';
import { EMAIL_REGEX } from '../lib/form-utils';
import { useAuth } from '../lib/hooks/use-auth';
import { TailSpin } from 'react-loader-spinner';
import { TickIcon } from './svg-components';

const PasswordResetPage = () => {
  const { resetUserPassword, authError, clearAuthError, authLoading } = useAuth();
  const [emailSent, setEmailSent] = useState(false);

  const onSubmit = (data) => {
    setEmailSent(false);
    const { emailAddress } = data;
    resetUserPassword(emailAddress).then(() => {
      setEmailSent(true);
    });
  };

  useEffect(() => {
    return () => {
      clearAuthError();
    };
  }, []);

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
            Reset your password
          </span>
          {!emailSent && (
            <>
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
                  applyInvalidHighlight={!!authError}
                  disabled={emailSent}
                />
                {authError && (
                  <span className='block text-alert-red mt-[-15px] mb-10'>{authError.message}</span>
                )}
                {!authLoading && (
                  <InputField
                    name='continue'
                    className='cursor-pointer block mx-auto my-0 bg-light-blue hover:bg-lightest-blue shadow hover:text-dark-blue text-white py-2 px-4 rounded transition-colors duration-150 w-[80%] md:w-[60%] mb-12 border-none'
                    type='submit'
                    value='Continue'
                    onClick={() => {
                      clearAuthError();
                    }}
                    disabled={emailSent}
                  />
                )}
                {authLoading && (
                  <div className='rounded flex justify-center items-center bg-light-blue py-2 px-4 w-[80%] md:w-[60%] mb-8 mx-auto border-none'>
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
              </Form>
            </>
          )}
          {emailSent && (
            <>
              <div className='flex justify-center items-center'>
                <TickIcon className='fill-light-blue h-24 w-24 mb-8' />
              </div>
              <div className='block mb-8'>
                A password reset link was emailed to you. Please check your inbox and follow the
                instructions on the email. You may close this tab.
              </div>
              <div className='block mb-8'>
                If you did not receive an email, please check your spam folder, or contact{' '}
                {/* TODO: verify this email */}
                <a href='mailto:info@nzse.org.nz'>info@nzse.org.nz</a>.
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default PasswordResetPage;
