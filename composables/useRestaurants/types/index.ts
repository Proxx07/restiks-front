export interface IRestaurant {
  id: string
  regionId: number
  name: string
  longitude: number
  latitude: number
  address: string
  notWork: boolean
  startOfWorkingTime: number
  endOfWorkingTime: number
  imageUrl: string
  isActive: boolean
}

export interface IMarker {
  id: string
  title: string
  coordinates: [number, number] // LngLat
  iconSrc: string

  address?: string
}
