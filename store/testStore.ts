import { useTest } from '~/composables/useTest';

export const useTestStore = defineStore('test', () => {
  const { count, inc } = useTest();

  return {
    count, inc,
  };
});
