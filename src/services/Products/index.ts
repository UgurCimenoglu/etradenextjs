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
  const response = await (
    await AxiosInstance()
  ).get<GetProductResponse>(
    `/products?page=${getProductRequest.page}&size=${getProductRequest.size}`
  );
  return response.data;
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
  const response = await (await AxiosInstance()).get<GetProductByIdResponse>(
    `/products/${getProductById.id}`
  );
  return response.data;
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
  const response = await(await AxiosInstance()).get<GetProductImageResponse[]>(
    `/products/getproductimages/${getProductImageById.id}`
  );
  return response.data;
};
