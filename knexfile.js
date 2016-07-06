module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/scr'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
