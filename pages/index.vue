<script setup lang="ts">
const testStore = useTestStore();
</script>

<template>
  <div>
    <h1>Home page</h1>

    <button @click="testStore.inc">
      GlobalInc ++
    </button>
  </div>
</template>
