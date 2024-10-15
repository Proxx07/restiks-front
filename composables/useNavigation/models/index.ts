import type { Navigation } from '../types';

export const headerPages: Navigation[] = [
  {
    name: 'menu',
    link: '/',
  },

  {
    name: 'about',
    link: '/about',
  },

  {
    name: 'filial',
    link: '/filial',
  },
  {
    name: 'contacts',
    link: '/contacts',
  },
];

export const sidebarPages: Navigation[] = [
  {
    name: 'profile',
    link: '/profile',
  },

  {
    name: 'history',
    link: '/history',
  },

  {
    name: 'addresses',
    link: '/addresses',
  },

  {
    name: 'favorites',
    link: '/favorites',
  },

  {
    name: 'exit',
    action: 'exit',
  },
];
