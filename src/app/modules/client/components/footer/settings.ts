export interface FooterSettingObj {
  nameAndLinkRouter: string;
  routerLink: string;
}
export interface FooterSettings {
  name: string;
  list: FooterSettingObj[] | any;
}
export const footerSettings = [
  {
    name: 'компания',
    list: [
      {nameAndLinkRouter: 'о нас', routerLink: ''},
      {nameAndLinkRouter: 'контакты', routerLink: ''}
    ]
  },
  {
    name: 'полезное',
    list: [
      {nameAndLinkRouter: 'Оплата и доставка', routerLink: ''},
      {nameAndLinkRouter: 'Условия возврата', routerLink: ''},
      {nameAndLinkRouter: 'Бонусная система', routerLink: ''},
    ]
  },
  {
    name: 'покупателю',
    list: [
      {nameAndLinkRouter: 'Избранное', routerLink: ''},
      {nameAndLinkRouter: 'Публичная оферта', routerLink: ''},
      {nameAndLinkRouter: 'Политика конфиденциальности', routerLink: ''},
    ]
  },
  // {
  //   name: 'контакты',
  //   list: [
  //     {icons: [
  //         {icon: 'assets/icons/icon-instagram.svg', link: ''},
  //         {icon: 'assets/icons/icon-telegram.svg', link: ''}
  //       ]},
  //     {name: '+380994752098'},
  //     {name: 'makhortykh.ruslan@gmail.com'}
  //   ]
  // },
];
