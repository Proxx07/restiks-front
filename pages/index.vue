<script setup lang="ts">
const menuStore = useMenuStore();
</script>

<template>
  <div class="page">
    <div v-if="!menuStore.loading" class="products-list">
      <transition-group name="fade">
        <product v-for="product in menuStore.currentProducts" :key="product.id" :product="product" />
      </transition-group>
    </div>

    <div v-else class="products-list">
      <Skeleton v-for="i in 12" :key="i" height="40rem" width="100%" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.products-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(4rem, 1fr));
  gap: 2rem;
  .fade-leave-active,
  .fade-leave-to {
    display: none !important;
  }
}
</style>
