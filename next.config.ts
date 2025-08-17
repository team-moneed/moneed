import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    distDir: 'dist',
    eslint: {
        dirs: ['src'],
    },
    devIndicators: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.AWS_BUCKET_URL ?? '',
            },
        ],
    },
    rewrites: async () => {
        return [
            {
                source: '/api/posts/top/:symbol*',
                destination: 'https://moneed-alpha.vercel.app/api/posts/top/:symbol*',
            },
            {
                source: '/api/posts/:postId*',
                destination: 'https://moneed-alpha.vercel.app/api/posts/:postId*',
            },
        ];
    },
};

export default nextConfig;
