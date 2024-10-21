<script setup lang="ts">
const props = defineProps<{
  text: string
  image?: string
  imgSize: number
  textClass?: string // for font-classes 'font-12-n'
  imageNoFill?: boolean
}>();

const isIcon = computed(() => props.image && props.image.startsWith('<svg'));
</script>

<template>
  <div class="image-text">
    <div class="image" :style="{ '--width': `${props.imgSize}px` }">
      <UIIcon v-if="isIcon" :icon="image ?? ''" :no-fill="imageNoFill" />
      <UIImage v-else :src="image" :size="props.imgSize" />
    </div>
    <span class="text" :class="[textClass]"> {{ text }} </span>
  </div>
</template>

<style scoped lang="scss">
.image-text {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: currentColor;
  .image {
    width: 100%;
    max-width: var(--width);
    min-width: var(--width);
    font-size: 0;
  }
  .text {
    flex-grow: 1;
    text-align: left;
    font: var(--font-16-n);
    line-height: 1 !important;
  }
}
</style>
