import type {ComponentCustomProperties as LocalesInterface } from 'vue-i18n';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends LocalesInterface {
    $t: LocalesInterface.$t
  }
}