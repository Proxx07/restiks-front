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
    <nav class="page shadow padding">
      <ul>
        <li v-for="folder in folders" :key="folder.id">
          <NuxtLink :to="{ path: '/', query: { folder: folder.id } }">
            <Button
              text plain fluid
              :raised="currentFolderId === folder.id"
              :label="folder.name"
            />
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
ul li {
  :deep(.p-button) {
    justify-content: flex-start;
  }
}
</style>
