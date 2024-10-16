<script setup lang="ts">
import type { IModifierGroup, IProduct } from '~/composables/useMenu/types';

const props = defineProps<{
  product: IProduct
}>();

defineEmits<{
  (e: 'addToCart', id: string): void
}>();

const modifiers = computed<IModifierGroup>(() => props.product.modifiers.reduce((acc, curr) => {
  if (!acc[curr.modiGroup]) {
    acc[curr.modiGroup] = {
      name: curr.modiGroupName,
      list: [curr],
    };
  }
  else {
    acc[curr.modiGroup].list.push(curr);
  }
  return acc;
}, {} as IModifierGroup));

const modi = ref<string[]>([]);
</script>

<template>
  <card-item class="product">
    <UI-image :src="product.imageUrl.replace('http:', 'https:')" />
    <h5>{{ product.name }}</h5>

    <div class="modifiers">
      <div v-for="modifier in Object.keys(modifiers)" :key="modifier" class="modifier-group" style="margin: 1.5rem 0">
        <b>{{ modifiers[modifier].name }}: </b>
        <SelectButton
          v-model="modi"
          class="modifiers-list"
          :options="modifiers[modifier].list"
          option-label="name"
          option-value="id"
          multiple
          aria-labelledby="multiple"
        />

        <!--          <div v-for="item in modifiers[modifier].list" :key="item.id" style="margin-top: .5rem"> -->
        <!--            {{ item.name }} -->
        <!--          </div> -->
      </div>
    </div>
  </card-item>
</template>

<style lang="scss" scoped>
.product {
  img {
    max-width: 100%;
  }
  :deep(.p-card-body) {
    flex-grow: 1;
    .p-card-content {
      height: 100%;
    }
  }

  .modifiers-list {
    flex-direction: column;
    display: flex;
    gap: 0.5rem;
  }
}
</style>
