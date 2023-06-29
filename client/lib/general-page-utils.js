import { graphqlClient } from './graphql-api';
import {
  buildGeneralPageBySlugAndTypeQuery,
  buildGeneralPageSlugsByTypeQuery
} from '../graphql/queries';
import { unwrapCollectionEntityResponse } from './utils';

const buildGeneralPageSlugs = async (pageType) => {
  console.log('buildGeneralPageSlugs: ', pageType);
  const slugQuery = buildGeneralPageSlugsByTypeQuery(pageType);
  const slugs = unwrapCollectionEntityResponse(
    await graphqlClient.query({ query: slugQuery }),
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
  const queryResponse = await graphqlClient.query({ query });
  // console.log('queryResponse: ');
  // console.dir(queryResponse, { depth: null });
  const generalPages = unwrapCollectionEntityResponse(queryResponse, 'generalPages');
  return generalPages.length ? generalPages[0] : null;
};

export { buildGeneralPageSlugs, buildGeneralPageProps };
