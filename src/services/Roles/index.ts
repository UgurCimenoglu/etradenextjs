import { Role } from "@/contracts/roles/role";
import AxiosInstance from "@/lib/axios";

type GetRolesRequest = {
  page: number;
  size: number;
};
type GetRolesResponse = {
  datas: Role[];
  totalCount: number;
};

export const GetRoles = async (
  data: Partial<GetRolesRequest>
): Promise<GetRolesResponse> => {
  return await (
    await AxiosInstance()
  )
    .get(`/roles?page=${data.page}&size=${data.size}`)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};

type AddRoleRequest = {
  name: string;
};
type AddRoleResponse = {
  succeeded: boolean;
};
export const AddRole = async (
  data: Partial<AddRoleRequest>
): Promise<AddRoleResponse> => {
  return await (
    await AxiosInstance()
  )
    .post("/roles", JSON.stringify(data))
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};

type DeleteRoleRequest = {
  id: string;
};
type DeleteRoleResponse = {
  succeeded: boolean;
};
export const DeleteRole = async (
  data: Partial<DeleteRoleRequest>
): Promise<DeleteRoleResponse> => {
  return await (
    await AxiosInstance()
  )
    .delete(`/roles/${data.id}`)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};
