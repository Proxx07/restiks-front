<script setup lang="ts">
const props = defineProps<{
  icon: string
  spanBg?: string
  color?: string
  noFill?: boolean
}>();

const colorVal = computed(() => props.color || 'unset');
const background = computed(() => props.spanBg || 'transparent');
</script>

<template>
  <span
    :style="{ color: colorVal, background }"
    :class="[noFill && 'no-fill']"
    v-html="props.icon"
  />
</template>

<style scoped lang="scss">
span {
  display: inline-block;
  font-size: 0;
  overflow: hidden;
  :deep(svg) {
    width: auto;
    max-width: 100%;
    max-height: 100%;
  }
  &:not(.no-fill) {
    :deep(svg) {
      path[fill] {
        fill: currentColor;
      }
      path[stroke] {
        stroke: currentColor;
      }
    }
  }
}
</style>
