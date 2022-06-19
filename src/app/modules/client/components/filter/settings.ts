export interface Filter {
  nameFilter: string;
  filterData: any[];
  params: string;
}
export const settingFilter: Filter[] = [
  {
    nameFilter: 'Размер',
    filterData: ['xs', 's', 'm', 'l', 'xl'],
    params: 'size'
  },
  {
    nameFilter: 'Цвет',
    filterData: ['001', '032', '101', '132', '011'],
    params: 'color'
  },
  {
    nameFilter: 'Цена',
    filterData: ['1000', '2000', '3000', '4000', '5000'],
    params: 'price'
  }
];

export const getSettingFilter = (categories: string) => {
  const settingFilterArr: Filter[] = [
    {
      nameFilter: 'Размер',
      filterData: ['xs', 's', 'm', 'l', 'xl'],
      // filterData: categories === 'shoes' ? ['36', '37', '38', '39', '40'] : ['xs', 's', 'm', 'l', 'xl'],
      params: 'size'
    },
    {
      nameFilter: 'Цвет',
      filterData: ['001', '032', '101', '132', '011'],
      params: 'color'
    },
    {
      nameFilter: 'Цена',
      filterData: ['1000', '2000', '3000', '4000', '5000'],
      params: 'price'
    }
  ];
  const settings = [
    {
      nameFilter: 'Размер',
      filterData: ['36', '37', '38', '39', '40'],
      params: 'size'
    },
    {
      nameFilter: 'Цвет',
      filterData: ['001', '032', '101', '132', '011'],
      params: 'color'
    },
    {
      nameFilter: 'Цена',
      filterData: ['1000', '2000', '3000', '4000', '5000'],
      params: 'price'
    }
  ]
  return categories === 'shoes' ? settings : settingFilterArr;
}
