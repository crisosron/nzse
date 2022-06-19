module.exports = ({ env }) => ({
  proxy: true,
  url: env('STAGING_APP_URL'),
  app: {
    keys: env.array('APP_KEYS')
  },

  // Note that STRAPI_PORT will not work here because heroku will try to look for a PORT env var
  // instead
  port: env.int('PORT'),
});