import AuthAPI from '#/AuthAPI'
import $store from '@store';
import $config from '@config';

function fbAuth () {
  return new Promise((resolve, reject) => {
    FB.login(result => {
      if (result.authResponse) {
        resolve(result.authResponse.accessToken)
      } else {
        reject();
      }
    }, {scope: $config.auth.facebook.scope})
  });
}

async function loginFacebook () {
  try {
    const accessToken = await fbAuth();
    let data = await AuthAPI.loginFB(accessToken);
    saveUserInfo(data.data)
  } catch (err) {
    throw err;
  }
}

function saveUserInfo (data) {
  $store.dispatch('LOGIN', data);
}

export default {
  install (Vue) {
    Vue.prototype.$auth = {
      login (type, credentials) {
        switch (type) {
          case 'facebook':
            return loginFacebook();
            break;
        }
      },
      register () {

      }
    }
  }
}

