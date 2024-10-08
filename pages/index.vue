<script setup lang="ts">
const testStore = useTestStore();
</script>

<template>
  <div>
    <h1>Home page</h1>

    <Button @click="testStore.inc">
      GlobalInc ++
    </Button>
  </div>
</template>
