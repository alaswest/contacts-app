/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_URL: 'http://localhost:3000',
  },
  webpack: (config) => {
    config.externals.push({ knex: 'commonjs knex' }).knex;
    return config;
  },
};

module.exports = nextConfig;
