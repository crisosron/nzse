const parse = require('pg-connection-string').parse;
const config = parse(process.env.DATABASE_URL);

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: {
        // ca: env('DATABASE_CA') // Use this if using DB on DigitalOcean which supplies its own CA certificate for a database
        // rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // Use this for self-signed certificates
        rejectUnauthorized: false
      }
    },
    debug: false
  }
});
