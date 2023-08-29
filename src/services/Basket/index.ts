import AxiosInstance from "@/lib/axios";

type AddToCartRequest = {
  productId: string;
  quantity?: number;
};
type AddToCartResponse = {};

export const AddToCart = async (
  addToCartRequest: Partial<AddToCartRequest>
): Promise<AddToCartResponse> => {
  return await (
    await AxiosInstance()
  )
    .post<AddToCartResponse>("Baskets", JSON.stringify(addToCartRequest))
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
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
  return await (
    await AxiosInstance()
  )
    .get<GetCurrentBasketResponse[]>("Baskets")
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};

type UpdateBasketQuantityRequest = {
  basketItemId: string;
  quantity: number;
};
type UpdateBasketQuantityResponse = {};

export const UpdateQuantity = async (
  updateBasketQuantity: UpdateBasketQuantityRequest
): Promise<UpdateBasketQuantityResponse> => {
  return await (
    await AxiosInstance()
  )
    .put("Baskets", JSON.stringify(updateBasketQuantity))
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};

type DeleteProductFromBasketRequest = {
  basketItemId: string;
};
type DeleteProductFromBasketResponse = {};
export const DeleteProductFromBasket = async (
  DeleteProductFromBasketRequest: DeleteProductFromBasketRequest
): Promise<DeleteProductFromBasketResponse> => {
  return await (
    await AxiosInstance()
  )
    .delete(`Baskets/${DeleteProductFromBasketRequest.basketItemId}`)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};
