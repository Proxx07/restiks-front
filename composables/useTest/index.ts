export const useTest = () => {
  const count = ref<number>(0);

  const inc = () => {
    count.value++;
  };

  const desc = () => {
    count.value--;
  };

  return {
    count,
    inc,
    desc,
  };
};
