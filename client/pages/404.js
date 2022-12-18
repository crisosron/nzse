import Link from "next/link";
import { Container, Layout } from "../components";
const Error404 = ({ navigation: navigationData, footer: footerData }) => {
  return (
    <Layout navigationData={navigationData} footerData={footerData}>
      <Container>
        <div className='Error404 prose my-20 mx-auto w-full h-[54vh] flex justify-center items-center flex-col text-center'>
          <h1>404</h1>
          <p>Looks like the page you were looking for doesn&apos;t exist.</p>
          <p>
            Try a different URL, or go back to the <Link href='/'>homepage</Link>.
          </p>
        </div>
      </Container>
    </Layout>
  );
};

export default Error404;
