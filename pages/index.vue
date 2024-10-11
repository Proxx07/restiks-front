<script setup lang="ts">
const { data } = await useFetch('/api/regionmenu', { query: { RegionId: 0, Language: 2 }, server: false });
const categories = computed(() => data?.value?.categories.filter(i => !i.parentId)) ?? [];
const activeFolder = ref<string>('');
const foldersAndSubfolders = computed(() => data.value?.categories.filter(i => i.parentId)) ?? [];

const prods = computed(() => foldersAndSubfolders.value?.filter(i => i.parentId === activeFolder.value)) ?? [];

const cartProds = computed(() => data?.value?.products ?? []);
</script>

<template>
  <div class="page">
    <div class="folders" style="display: flex; gap: 2rem; flex-wrap: wrap; max-width: 100rem;">
      <Button v-for="fold in categories" :key="fold.id" :data_id="fold.id" @click="activeFolder = fold.id">
        {{ fold.name }}
      </Button>
    </div>
    <hr>
    prods: <pre> {{ prods }} </pre>
    <hr>
    hz: <pre> {{ foldersAndSubfolders }} </pre>
    <hr>
    cartProds: <pre> {{ cartProds }} </pre>
  </div>
</template>

<style>

</style>
