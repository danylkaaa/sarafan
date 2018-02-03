import $store from '@store';
import {$bus} from '#/plugins/Bus';

let buttons = [];
buttons.push({
  title: "Login",
  class: "is-hidden-desktop",
  handler: () => {
    $bus.$emit('login');
  },
  icon: {
    name: "sign-in",
    pack: "fa"
  },
  tooltip: "Enter to your account",
  condition: () => !$store.getters.isLogged()
})
buttons.push({
  title: "Register",
  class: "is-hidden-desktop",
  handler: () => {
    $bus.$emit('register');
  },
  icon: {
    name: "account",
    pack: "mdi"
  },
  tooltip: "Create new account",
  condition: () => !$store.getters.isLogged()
})
buttons.push({
  title: "Logout",
  class: "is-hidden-desktop",
  handler: () => {
    $bus.$emit('logout');
  },
  icon: {
    name: "sign-out",
    pack: "fa"
  },
  tooltip: "Exit from your account",
  condition: () => $store.getters.isLogged()
})
export default buttons;
