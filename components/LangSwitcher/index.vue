<script setup lang="ts">
import { en, ru, uz } from '@/assets/images';
import TextWithImage from '~/components/UI/TextWithImage.vue';

const flags: Record<string, string> = { ru, en, uz };

const { locales, locale, setLocale } = useI18n();

const lang = computed({
  get() {
    return locale.value;
  },

  set: async (value: string) => {
    await setLocale(value);
  },
});
</script>

<template>
  <Select
    v-model="lang"
    :options="locales"
    option-label="name"
    option-value="code"
    class="lang-switcher"
    :pt="{ label: 'font-16-n', option: 'font-16-n' }"
    fluid
  >
    <template #value="slotProps">
      <TextWithImage :image="flags[slotProps.value]" :img-size="25" image-no-fill :text="slotProps.value.toUpperCase()" />
    </template>

    <template #option="slotProps">
      <div class="flag-item">
        <TextWithImage :image="flags[slotProps.option.code]" :img-size="25" image-no-fill :text="slotProps.option.name" />
      </div>
    </template>
  </Select>
</template>

<style scoped lang="scss">
.lang-switcher {
  border: 0;
  --p-select-shadow: none;
  --p-select-dropdown-color: var(--primary-500);
}
.flag-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
