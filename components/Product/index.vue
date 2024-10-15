<script setup lang="ts">
import type { IProduct } from '~/composables/useMenu/types';

defineProps<{
  product: IProduct
}>();

defineEmits<{
  (e: 'addToCart', id: string): void
}>();
</script>

<template>
  <card-item class="product">
    <UI-image :src="product.imageUrl.replace('http:', 'https:')" />
    <h5>{{ product.name }}</h5>
  </card-item>
</template>

<style lang="scss" scoped>
.product {
  img {
    max-width: 100%;
  }
  :deep(.p-card-body) {
    flex-grow: 1;
    .p-card-content {
      height: 100%;
    }
  }
}
</style>
