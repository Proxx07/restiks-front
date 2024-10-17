<script setup lang="ts">
const menuStore = useMenuStore();

const t = ref<boolean>(false);
</script>

<template>
  <div class="page">
    <!--    <ToggleButton v-model="t" /> -->
    <div class="products-list">
      <product v-for="product in menuStore.currentProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.products-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(4rem, 1fr));
  gap: 2rem;
}
</style>
