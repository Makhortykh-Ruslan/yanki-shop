export interface Filter {
  nameFilter: string;
  filterData: any[];
}
export const settingFilter: Filter[] = [
  {
    nameFilter: 'Размер',
    filterData: ['xs', 's', 'm', 'l', 'xl']
  },
  {
    nameFilter: 'Цвет',
    filterData: ['0001', '0002', '0003', '0004', '0005']
  },
  {
    nameFilter: 'Цена',
    filterData: ['xs', 's', 'm', 'l', 'xl']
  }
];
