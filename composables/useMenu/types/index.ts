export interface IFolder {
  id: string
  parentId: string
  name: string
  order: number
  imageUrl: string
  bigImageUrl: string
  tgImage: string
}

export interface IModifier {
  id: string
  name: string
  modiGroup: number
  modiGroupName: string
  downLimit: number
  upLimit: number
  isDefault: boolean
  price: number
  orgPrice: number
  maxOneDish: number
  imageUrl: string
  bigImageUrl: string
}

export interface IProduct {
  id: string
  name: string
  category: IFolder
  subCategory: IFolder
  description: string
  imageUrl: string
  bigImageUrl: string
  price: number
  order: number
  isCombo: boolean
  isSet: boolean
  calcType: number
  modifiers: IModifier[]
  tgImage: string
  promoId: null
  discount: null
  tags: string[]
  isNew: false
}

export interface IMenuResponse {
  categories: IFolder[]
  products: IProduct[]

  data?: any
  error?: any
}

export type IModifierGroup = Record<string, {
  name: string
  list: IModifier[]
  upLimit: number
  downLimit: number
}>;

export interface IMenuDetailedResponse extends IMenuResponse {
  restaurantId: string
  /* "restaurantName": string,
  orderTypeId: 0 */
  priceOfDelivery: number
  deliveryDuration: number
}
