import API from '#/API';
import $config from '@config';

export default {
  register (credentials) {
    console.log('send');
    return API
      .noAuth()
      .post('/api/v1/auth/register/', credentials);
  },
  login (credentials) {
    console.log('send');
    return API
      .basic(credentials.email, credentials.password)
      .post('/api/v1/auth/login/');
  },
  loginFB (token) {
    return API
      .noAuth()
      .post('/api/v1/auth/facebook/', {access_token: token})
  }
}
