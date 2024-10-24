<script setup lang="ts">
import type { IModifier, IModifierGroup, IProduct } from '~/composables/useMenu/types';

const props = defineProps<{
  product: IProduct
}>();

defineEmits<{
  (e: 'addToCart', id: string): void
}>();

const idList = computed(() => props.product.modifiers.reduce((acc, curr) => {
  if (!acc[curr.modiGroup]) {
    acc[curr.modiGroup] = [curr.id];
  }
  else {
    acc[curr.modiGroup].push(curr.id);
  }
  return acc;
}, {} as Record<string, string[]>));

const modifiers = computed<IModifierGroup>(() => props.product.modifiers.reduce((acc, curr) => {
  if (!acc[curr.modiGroup]) {
    acc[curr.modiGroup] = {
      name: curr.modiGroupName,
      list: [curr],
      upLimit: curr.upLimit,
      downLimit: curr.downLimit,
    };
  }
  else {
    acc[curr.modiGroup].list.push(curr);
  }
  return acc;
}, {} as IModifierGroup));

const kinds = ref<Record<string, number>>({});

const selectedModifiers = computed(() => Object.keys(kinds.value));

const itemClickHandler = ({ id, modiGroup }: IModifier) => {
  if (modifiers.value[modiGroup].upLimit === 0) {
    if (!kinds.value[id]) {
      kinds.value[id] = 1;
    }
  }
  else if (modifiers.value[modiGroup].upLimit === 1) {
    idList.value[modiGroup].forEach((itemId) => {
      delete kinds.value[itemId];
    });
    kinds.value[id] = 1;
  }
  else {
    kinds.value[id] = 1;
  }
};

const setModifiersDefaultValues = () => {
  Object.keys(modifiers.value).forEach((modId) => {
    if ((modifiers.value[modId].downLimit === 0 && modifiers.value[modId].upLimit === 0) || modifiers.value[modId].downLimit === modifiers.value[modId].list.length) {
      modifiers.value[modId].list.forEach((item) => {
        kinds.value[item.id] = 1;
      });
    }
    else {
      if (modifiers.value[modId].downLimit > modifiers.value[modId].list.length) {
        kinds.value[modifiers.value[modId].list[0].id] = modifiers.value[modId].list[0].maxOneDish < modifiers.value[modId].downLimit
          ? modifiers.value[modId].list[0].maxOneDish
          : modifiers.value[modId].downLimit;
      }
      else {
        for (let i = 0; i < modifiers.value[modId].downLimit; i++) {
          kinds.value[modifiers.value[modId].list[i].id] = 1;
        }
      }
    }
  });
};

setModifiersDefaultValues();

const checkKindsAmount = (value: number, id: string) => {
  if (value === 0) {
    delete kinds.value[id];
  }
};
</script>

<template>
  <card-item class="product">
    <UI-image :src="product.imageUrl" />
    <h5>{{ product.name }}</h5>
    <div class="modifiers">
      <div v-for="modifier in Object.keys(modifiers)" :key="modifier" class="modifier-group">
        <b>{{ modifiers[modifier].name }}: </b>

        <template v-for="item in modifiers[modifier].list" :key="item.id">
          <ProductModifier
            v-model:amount="kinds[item.id]"
            :active="selectedModifiers.includes(item.id)"
            :item="item"
            :group-length="modifiers[modifier].list.length"
            @modifier-selected="itemClickHandler(item)"
            @update:amount="($event: number) => checkKindsAmount($event, item.id)"
          />
        </template>
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

  .modifier-group {
    flex-direction: column;
    display: flex;
    gap: 0.5rem;
    margin: 1.5rem 0;
  }
}
</style>
