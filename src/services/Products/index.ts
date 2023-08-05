import { List_Product } from "@/contracts/products/list_product";
import AxiosInstance from "@/lib/axios";

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
): Promise<GetProductResponse> => {
  return await (
    await AxiosInstance()
  )
    .get<GetProductResponse>(
      `/products?page=${getProductRequest.page}&size=${getProductRequest.size}`
    )
    .then((res) => res.data)
    .catch((e) => e);
};

type GetProductByIdRequest = {
  id: string;
};
type GetProductByIdResponse = {
  name: string;
  stock: number;
  price: number;
};
export const GetProductById = async (
  getProductById: GetProductByIdRequest
): Promise<GetProductByIdResponse> => {
  return await (
    await AxiosInstance()
  )
    .get<GetProductByIdResponse>(`/products/${getProductById.id}`)
    .then((res) => res.data)
    .catch((e) => e);
};

type GetProductImageRequest = {
  id: string;
};
type GetProductImageResponse = {
  id: string;
  path: string;
  fileName: string;
  showCase: boolean;
};
export const GetProductImageById = async (
  getProductImageById: GetProductImageRequest
): Promise<GetProductImageResponse[]> => {
  return await (
    await AxiosInstance()
  )
    .get<GetProductImageResponse[]>(
      `/products/getproductimages/${getProductImageById.id}`
    )
    .then((res) => res.data)
    .catch((e) => e);
};
