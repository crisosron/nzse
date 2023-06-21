import { graphqlClientURQL } from './graphql-api';
import {
  buildGeneralPageBySlugAndTypeQuery,
  buildGeneralPageSlugsByTypeQuery
} from '../graphql/queries';
import { unwrapCollectionEntityResponse } from './utils';

const buildGeneralPageSlugs = async (pageType) => {
  console.log('buildGeneralPageSlugs: ', pageType);
  const slugQuery = buildGeneralPageSlugsByTypeQuery(pageType);
  const slugQueryResults = await graphqlClientURQL.query(slugQuery).toPromise();
  console.log('slugQueryResults: ');
  console.dir(slugQueryResults, { depth: null });
  const slugs = unwrapCollectionEntityResponse(
    // await graphqlClient.query({ query: slugQuery }),
    await graphqlClientURQL.query(slugQuery).toPromise(),
    'generalPages'
  ).map((entry) => {
    if (pageType === 'Root') return `/${entry.slug}`;
    return `/${pageType.toLowerCase()}/${entry.slug}`;
  });

  console.log('Got slugs: ', slugs);

  return slugs;
};

const buildGeneralPageProps = async (params, pageType) => {
  const { slug } = params;
  const query = buildGeneralPageBySlugAndTypeQuery(slug, pageType);
  // const queryResponse = await graphqlClient.query({ query });
  const queryResponse = await graphqlClientURQL.query(query).toPromise();
  console.log('queryResponse: ');
  console.dir(queryResponse, { depth: null });
  const generalPages = unwrapCollectionEntityResponse(queryResponse, 'generalPages');
  return generalPages.length ? generalPages[0] : null;
};

export { buildGeneralPageSlugs, buildGeneralPageProps };
