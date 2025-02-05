import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  webpack(config, options) {
    if (options.isServer) config.devtool = 'source-map';
    return config;
  }
};

export default withNextIntl(nextConfig);
