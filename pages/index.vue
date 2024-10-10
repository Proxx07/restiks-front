<script setup lang="ts">
import { useApi } from '@/composables/useApi';

const testStore = useTestStore();

const m = ref<string>('');
const query = { RegionId: 0, Language: 2 };

const { data: sysData } = useFetch('/api/system/');
// const { data } = useFetch('/api/regionmenu', { query });
const { data } = useApi('/api/menu', { query });
</script>

<template>
  <div>
    <br><br>
    <hr>
    <br><br>
    <h2>
      {{ sysData.legalNameUz }}
    </h2>
    <img :src="sysData.SiteSettings.Logo" width="150" alt="">

    <hr>

    <h1>Home page</h1>

    <Button @click="testStore.inc">
      GlobalInc ++
    </Button>

    <Button severity="secondary" @click="testStore.desc">
      GlobalDesc --
    </Button>

    <br> <br>
    <hr>
    <br>
    <div style="display:flex; flex-wrap: wrap; gap: 2rem;">
      <Button label="Primary" />
      <Button label="Secondary" severity="secondary" />
      <Button label="Success" severity="success" />
      <Button label="Info" severity="info" />
      <Button label="Warn" severity="warn" />
      <Button label="Help" severity="help" />
      <Button label="Danger" severity="danger" />

      <Button label="Primary" text />
      <Button label="Secondary" severity="secondary" text />
      <Button label="Success" severity="success" text />
      <Button label="Info" severity="info" text />
      <Button label="Warn" severity="warn" text />
      <Button label="Help" severity="help" text />
      <Button label="Danger" severity="danger" text />

      <Button label="Primary" outlined />
      <Button label="Secondary" severity="secondary" outlined />
      <Button label="Success" severity="success" outlined />
      <Button label="Info" severity="info" outlined />
      <Button label="Warn" severity="warn" outlined />
      <Button label="Help" severity="help" outlined />
      <Button label="Danger" severity="danger" outlined />
    </div>

    <pre>
      {{ data }}
    </pre>

    <div style="display:flex; flex-wrap: wrap; gap: 2rem; padding-top: 2rem;">
      <Select v-model="m" fluid :options="['job1', 'job2', 'job3', 'job4']" style="flex-grow: 1" placeholder="Поиск..." />
      <Select v-model="m" fluid :options="['job1', 'job2', 'job3', 'job4']" style="flex-grow: 1" placeholder="Поиск..." />
    </div>
  </div>
</template>
