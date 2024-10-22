export type DeliveryValues = 0 | 200;

// delivery - 0
// self-delivery - 200

export interface IDelivery {
  name: string
  value: DeliveryValues
}
