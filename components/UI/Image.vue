<script setup lang="ts">
import { useImage } from '@vueuse/core';

const props = defineProps<{
  src: string | null
  size?: number // px
  alt?: string
}>();

const image = computed(() => props.src ? props.src.replace('http:', 'https:') : '');

const { isLoading, error } = useImage({ src: image.value });
const loading = computed(() => !import.meta.server && isLoading.value);
</script>

<template>
  <div
    class="image"
    :style="{
      '--size': size ? `${size}px` : '100%',
      '--icon-size': `${size ? size - 10 : 200}px`,
    }"
  >
    <client-only>
      <template v-if="loading">
        <Skeleton width="100%" class="spinner" height="100%" />
        <span class="pi pi-image" style="opacity: .1" />
      </template>

      <transition-group name="fade">
        <span v-if="!loading && error" class="pi pi-image" />
        <img v-if="!loading && !error" :src="image" :alt="alt ?? 'image'" loading="lazy">
      </transition-group>

      <template #fallback>
        <img v-if="image" :src="image" :alt="alt ?? 'image'" loading="lazy">
        <span v-else class="pi pi-image" />
      </template>
    </client-only>
  </div>
</template>

<style scoped lang="scss">
.image {
  position: relative;
  width: 100%;
  max-width: var(--size);
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  img, .spinner {
    position: absolute !important;
    inset: 0;
    object-fit: contain;
    object-position: center;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
  .pi-image {
    font-size: var(--icon-size);
  }
}
img[loading="lazy"] {
  &:before {
    content: "";
    inset: 0;
    position: absolute;
    background: transparent;
  }
}
</style>
