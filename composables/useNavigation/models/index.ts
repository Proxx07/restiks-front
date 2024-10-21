import type { Navigation } from '../types';
import { heart, logout, marker, time, user } from '@/assets/images/index';

export const headerPages: Navigation[] = [
  {
    name: 'index',
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
    icon: user,
  },

  {
    name: 'profile-history',
    link: '/profile/history',
    icon: time,
  },

  {
    name: 'profile-addresses',
    link: '/profile/addresses',
    icon: marker,
  },

  {
    name: 'profile-favorites',
    link: '/profile/favorites',
    icon: heart.replace('transparent', '#000'),
  },

  {
    name: 'exit',
    action: 'exit',
    icon: logout,
  },
];
