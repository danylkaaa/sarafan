let config = {};
config.IS_DEV = process.env.NODE_ENV.startsWith('dev');
config.ROOT_URL = window.location.host;
config.SERVER_URL = config.IS_DEV ? 'http://localhost:3000' : config.ROOT_URL;
config.auth = {
    facebook: {
        URL: '/api/v1/auth/facebook',
        SCOPE: 'public_profile,email',
    }
};
export default config;

