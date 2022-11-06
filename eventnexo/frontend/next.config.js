/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      child_process: false,
      readline: false,
    };
    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "i.imgur.com"],
  },
};
