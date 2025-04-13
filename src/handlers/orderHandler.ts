import config from "config";
import { OrderEvents, PaymentMode } from "../types";
export const handleOrderText = (order) => {
  // todo: put proper check logic
  const { data: Order, event_type } = order;
  if (
    event_type === OrderEvents.ORDER_CREATE &&
    Order.PaymentMode === PaymentMode.CASH
  ) {
    return `Thank you for your order.\n Your Order id is: ${Order._id}`;
  }
  return "Thank you for your order";
};

export const handleOrderHtml = (order) => {
  //Todo: put proper check logic
  const { data: Order, event_type } = order;
  if (
    event_type === OrderEvents.ORDER_CREATE &&
    Order.PaymentMode === PaymentMode.CASH
  ) {
    return `
            <h2>Thank you for your order</h2>
            <h4>Your Order id is: <a href="${config.get("frontend.clientUrl")}/order/${Order._id}"> ${Order._id}</a></h4>
      `;
  }
  return "Thank you for your order";
};
