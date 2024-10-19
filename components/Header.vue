<script setup lang="ts">
import type { Navigation } from '~/composables/useNavigation/types';

defineProps<{
  logo: string
  pages: Navigation[]
}>();

const emit = defineEmits<{
  (e: 'loginButtonClick'): void
}>();

const localePath = useLocalePath();
</script>

<template>
  <header class="header">
    <NuxtLink v-if="logo" :to="localePath('/')" class="header__logo">
      <img :src="logo" alt="Logo">
    </NuxtLink>
    <div class="header__content">
      <div class="header__content-top">
        <site-navigation :pages="pages" class="header__navigation" />

        <slot name="header-items" />

        <div class="header__content-top-buttons">
          <LangSwitcher />
          <Button severity="secondary" label="LoginButton" @click="emit('loginButtonClick')" />
        </div>
      </div>

      <div class="header__content-bottom">
        <slot name="header-bottom" />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  &__logo {
    font-size: 0;
    min-width: 15rem;
    max-width: 15rem;
    img {
      max-width: 100%;
    }
  }

  &__navigation {
    flex-grow: 1;
  }

  &__content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    &-top {
      display: grid;
      grid-template-columns: 6fr 3fr 1fr 2fr;
      gap: 2rem;
      &-buttons {
        display: flex;
        align-items: center;
        gap: 1rem;
        min-width: 19rem;
      }
    }

    &-bottom {
      display: grid;
      grid-template-columns: 10fr 2fr;
      gap: 2rem;
    }
  }
}
</style>
