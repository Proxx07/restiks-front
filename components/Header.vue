<script setup lang="ts">
defineProps<{
  logo: string
  pages: Record<string, string>[]
}>();
</script>

<template>
  <header class="header">
    <img :src="logo" alt="" height="150" width="150">
    <nav>
      <NuxtLink v-for="page in pages" :key="page.link" :to="page.link">
        <Button :label="page.name" text plain />
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
