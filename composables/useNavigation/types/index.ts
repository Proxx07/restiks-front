export type ActionTypes = 'exit';

export interface LinkNavigations {
  name: string
  link: string
}

export interface ActionNavigation {
  name: string
  action: ActionTypes
}

export type Navigation = (LinkNavigations | ActionNavigation) & { icon?: string };
