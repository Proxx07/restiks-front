export interface ISiteSettings {
  callCanterPhone: string
  email: string

  addressEn: string
  addressRu: string
  addressUz: string

  legalNameEn: string
  legalNameRu: string
  legalNameUz: string

  phonesEn: string[]
  phonesRu: string[]
  phonesUz: string[]

  SiteSettings: {
    Logo: string
    Marker: string
    Colors: Record<string, string>
  }

  socials: Array<{
    name: string
    link: string
  }>
}
