<script setup lang="ts">
const { data } = await useFetch('/api/regionmenu', { query: { RegionId: 0, Language: 2 } });
const categories = computed(() => data?.value?.categories.filter(i => !i.parentId)) ?? [];
const activeFolder = ref<string>('');
const products = computed(() => data?.value?.products.filter(prod => prod.category.id === activeFolder.value) ?? []);
</script>

<template>
  <div class="page">
    <div class="folders" style="display: flex; gap: 2rem; flex-wrap: wrap; max-width: 100rem;">
      <Button v-for="fold in categories" :key="fold.id" :data_id="fold.id" @click="activeFolder = fold.id">
        {{ fold.name }}
      </Button>
    </div>
    <hr>

    <div v-for="product in products" :id="product.id" :key="product.id" class="shadow">
      <b>{{ product.name }}</b>
      <pre style="white-space: pre-wrap;">
        {{ product }}
      </pre>
    </div>
  </div>
</template>

<style>

</style>
