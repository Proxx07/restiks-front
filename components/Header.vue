<script setup lang="ts">
defineProps<{
  logo: string
  pages: Record<string, string>[]
}>();
const localePath = useLocalePath();
</script>

<template>
  <header class="header">
    <img :src="logo" alt="" height="150" width="150">
    <nav>
      <NuxtLink v-for="page in pages" :key="page.link" :to="localePath(page.link)">
        <Button text plain>
          {{ $t(page.name) }}
        </Button>
      </NuxtLink>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
}
</style>
