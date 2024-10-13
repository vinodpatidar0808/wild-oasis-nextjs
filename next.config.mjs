/** @type {import('next').NextConfig} */
// NOTE: output:'export' --> exports our site as set of static files which can be deployed on any hosting provider
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "dawrmsgdgtcgemprdpch.supabase.co",
        port: '',
        pathname: '/storage/v1/object/public/cabin-images/**',
      },
    ],
  },
  // output:"export"
};


export default nextConfig;
