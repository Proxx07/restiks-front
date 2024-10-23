<script setup lang="ts">
import icon from '@/assets/images/rest-icon.svg?raw';
</script>

<template>
  <span class="icon" v-html="icon" />
</template>

<style scoped lang="scss">
.icon {
  :deep(svg) {
    #primary {
      stop {
        stop-color: var(--primary-500);
      }
    }

    #secondary {
      stop {
        stop-color: var(--secondary-500);
      }
    }
  }
}
</style>
