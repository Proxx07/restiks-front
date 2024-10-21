<script setup lang="ts">
import type { IModifier } from '~/composables/useMenu/types';

const props = defineProps<{
  amount: number
  item: IModifier
  active: boolean
  groupLength: number
}>();

const emit = defineEmits<{
  (e: 'modifierSelected'): void
}>();

const count = defineModel<number>('amount');

const clickHandler = () => {
  if (props.active) return;
  emit('modifierSelected');
};
</script>

<template>
  <div class="item-wrapper" :class="[active && 'active']">
    <Button text fluid class="modifier-button" @click="clickHandler">
      <UITextWithImage :image="item.imageUrl" :img-size="30" :text="item.name" text-class="font-14-n" />
    </Button>
    <transition name="slideX-right">
      <template v-if="active">
        <input-number
          v-if="item.upLimit !== 1"
          v-model="count"
          show-buttons
          button-layout="horizontal"
          :min="groupLength < item.downLimit ? item.downLimit : 0"
          :max="item.maxOneDish ? item.maxOneDish : 100"
          style="width: 15rem; margin-right: .5rem; right: 0;"
        >
          <template #decrementbuttonicon>
            <i class="pi pi-minus" />
          </template>

          <template #incrementbuttonicon>
            <i class="pi pi-plus" />
          </template>
        </input-number>
        <i v-else class="pi pi-check check-icon" style="font-size: 2rem" />
      </template>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.item-wrapper {
  display: flex;
  align-items: center;
  gap: .5rem;
  border-radius: var(--radius-m);
  border: 1px solid var(--p-surface-300);
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: var(--primary-500);
  }
  &.active {
    border-color: var(--primary-500);
  }
  .check-icon {
    position: absolute;
    right: .5rem;
    pointer-events: none;
    top: 50%;
    transform: translateY(-50%);
  }
}
.modifier-button {
  justify-content: flex-start;
  color: var(--text-color);
}
</style>
