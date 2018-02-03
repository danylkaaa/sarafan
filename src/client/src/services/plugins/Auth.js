import AuthAPI from '#/AuthAPI'
import $store from '@store';
import $config from '@config';

function fbAuth () {
  return new Promise((resolve, reject) => {
    FB.login(result => {
      if (result.authResponse) {
        resolve(result.authResponse.accessToken)
      } else {
        reject(result);
      }
    }, {scope: $config.auth.facebook.scope})
  });
}

async function loginFacebook () {
  try {
    const accessToken = await fbAuth();
    let data = await AuthAPI.loginFB(accessToken);
    saveUserInfo(data.data)
    return true;
  } catch (err) {
    throw err;
  }
}

async function loginBasic (credentials) {
  console.log('try to send')
  try {
    const response = await AuthAPI.login(credentials);
    if (response.data.success) {
      saveUserInfo(response.data);
      return true;
    } else {
      throw response.data.message
    }
  } catch (err) {
    throw ('data' in err) ? err.data.message : err.message;
  }
  return false;
}

function saveUserInfo (data) {
  $store.dispatch('LOGIN', data);
}

function clearUserInfo () {
  $store.dispatch('LOGOUT');
}

async function registerBasic (credentials) {
  console.log('try to send')
  try {
    const response = await AuthAPI.register(credentials);
    if (response.data.success) {
      saveUserInfo(response.data);
      return true;
    } else {
      throw response.data.message;
    }
  } catch (err) {
    throw ('data' in err) ? err.data.message : err.message;
  }
  return false;
}

export default {
  install (Vue) {
    FB.init({
      appId: $config.auth.facebook.APP_ID,
      status: false,
      cookie: false,
      xfbml: false,
      version: 'v2.8' // use graph api version 2.5
    });
    Vue.prototype.$auth = {
      logout () {
        clearUserInfo();
      },
      login (type, credentials) {
        switch (type) {
          case 'facebook':
            return loginFacebook();
            break;
          case 'basic':
            return loginBasic(credentials);
        }
      },
      register (type, credentials) {
        switch (type) {
          case 'facebook':
            return loginFacebook();
            break;
          case 'basic':
            return registerBasic(credentials);
            break;
        }
      }
    }
  }
}

