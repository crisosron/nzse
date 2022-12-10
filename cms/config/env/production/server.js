module.exports = ({ env }) => ({
  proxy: true,
  url: env('STAGING_APP_URL'),
  app: {
    keys: env.array('APP_KEYS')
  },
  port: env.int('STRAPI_PORT'),
});