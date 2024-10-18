<script setup lang="ts">
defineProps<{
  pages: Record<string, string>[]
}>();
const localePath = useLocalePath();
</script>

<template>
  <nav>
    <ul>
      <li v-for="page in pages" :key="page.link">
        <NuxtLink :to="localePath(page.link)">
          <Button text plain>
            {{ $t(page.name) }}
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
