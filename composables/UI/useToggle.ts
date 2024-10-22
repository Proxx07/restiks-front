export const useToggle = () => {
  const show = ref<boolean>(false);

  const open = () => {
    show.value = true;
  };

  const close = () => {
    show.value = false;
  };

  const toggle = () => {
    show.value = !show.value;
  };

  return { show, open, close, toggle };
};
