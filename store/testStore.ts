import { useTest } from '~/composables/useTest';

export const useTestStore = defineStore('test', () => {
  const { count, inc, desc } = useTest();

  return {
    count, inc, desc,
  };
});
