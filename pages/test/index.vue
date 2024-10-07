<script setup lang="ts">
import { useTest } from '~/composables/useTest';

const { count, inc } = useTest();
const testStore = useTestStore();
</script>

<template>
  <div>
    <h1>Test page</h1>
    LocalState: {{ count }}

    <button @click="inc">
      +
    </button>

    <hr>
    GlobalState = {{ testStore.count }}
  </div>
</template>

<style scoped>

</style>
