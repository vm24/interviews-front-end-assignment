/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
        {
            protocol: 'http',
            hostname: 'localhost',
            pathname: '/uploads/**'
        },
        {
            protocol: 'http',
            hostname: '192.168.1.53',
            pathname: '/uploads/**'
        },
        ]
    }
};

export default nextConfig;
