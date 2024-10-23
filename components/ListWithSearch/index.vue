<script setup lang="ts">
const props = defineProps<{
  search?: string

  list: Array<Record<string, any>>
  listNameKey: string
  listSubKey: string
}>();

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'item-click', value: any): void
}>();

const searchText = computed({
  get() {
    return props.search || '';
  },

  set(value: string) {
    emit('update:search', value);
  },
});
</script>

<template>
  <div class="list-with-search">
    <InputText
      v-if="search !== undefined"
      v-model="searchText" class="search-item"
      :placeholder="$t('header.search')"
      :pt="{ root: 'font-12-n' }" fluid
    />
    <div class="list">
      <transition-group name="slideX">
        <Card v-for="item in list" :key="item.id" class="flat list-item" :class="[item.isActive && 'active']" @click="emit('item-click', item)">
          <template #content>
            <div class="font-16-b">
              {{ item[listNameKey] }}
            </div>
            <div v-if="listSubKey && item[listSubKey]" class="font-14-n" style="margin-top: .5rem">
              {{ item[listSubKey] }}
            </div>
          </template>
        </Card>
      </transition-group>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-with-search {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .list-item {
    margin-bottom: .5rem;
    cursor: pointer;
  }
}
.search-item {
  position: sticky;
  top: 0;
}
</style>
