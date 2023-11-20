export interface IDays {
  _id: string,
  total: number
}

export interface ISection {
  id: number,
  title: string,
  page: string,
  total: number,
  showChart: boolean,
  order: number,
  labelTooltip?: string,
  range?: string[],
  totalLastWeek?: number,
  data?: IDays[]
}

export interface IData {
  label: string,
  value: number,
  selected: boolean
}

export interface ITable {
  headers: [],
  items: [],
  actions: [],
}

export interface ITooltipIcon {
  icon: string,
  tooltip: string,
}

export interface IMail {
  newEmail: string,
  newEmailConfirm: string
}

export interface IPass {
  password: string,
  newPassword: string,
  newPasswordConfirm: string
}

export interface IRecipe {
  _id: string,
  title: string,
  cookingTime: number,
  origin: string,
  temperatureCategory: number,
  unitTime: number,
  categories: number[]
  description: string,
  likes: number
}

export interface IRecipeData extends IRecipe {
  img: string,
  photo: string,
  author: {
    _id: string,
    nickname: string,
    name: string,
    lastname: string
  },
}

export interface ICategory {
  name?: string,
  selected?: boolean,
  label: string,
  value: number
}

export interface IObject {
  label: string,
  value: number,
};

export interface IObjectStr {
  label: string,
  value: string,
}

export interface IObjectCountry {
  label: string,
  value: string,
}

export interface IObjectAPI {
  name: string,
  value: string,
  countryCode?: string
}

export interface IIngredient {
  name: string,
  quantity: number,
  type: string
}

export interface Location {
  address: string,
  city: string,
  country: string,
  postCode: number,
  state: string,
}

export interface IConstraints {
  audio: boolean,
  video: {
    width: object,
    height: object
  }
}

export interface IUser {
  _id: string,
  name: string,
  lastname: string,
  email?: string,
  telephone: number,
  premium?: boolean,
  birthday: string,
  imageProfile?: string,
  location: Location,
  entryDate?: Date,
  lastSession?: Date,
  role?: number,
}

export interface IPagination {
  skip: number;
  limit: number;
}

export interface ICountry {
  _id: number,
  name: string,
  alpha2: string,
  countryCode: string
}

export interface IList {
  _id: number,
  name: string,
  alpha2: string,
  countryCode: string
}
