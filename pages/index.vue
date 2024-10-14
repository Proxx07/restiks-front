<script setup lang="ts">
const menuStore = useMenuStore();
</script>

<template>
  <div class="page">
    <div v-if="menuStore.loading">
      Loading ...
    </div>
    <template v-else>
      <div v-for="product in menuStore.currentProducts" class="product">
        <img :src="product.imageUrl" alt="" width="200">
        <h5>{{ product.name }}</h5>
      </div>
    </template>
  </div>
</template>

<style>

</style>
