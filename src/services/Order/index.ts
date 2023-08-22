import { Order } from "@/contracts/orders/order";
import { Order_Detail } from "@/contracts/orders/order_detail";
import AxiosInstance from "@/lib/axios";

type CreateOrderRequest = {
  address: string;
  description?: number;
};
type CreateOrderResponse = {};

export const CreateOrder = async (
  createOrderRequest: Partial<CreateOrderRequest>
): Promise<CreateOrderResponse> => {
  return await (
    await AxiosInstance()
  )
    .post<CreateOrderResponse>("Orders", JSON.stringify(createOrderRequest))
    .then((res) => res.data)
    .catch((e) => e);
};

type GetOrdersRequest = {
  page: number;
  size: number;
};

type GetOrdersResponse = {
  orders: Order[];
  totalCount: number;
};

export const GetOrders = async (
  getOrdersRequest: Partial<GetOrdersRequest>
): Promise<GetOrdersResponse> => {
  return await (
    await AxiosInstance()
  )
    .get(`/Orders?page=${getOrdersRequest.page}&size=${getOrdersRequest.size}`)
    .then((res) => res.data)
    .catch((e) => e);
};

type GetOrderByIdRequest = {
  id: string;
};

export const GetOrderById = async (
  data: Partial<GetOrderByIdRequest>
): Promise<Order_Detail> => {
  return await (
    await AxiosInstance()
  )
    .get<Order_Detail>(`Orders/${data.id}`)
    .then((res) => res.data)
    .catch((e) => e);
};

type CompleteOrderRequest = {
  id: string;
};
type CompleteOrderResponse = {};

export const CompleteOrder = async (
  data: Partial<CompleteOrderRequest>
): Promise<CompleteOrderResponse> => {
  return await (
    await AxiosInstance()
  )
    .get(`/Orders/complete-order/${data.id}`)
    .then((res) => res.data)
    .catch((e) => e);
};
