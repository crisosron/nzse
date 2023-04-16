/* eslint-disable indent */
import { JoinPage, Layout } from '../components';
import { graphqlClient } from '../lib/graphql-api';
import { getJoinPage, getMemberships } from '../graphql/queries';
import { initStripe } from '../lib/stripe';
import { unwrapCollectionEntityResponse } from '../lib/utils';

const attachPriceToMemberships = (membershipsCMS, stripePrices) => {
  return membershipsCMS.map((membershipCMS) => {
    const price = stripePrices.find(
      (membershipPrice) => membershipPrice.id === membershipCMS.stripePriceId
    );

    if(!price) return null;

    const priceInCents = price.unit_amount_decimal || price.unit_amount;
    const priceInCentsNum = parseFloat(priceInCents);
    const priceDollar = Math.round(priceInCentsNum / 100).toFixed(2);

    return {
      ...membershipCMS,
      priceInCents,
      priceDollar
    };
  }).filter((item) => !!item);
};

export const getStaticProps = async () => {

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
      memberships,
      joinPageProps: {
        ...joinPage,
      }
    },
    revalidate: 60
  };
};

const Join = (props) => {
  const {
    footer: footerData,
    navigation: navigationData,
    memberships,
    joinPageProps
  } = props;

  return (
    <Layout footerData={footerData} navigationData={navigationData}>
      <JoinPage memberships={memberships} {...joinPageProps} />
    </Layout>
  );
};

export default Join;
