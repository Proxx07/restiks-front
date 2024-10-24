export const useLocation = () => {
  const longitude = useCookie<number>('longitude', { default: () => 0 });
  const latitude = useCookie<number>('latitude', { default: () => 0 });

  const longLat = computed<[number, number]>(() => [
    longitude.value,
    latitude.value,
  ]);

  const setLong = (value: number) => {
    longitude.value = value;
  };

  const setLat = (value: number) => {
    latitude.value = value;
  };

  const setLongLat = (value: [number, number]) => {
    setLong(value[0]);
    setLat(value[1]);
  };

  return {
    longLat,
    setLong,
    setLat,
    setLongLat,
  };
};
