<script setup lang="ts">
import type { IFolder } from '~/composables/useMenu/types';

defineProps<{
  folders: IFolder[]
  currentFolderId: string
}>();
const localePath = useLocalePath();
</script>

<template>
  <aside class="aside">
    <h3> Folders </h3>
    <nav class="page shadow padding">
      <ul>
        <li v-for="folder in folders" :key="folder.id">
          <NuxtLink :to="{ path: localePath('/'), query: { folder: folder.id } }">
            <Button text plain fluid :raised="currentFolderId === folder.id">
              <div class="button-inner">
                <UIImage :size="50" :src="folder.imageUrl" />
                <transition name="slideY">
                  <span :key="folder.name" class="folder-name">
                    {{ folder.name }}
                  </span>
                </transition>
              </div>
            </Button>
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
    text-align: left;
  }

  .button-inner {
    display: flex;
    align-items: center;
    gap: .5rem;
    width: 100%;
    .folder-name {
      width: 100%;
      position: static;
      left: 6rem;
      & + .folder-name {
        position: absolute;
      }
    }
    :deep(.image) {
      min-width: 5rem;
    }
  }
}
</style>
