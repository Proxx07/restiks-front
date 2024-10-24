import type { LngLat } from '@yandex/ymaps3-types';
import type { IEmits, IProps } from './types';
import { useDebounceFn } from '@vueuse/core';
import type { DeliveryValues } from '~/composables/useDelivery/types';
import type { IMarker } from '~/composables/useRestaurants/types';
import { yandexSearch } from '~/ustils/yandexMapSearch';
import { MapPointWarnText } from './models';

export const useMapWidget = (props: IProps, emit: IEmits) => {
  const $toast = useToastStore();
  const delivery = ref<DeliveryValues>(0);
  const deliveryCoords = ref<LngLat>();
  const activeMarkerId = ref<string>('');

  const mapSearchLoading = ref<boolean>(false);
  const search = ref<string>('');
  const suggestedAddresses = ref<IMarker[]>([]);
  const selectedAddressTitle = ref<string>(MapPointWarnText);

  const list = computed<IMarker[]>(() => {
    if (delivery.value === 0) return suggestedAddresses.value.map(address => ({ ...address, isActive: address.id === activeMarkerId.value }));
    return props.restaurants
      .map(rest => ({ ...rest, isActive: rest.id === activeMarkerId.value }))
      .filter(rest => rest.title.toLowerCase().includes(search.value.toLowerCase()));
  });

  const delId = computed<DeliveryValues>({
    get() {
      return delivery.value;
    },
    set(value) {
      delivery.value = value;
      deliveryCoords.value = undefined;
      activeMarkerId.value = '';
      search.value = '';
    },
  });
  const isLoading = computed<boolean>(() => props.loading || mapSearchLoading.value);

  const mapMoveHandler = async (value: LngLat) => {
    deliveryCoords.value = value;

    mapSearchLoading.value = true;
    const result = await yandexSearch(value.join());
    selectedAddressTitle.value = result[0]?.title ?? '';
    mapSearchLoading.value = false;
  };

  const markerClickHandler = (value: IMarker) => {
    activeMarkerId.value = value.id;
    selectedAddressTitle.value = value.title;
  };
  const searchInputHandler = useDebounceFn(async (text: string) => {
    if (delivery.value === 200 || !text || text.length < 5) {
      suggestedAddresses.value = [];
    }
    else {
      mapSearchLoading.value = true;
      const result = await yandexSearch(`узбекистан ${text}`);
      suggestedAddresses.value = (result.length === 1 && result[0].title.toLowerCase() === 'узбекистан') ? [] : result;
      mapSearchLoading.value = false;
    }
  }, 500);

  const submitHandler = () => {
    if (delivery.value === 0 && !deliveryCoords.value) return $toast.warning('Укажите точку для доставки!');
    if (delivery.value === 200 && !activeMarkerId.value) return $toast.warning('Выберите ресторан для самовывоза');
    emit('confirm', {
      delivery: delivery.value,
      coords: delivery.value === 0 ? deliveryCoords.value : undefined,
      activeMarkerId: delivery.value !== 0 ? activeMarkerId.value : '',
    });
  };

  return {
    list,
    delId,
    isLoading,
    activeMarkerId,
    search,
    selectedAddressTitle,
    mapMoveHandler,
    markerClickHandler,
    searchInputHandler,
    submitHandler,
  };
};
