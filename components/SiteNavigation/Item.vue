<script setup lang="ts">
defineProps<{
  title: string
  buttonText?: string
  icon: string
}>();

const emit = defineEmits<{
  (e: 'buttonClicked', value: MouseEvent): void
}>();
</script>

<template>
  <div class="item-wrapper">
    <div v-if="icon" class="icon">
      <UIIcon :icon="icon" />
    </div>

    <div class="details">
      <div class="font-14-n" v-text="title" />
      <Button
        v-if="buttonText"
        class="item-button"
        fluid
        :pt="{ root: 'font-14-n text-left' }"
        :label="buttonText"
        text
        @click="e => emit('buttonClicked', e)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.item-wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;

  .icon {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: var(--radius-round);
    padding: .8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-500);
    position: relative;
    overflow: hidden;
    &:before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: var(--primary-500);
      opacity: .2;
      pointer-events: none;
    }
  }
  .item-button {
    --p-button-padding-y: .2rem;
    --p-button-padding-x: .1rem;
  }

  .details {
    flex-grow: 1;
    min-width: 7rem;
  }
}
</style>
