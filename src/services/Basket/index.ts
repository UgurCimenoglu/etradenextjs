import AxiosInstance from "@/lib/axios";

type AddToCartRequest = {
  productId: string;
  quantity?: number;
};
type AddToCartResponse = {};

export const AddToCart = async (
  addToCartRequest: Partial<AddToCartRequest>
): Promise<AddToCartResponse> => {
  const response = await (
    await AxiosInstance()
  ).post<AddToCartResponse>("Baskets", JSON.stringify(addToCartRequest));
  return response.data;
};

type GetCurrentBasketResponse = {
  basketItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};
export const GetCurrentBasket = async (): Promise<
  GetCurrentBasketResponse[]
> => {
  const response = await (
    await AxiosInstance()
  ).get<GetCurrentBasketResponse[]>("Baskets");
  return response.data;
};

type UpdateBasketQuantityRequest = {
  basketItemId: string;
  quantity: number;
};
type UpdateBasketQuantityResponse = {};

export const UpdateQuantity = async (
  updateBasketQuantity: UpdateBasketQuantityRequest
): Promise<UpdateBasketQuantityResponse> => {
  const response = await (
    await AxiosInstance()
  ).put("Baskets", JSON.stringify(updateBasketQuantity));
  return response.data;
};

type DeleteProductFromBasketRequest = {
  basketItemId: string;
};
type DeleteProductFromBasketResponse = {};
export const DeleteProductFromBasket = async (
  DeleteProductFromBasketRequest: DeleteProductFromBasketRequest
): Promise<DeleteProductFromBasketResponse> => {
  const response = await (
    await AxiosInstance()
  ).delete(`Baskets/${DeleteProductFromBasketRequest.basketItemId}`);
  return response.data;
};
