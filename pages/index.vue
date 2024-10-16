<script setup lang="ts">
const menuStore = useMenuStore();
</script>

<template>
  <div class="page">
    <div class="products-list">
      <product v-for="product in menuStore.currentProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.products-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
</style>
