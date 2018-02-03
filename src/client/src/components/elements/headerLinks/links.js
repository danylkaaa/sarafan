import $store from '@store';
import {$bus} from '#/plugins/Bus';

let buttons = [];
buttons.push({
  title: "Home",
  class: "is-hidden-desktop",
  icon: {
    name: "home",
    pack: "fa"
  },
  to: {name: "MemesView", query: {sort: "title"}},
  tooltip: "Back to home",
})
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
  condition: () => $store.getters.isNotLogged()
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
  condition: () => $store.getters.isNotLogged()
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
buttons.push({
  title: "Discover",
  tooltip: "All our memes is for you",
  children: [
    {
      to: {name: 'MemesView', query: {sort: "rating"}},
      title: "Top",
      icon: {
        name: "fire",
        pack: "mdi",
      },
      tooltip: "Show the best memes",
    },
    {
      title: "New",
      to: {name: 'MemesView', query: {sort: "date"}},
      icon: {
        name: "timelapse",
        pack: "mdi",
      },
      tooltip: "Show new memes",
    },
  ]
})
buttons.push({
  title: "Work",
  condition: () => $store.getters.isLogged(),
  tooltip: "Work hard",
  to: {name: 'MemePicker'}
})
// buttons.push({
//   title: "Users",
//   condition: () => $store.getters.isLogged() && $store.state.user.role == 'admin',
//   tooltip: "Display all registered users",
//   to: {name: 'UsersView'}
// })
export default buttons;
