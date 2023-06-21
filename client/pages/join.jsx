/* eslint-disable indent */
import { JoinPage, Layout } from '../components';
import { graphqlClientURQL } from '../lib/graphql-api';
import { getJoinPage, getMemberships } from '../graphql/queries';
import { initStripe } from '../lib/stripe';
import { unwrapCollectionEntityResponse } from '../lib/utils';

// Stripe docs on the 'price' object: https://stripe.com/docs/api/prices/object
const attachPriceToMemberships = (membershipsCMS, stripePrices) => {
  return membershipsCMS.map((membershipCMS) => {
    const price = stripePrices.find(
      (membershipPrice) => membershipPrice.id === membershipCMS.stripePriceId
    );

    if(!price) return null;

    const priceInCents = price.unit_amount_decimal || price.unit_amount;
    const priceInCentsNum = parseFloat(priceInCents);
    const priceDollar = (priceInCentsNum / 100).toFixed(2);

    let paymentInterval;
    const intervalUnit = price.recurring?.interval; // 'month' | 'year' | 'week' | 'day'
    if(intervalUnit) {
      paymentInterval = price.recurring?.interval_count === 1 ? `per ${intervalUnit}` : `every ${price.recurring?.interval_count} ${intervalUnit}`;
    } else paymentInterval = 'one-off payment';

    return {
      ...membershipCMS,
      priceInCents,
      priceDollar,
      paymentInterval
    };
  }).filter((item) => !!item);
};

export const getStaticProps = async () => {

  const [membershipsResponse, { data: joinPageData }] = await Promise.all([
    // graphqlClient.query({ query: getMemberships }),
    // graphqlClient.query({ query: getJoinPage })
    graphqlClientURQL.query(getMemberships).toPromise(),
    graphqlClientURQL.query(getJoinPage).toPromise()
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
