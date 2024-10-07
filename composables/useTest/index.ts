export const useTest = () => {
  const count = ref<number>(0);

  const inc = () => {
    count.value++;
  };

  return {
    count,
    inc,
  };
};
