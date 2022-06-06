export interface NavigateLink {
  name: string;
  link?: string;
  iconLink?: string;
  logIn? : boolean;
}
export const routerNavigate: NavigateLink[] = [
  {
    name: 'new',
    link: '',
  },
  {
    name: 'каталог',
    link: 'products',
  },
  {
    name: 'о нас',
    link: '',
  },
];
export const iconsArr: NavigateLink[] = [
  // {
  //   name: '',
  //   iconLink: 'assets/icons/icon-search.svg'
  // },
  {
    name: 'personalArea',
    link: '/clientAccount',
    iconLink: 'assets/icons/icon-personalArea.svg',
    logIn: true,
  },
  // {
  //   name: 'heart',
  //   link: '',
  //   iconLink: 'assets/icons/icon-heart.svg'
  // },
  {
    name: 'cart',
    link: '',
    iconLink: 'assets/icons/icon-basket.svg'
  }
];
