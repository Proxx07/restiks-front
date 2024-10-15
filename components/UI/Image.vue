<script setup lang="ts">
import { useImage } from '@vueuse/core';

const props = defineProps<{
  src: string
  size?: number // px
  alt?: string
}>();

const { isLoading, error } = useImage({ src: props.src });
</script>

<template>
  <div class="image" :style="{ '--size': size ? `${size}px` : '100%' }">
    <client-only>
      <template v-if="isLoading">
        <Skeleton width="100%" class="spinner" height="100%" />
        <span class="pi pi-image" style="opacity: .1" />
      </template>

      <transition-group name="fade">
        <span v-if="!isLoading && error" class="pi pi-image" />
        <img v-if="!isLoading && !error" :src="props.src" :alt="alt ?? 'image'">
      </transition-group>

      <template #fallback>
        <img :src="props.src" :alt="alt ?? 'image'" loading="lazy">
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
    font-size: 20rem;
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
