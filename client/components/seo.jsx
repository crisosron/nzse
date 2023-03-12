import Head from 'next/head';
import { useContext } from 'react';
import { GlobalContext } from '../pages/_app';

const Seo = ({ seo }) => {
  const { globalSeo } = useContext(GlobalContext);
  const seoWithDefaults = {
    ...globalSeo,
    ...seo
  };

  const fullSeo = {
    ...seoWithDefaults,
    metaTitle: seoWithDefaults.metaTitle || 'NZSE'
  };

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property='og:title' content={fullSeo.metaTitle} />
          <meta name='twitter:title' content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name='description' content={fullSeo.metaDescription} />
          <meta property='og:description' content={fullSeo.metaDescription} />
          <meta name='twitter:description' content={fullSeo.metaDescription} />
        </>
      )}
      <meta name='twitter:card' content='summary_large_image' />
    </Head>
  );
};

export default Seo;
