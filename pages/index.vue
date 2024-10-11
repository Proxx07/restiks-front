<script setup lang="ts">
const $toast = useToastStore();
</script>

<template>
  <div class="page">
    <h1>Home</h1>

    <div style="display: flex; gap: 2rem; margin-top: auto">
      <Button label="Info toast with default title and custom text" @click="$toast.info('default title, custom text')" />
      <Button label="Success toast with default title and custom text" severity="success" @click="$toast.success('default title, custom text')" />
      <Button label="Warning toast with default title and custom text" severity="warn" @click="$toast.warning('default title, custom text')" />
      <Button label="Error toast with default title and custom text" severity="error" @click="$toast.error('default title, custom text')" />
    </div>
  </div>
</template>

<style>
</style>
