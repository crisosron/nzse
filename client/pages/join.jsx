/* eslint-disable indent */
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
import { deleteCookie } from 'cookies-next';

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

const findSuccessfulCheckoutSession = async (successfulSessionId, stripe) => {
  let successfulCheckoutSession = null;

  const defaultError = {
    status: 500,
    message:
      'Something went wrong. Please contact info@nzse.org.nz for more information about your request'
  };

  successfulCheckoutSession = await stripe.checkout.sessions.retrieve(successfulSessionId);
  if (!successfulCheckoutSession) throw new Error(defaultError.message);

  return {
    successfulCheckoutSession
  };
};

export const getServerSideProps = async (context) => {
  const { req, res, query } = context;
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

  // A 'successful_session_url' query  will exist if this page is redirected to by Stripe after a
  // successful payment (see /api/stripe/checkout-session)
  const { successful_session_id: successfulSessionId } = query || {};
  let successfulCheckoutSession = null;
  let exception = null;
  if (successfulSessionId) {
    try {
      successfulCheckoutSession = await findSuccessfulCheckoutSession(successfulSessionId, stripe);

      // If this cookie is not deleted, on render, client side code will run to delete the Firebase
      // user whose email is the value of the cookie.
      //
      // This is because if this cookie exists AFTER the user is redirected from stripe checkout to
      // the join page, the frontend assumes that the payment has failed or has been cancelled by the user,
      // and therefore will issue an API call to remove pending member from Firebase users to make
      // the email useable again for future attempts at member registration
      deleteCookie('pendingMemberEmail', { req, res });
    } catch (caughtException) {
      exception = caughtException;
    }
  }

  return {
    props: {
      authenticatedUser: session ? { email: session.user.email } : null,
      memberships,
      joinPageProps: {
        ...joinPage,
        showPaymentSuccessState: !!successfulCheckoutSession,
        error: exception
          ? {
              message:
                'Something went wrong. Please contact info@nzse.org.nz for more information.',
              status: 500
            }
          : null
      }
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

  const { seo } = joinPageProps;

  return (
    <Layout footerData={footerData} navigationData={navigationData}>
      <Seo seo={seo} />
      <JoinPage memberships={memberships} {...joinPageProps} />
    </Layout>
  );
};

export default Join;
