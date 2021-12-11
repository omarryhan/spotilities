
const withTM = require('next-transpile-modules')(['konva', 'react-konva']);

const withPWA = require('next-pwa');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Use the hidden-source-map option when you don't want the source maps to be
// publicly available on the servers, only to the error reporting
const withSourceMaps = require('@zeit/next-source-maps')();

module.exports = withTM(withPWA(withBundleAnalyzer(withSourceMaps({
  poweredByHeader: false,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV !== 'production',
  },
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },
}))));
