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
