import API from '#/API';
import $config from '@config';

export default {
    loginFB (token) {
        return API
            .noAuth()
            .post($config.auth.facebook.URL, {access_token: token})
    }
}
