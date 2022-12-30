import { Container, Layout } from '../components';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX } from '../lib/form-utils';
import Link from 'next/link';
const LoginPage = ({ navigation: navigationData, footer: footerData }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log('Submit data: ', data);
  };

  return (
    <Layout navigationData={navigationData} footerData={footerData}>
      <Container>
        <div className='LoginPage mx-auto w-full h-[82vh] md:h-[54vh] flex flex-col'>
          <div className='prose my-10 text-center w-full'>
            <h2>Member Login</h2>
          </div>

          <div className='prose flex-grow flex flex-col justify-center mb-10 text-center w-full'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='block mb-5'>
                <input
                  className='border border-gray-300 rounded-md p-2 w-full'
                  type='text'
                  placeholder='Email Address'
                  {...register('emailAddress', { required: true, pattern: EMAIL_REGEX })}
                />
                {errors.emailAddress && <span>Please enter a valid email address</span>}
              </div>

              <div className='block mb-5'>
                <input
                  className='border border-gray-300 rounded-md p-2 w-full'
                  type='password'
                  placeholder='Password'
                  {...register('password', { required: true })}
                />
                {errors.password && <span>Please enter your password</span>}
              </div>

              <input
                className='bg-light-blue hover:bg-lightest-blue shadow hover:text-dark-blue text-white py-2 px-4 rounded transition-colors duration-150 w-[80%] mb-5'
                type='Submit'
                defaultValue='Login'
              />
            </form>
            <div>
              <Link href='/reset-password'>
                <a className='text-[14px] font-normal'>Forgot your password?</a>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default LoginPage;
