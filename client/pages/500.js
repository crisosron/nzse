import Link from "next/link";
import { Container, Layout } from "../components";
const Error500 = ({ navigation: navigationData, footer: footerData }) => {
  return (
    <Layout navigationData={navigationData} footerData={footerData}>
      <Container>
        <div className='Error500 prose my-20 mx-auto w-full h-[54vh] flex justify-center items-center flex-col text-center'>
          <h1 className="md:text-h1-xl lg:text-h1-2xl">500</h1>
          <p>It looks like something went wrong on our end.</p>
          <p>
            Try a different URL, or go back to the <Link href='/'>homepage</Link>.
          </p>
        </div>
      </Container>
    </Layout>
  );
};

export default Error500;
