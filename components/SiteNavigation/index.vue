<script setup lang="ts">
import type { Navigation } from '~/composables/useNavigation/types';

defineProps<{
  pages: Navigation[]
}>();
const localePath = useLocalePath();
</script>

<template>
  <nav>
    <ul>
      <li v-for="page in pages" :key="page.link">
        <NuxtLink v-if="page.link" :to="localePath(page.link)">
          <Button text plain>
            {{ $t(`menu.${page.name}`) }}
          </Button>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav ul {
  display: flex;
  align-items: center;
}
</style>
