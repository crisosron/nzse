import { JoinPage, Layout } from '../components';
import { useEffect } from 'react';
import Seo from '../components/seo';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { useAuth } from '../lib/hooks/use-auth';
import { graphqlClient } from '../lib/graphql-api';
import { getJoinPage, getMemberships } from '../graphql/queries';
import { initStripe } from '../lib/stripe';
import { unwrapCollectionEntityResponse } from '../lib/utils';

const attachPriceToMemberships = (membershipsCMS, stripePrices) => {
  return membershipsCMS.map((membershipCMS) => {
    const price = stripePrices.find(
      (membershipPrice) => membershipPrice.id === membershipCMS.stripePriceId
    );

    const priceInCents = price.unit_amount_decimal || price.unit_amount;
    const priceInCentsNum = parseFloat(priceInCents);
    const priceDollar = Math.round(priceInCentsNum / 100).toFixed(2);

    return {
      ...membershipCMS,
      priceInCents,
      priceDollar
    };
  });
};

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await unstable_getServerSession(req, res, authOptions);

  const [membershipsResponse, { data: joinPageData }] = await Promise.all([
    graphqlClient.query({ query: getMemberships }),
    graphqlClient.query({ query: getJoinPage })
  ]);

  const membershipsCMS = unwrapCollectionEntityResponse(membershipsResponse, 'memberships');
  const stripe = await initStripe();
  const { data: membershipPrices } = await stripe.prices.list();
  const memberships = attachPriceToMemberships(membershipsCMS, membershipPrices);

  const joinPage = joinPageData?.joinPage?.data?.attributes;

  return {
    props: {
      authenticatedUser: session ? { email: session.user.email } : null,
      memberships,
      joinPageProps: joinPage
    }
  };
};

const Join = (props) => {
  const {
    footer: footerData,
    navigation: navigationData,
    authenticatedUser,
    memberships,
    joinPageProps
  } = props;

  // Set the authenticated user state here to prevent flashing of un-authenticated Nav component state
  const { setAuthenticatedUser } = useAuth();
  useEffect(() => {
    setAuthenticatedUser(authenticatedUser);
  }, []);

  return (
    <Layout footerData={footerData} navigationData={navigationData}>
      {/* TODO: Make join-page specific seo data fields in global seo? (for each stand alone page as well) */}
      <Seo />
      <JoinPage memberships={memberships} {...joinPageProps} />
    </Layout>
  );
};

export default Join;
