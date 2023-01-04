import { Container } from '../components';
import { EMAIL_REGEX } from '../lib/form-utils';
import Link from 'next/link';
import Image from 'next/image';
import { Form, InputField } from '../components';

const LoginPage = ({ navigation: navigationData, footer: footerData }) => {

  const onSubmit = (data) => {
    console.log('Submit data: ', data);
  };

  return (
    <Container className="h-[100vh]">
      <div className='LoginPage mx-auto w-full h-full flex flex-col justify-center items-center font-poppins'>
        <div className='w-[70%] md:w-[20rem] min-h-[10rem] relative md:mb-10'>
          <Link href='/'>
            <a>
              <Image src='/nzse-logo.svg' alt='nzse-logo' layout='fill' objectFit='contain' />
            </a>
          </Link>
        </div>

        <div className='prose flex grow md:grow-0 md:flex-shrink flex-col justify-center mb-10 w-full md:w-[60%] md:border md:border-gray-300 md:p-10 md:shadow-lg md:rounded-md'>
          <h2 className="text-center mb-10">Member Login</h2>
          <Form onSubmit={onSubmit}>
            <InputField type="text" name="emailAddress" validations={{ required: 'Please enter your email address', pattern: { value: EMAIL_REGEX, message: 'Please enter a valid email address'}}} label="Email" />
            <InputField type="password" name="password" validations={{ required: 'Please enter your password' }} label="Password" />
            <div className="flex justify-end mb-5">
              <Link href='/reset-password'>
                <a className='text-[14px] font-normal'>Forgot your password?</a>
              </Link>
            </div>
            <InputField name="login" className="block mx-auto my-0 bg-light-blue hover:bg-lightest-blue shadow hover:text-dark-blue text-white py-2 px-4 rounded transition-colors duration-150 w-[80%] mb-5 border-none" type="submit" defaultValue="Login" />
          </Form>
        </div>
      </div>
    </Container>
    // </Layout>
  );
};

export default LoginPage;
