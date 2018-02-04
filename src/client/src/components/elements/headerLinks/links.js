import $store from '@store';
import {$bus} from '#/plugins/Bus';

let buttons = [];
buttons.push({
  title: "Увійти",
  // class: "is-hidden-desktop",
  handler: () => {
    $bus.$emit('login', 'facebook');
  },
  icon: {
    name: "facebook",
    pack: "fa"
  },
  tooltip: "Увійти до акаунту",
  condition: () => !$store.getters.isLogged()
}),
  buttons.push({
    title: "Компанії",
    icon: {
      name: "home",
      pack: "fa"
    },
    tooltip: "Знайти установу",
    to: {name: 'Company.search'}
  })
buttons.push({
  title: "Користувачі",
  icon: {
    name: "search",
    pack: "fa"
  },
  condition:()=>false,
  tooltip: "Знайти користувача",
  to: {name: 'User.search'}
})
// buttons.push({
//   title: "Реєстрація",
//   class: "is-hidden-desktop",
//   handler: () => {
//     $bus.$emit('register');
//   },
//   icon: {
//     name: "account",
//     pack: "mdi"
//   },
//   tooltip: "Створити акаунт",
//   condition: () => !$store.getters.isLogged()
// })
buttons.push({
  title: "Вийти",
  handler: () => {
    $bus.$emit('logout');
  },
  icon: {
    name: "sign-out",
    pack: "fa"
  },
  tooltip: "Вийти з акаунту",
  condition: () => $store.getters.isLogged()
})
buttons.push(
  {
    title: "Сторінка",
    class: "is-hidden-desktop",
    icon: {
      name: "user",
      pack: "fa"
    },
    to: {
      name: 'Profile'
    },

    tooltip: "Ваша персональна сторінка",
    condition: () => $store.getters.isLogged()
  }
)
export default buttons;
