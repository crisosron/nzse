import { Container, Layout } from '../components';
const LoginPage = ({ navigation: navigationData, footer: footerData }) => {
  return (
    <Layout navigationData={navigationData} footerData={footerData}>
      <Container>
        <div className='LoginPage prose my-20 mx-auto w-full h-[54vh] flex justify-center items-center flex-col text-center'>
          <h1>Login</h1>
        </div>
      </Container>
    </Layout>
  );
};

export default LoginPage;
