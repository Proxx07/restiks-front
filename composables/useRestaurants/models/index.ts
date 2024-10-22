/* function setPolygonFromZone(zone?: string): LngLat[][] {
  if (!zone) return [];
  try {
    return [JSON.parse(zone).coordinates[0].map((coords: [number, number]) => coords.reverse())] as LngLat[][];
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (e) {
    return [];
  }
} */

import type { IMarker, IRestaurant } from '../types';

export function setMarkerFromRestaurant(restaurant: IRestaurant): IMarker {
  return {
    id: restaurant.id,
    coordinates: [restaurant.longitude, restaurant.latitude],
    title: restaurant.name,
    iconSrc: 'markerIcon',
    address: restaurant.address,
    // regionID: restaurant.regionId,
    // polygon: setPolygonFromZone(restaurant.zone),
  };
}
