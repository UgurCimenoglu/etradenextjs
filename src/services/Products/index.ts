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
    .catch((e) => {
      throw new Error(e);
    });
};

type GetProductByQueryRequest = {
  page: number;
  size: number;
  q: string;
};
type GetProductByQueryResponse = {
  totalCount: number;
  products: List_Product[];
  q: string;
};
export const GetProductsByQuery = async (
  data: Partial<GetProductByQueryRequest>
): Promise<GetProductByQueryResponse> => {
  return await (
    await AxiosInstance()
  )
    .get<GetProductByQueryResponse>(
      `/Products/GetAllByQuery?q=${data.q}&page=${data.page}&size=${data.size}`
    )
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};

export const GetAllProductsForAdmin = async (
  getProductRequest: Partial<GetProductRequest>
): Promise<GetProductResponse> => {
  return await (
    await AxiosInstance()
  )
    .get<GetProductResponse>(
      `/products/GetAllForAdmin?page=${getProductRequest.page}&size=${getProductRequest.size}`
    )
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
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
    .catch((e) => {
      throw new Error(e);
    });
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
    .catch((e) => {
      throw new Error(e);
    });
};

type AddProductRequest = {
  name: string;
  price: number;
  stock: number;
};
type AddProductResponse = {};
export const AddProduct = async (
  data: Partial<AddProductRequest>
): Promise<AddProductResponse> => {
  return await (
    await AxiosInstance()
  )
    .post<AddProductResponse>("/Products", JSON.stringify(data))
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};

type UploadImageRequest = {
  formData: FormData;
  id: string;
};
export const UploadImage = async (data: Partial<UploadImageRequest>) => {
  return await (
    await AxiosInstance()
  )
    .post(`/Products/Upload?id=${data.id}`, data.formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};

type DeleteProductRequest = {
  id: string;
};
type DeleteProductResponse = {};
export const DeleteProduct = async (
  data: Partial<DeleteProductRequest>
): Promise<DeleteProductResponse> => {
  return await (
    await AxiosInstance()
  )
    .delete(`/Products/${data.id}`)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};

type DeleteImageRequest = {
  id: string;
  imageId: string;
};
type DeleteImageResponse = {};
export const DeleteImage = async (
  data: Partial<DeleteImageRequest>
): Promise<DeleteImageResponse> => {
  return await (
    await AxiosInstance()
  )
    .delete(`/Products/deleteProductImage/${data.id}?imageId=${data.imageId}`)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};

type UpdateProductRequest = {
  id: string;
  name: string;
  price: number;
  stock: number;
};
type UpdateProductResponse = {};
export const UpdateProduct = async (
  data: Partial<UpdateProductRequest>
): Promise<UpdateProductResponse> => {
  return await (
    await AxiosInstance()
  )
    .put<UpdateProductResponse>("/Products", JSON.stringify(data))
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};

type ChangeShowCaseImageRequest = {
  productId: string;
  imageId: string;
};
type ChangeShowCaseImageResponse = {};
export const ChangeShowCaseImage = async (
  data: Partial<ChangeShowCaseImageRequest>
): Promise<ChangeShowCaseImageResponse> => {
  return await (
    await AxiosInstance()
  )
    .get<ChangeShowCaseImageResponse>(
      `Products/ChangeShowCaseImage?productId=${data.productId}&imageId=${data.imageId}`
    )
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};
