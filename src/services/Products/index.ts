import { List_Product } from "@/contracts/products/list_product";
import AxiosInstance from "../AxiosSettings";

type GetProductRequest = {
  page: number;
  size: number;
};
type GetProductResponse = {
  totalCount: number;
  products: List_Product[];
};

export const GetProducts = async (
  getProductRequest: Partial<GetProductRequest>
) => {
  const response = await AxiosInstance().get<GetProductResponse>(
    `/products?page=${getProductRequest.page}&size=${getProductRequest.size}`
  );
  return response.data;
};
