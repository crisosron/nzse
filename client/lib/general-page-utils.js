import { graphqlClient } from './graphql-api';
import {
  buildGeneralPageBySlugAndTypeQuery,
  buildGeneralPageSlugsByTypeQuery
} from '../graphql/queries';
import { unwrapCollectionEntityResponse } from './utils';

const buildGeneralPageSlugs = async (pageType) => {
  const slugQuery = buildGeneralPageSlugsByTypeQuery(pageType);
  const slugs = unwrapCollectionEntityResponse(
    await graphqlClient.query({ query: slugQuery }),
    'generalPages'
  ).map((entry) => {
    if (pageType === 'Root') return `/${entry.slug}`;
    return `/${pageType.toLowerCase()}/${entry.slug}`;
  });

  return slugs;
};

const buildGeneralPageProps = async (params, pageType) => {
  const { slug } = params;
  const query = buildGeneralPageBySlugAndTypeQuery(slug, pageType);
  const queryResponse = await graphqlClient.query({ query });
  const generalPages = unwrapCollectionEntityResponse(queryResponse, 'generalPages');
  return generalPages.length ? generalPages[0] : null;
};

export { buildGeneralPageSlugs, buildGeneralPageProps };
