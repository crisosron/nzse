import { Container, Layout } from '../components';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX } from '../lib/form-utils';
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
        <div className='LoginPage prose mx-auto w-full h-[82vh] md:h-[54vh] flex flex-col'>
          <div className='prose my-10 text-center w-full'>
            <h1>Login</h1>
          </div>

          <div className='flex-grow mb-10 flex justify-center items-center text-center'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='block'>
                <input
                  type='text'
                  placeholder='Email Address'
                  {...register('emailAddress', { required: true, pattern: EMAIL_REGEX })}
                />
                {errors.emailAddress && <span>Please enter a valid email address</span>}
              </div>

              <div className='block'>
                <input
                  type='password'
                  placeholder='Password'
                  {...register('password', { required: true })}
                />
                {errors.password && <span>Please enter your password</span>}
              </div>

              <input type='Submit' defaultValue='Login' />
            </form>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default LoginPage;
