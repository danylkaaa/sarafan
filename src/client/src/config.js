let config = {};
config.IS_DEV = process.env.NODE_ENV.startsWith('dev');
config.ROOT_URL = window.location.host;
config.SERVER_URL = config.IS_DEV ? 'http://localhost:3000' : config.ROOT_URL;
config.auth = {
  facebook: {
    APP_ID: '149504242426780',
    URL: '/api/v1/auth/facebook',
    SCOPE: 'public_profile, email',
  }
};
config.roles=[
  "програміст",
  "лікар",
  "вчитель",
  "прибиральник"
]
export default config;
