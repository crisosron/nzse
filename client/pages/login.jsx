import { LoginPage } from '../components';

// Declare a getStaticProps here that returns empty props to prevent re-fetch via MyApp and cause
// an odd ApolloLink Error...
//
// But not global level props fetched and passed down by MyApp is still available in the component
export const getStaticProps = () => {
  return { props: {} };
};

const Login = (props) => {
  return <LoginPage {...props} />;
};

export default Login;
