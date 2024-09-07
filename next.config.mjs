/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "s3.coinmarketcap.com",
      "swap.barkprotocol.net",
      "www.circle.com",
      "app.uploadcare.com",
      "assets-cdn.trustwallet.com",
      "ucarecdn.com",
    ],
  },
};

export default nextConfig;
