<script setup lang="ts">
import type { IFolder } from '~/composables/useMenu/types';

defineProps<{
  folders: IFolder[]
  currentFolderId: string
}>();
</script>

<template>
  <aside class="aside">
    <h3> Folders </h3>

    <NuxtLink v-for="folder in folders" :key="folder.id" :to="{ path: '/', query: { folder: folder.id } }">
      <Button severity="secondary" text :raised="currentFolderId === folder.id" :label="folder.name" fluid />
    </NuxtLink>
  </aside>
</template>

<style scoped>

</style>
