<script setup lang="ts">
const menuStore = useMenuStore();
</script>

<template>
  <div class="page">
    <div class="products-list">
      <transition-group name="fade">
        <product
          v-for="product in menuStore.currentProducts"
          :key="product.id"
          :product="product"
        />
      </transition-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.products-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(4rem, 1fr));
  gap: 2rem;
  .fade-leave-active, .fade-leave-to {
    display: none !important;
  }
}
</style>
