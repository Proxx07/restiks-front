export type ActionTypes = 'exit';

export interface LinkNavigations {
  name: string
  link: string
  icon?: string
}

export interface ActionNavigation {
  name: string
  action: ActionTypes
  icon?: string
}

export type Navigation = (LinkNavigations & { action?: never } | ActionNavigation & { link?: never });
