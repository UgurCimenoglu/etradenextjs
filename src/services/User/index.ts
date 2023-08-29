import AxiosInstance from "@/lib/axios";

type GetAllUsersRequest = {
  page: number;
  size: number;
};
type GetAllUsersResponse = {
  users: {
    id: string;
    email: string;
    userName: string;
    fullName: string;
    twoFactorEnabled: boolean;
  }[];
  totalUsersCount: number;
};

export const GetAllUsers = async (
  data: Partial<GetAllUsersRequest>
): Promise<GetAllUsersResponse> => {
  return await (
    await AxiosInstance()
  )
    .get(`/users?page=${data.page}&size=${data.size}`)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};

type GetRolesRequest = {
  page: number;
  size: number;
};
type GetRolesResponse = {
  datas: {
    id: string;
    name: string;
  }[];
  totalCount: number;
};
export const GetAllRoles = async (
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

type GetRolesByUserIdRequest = {
  userId: string;
};
type GetRolesByUserIdResponse = {
  roles: string[];
};

export const GetRolesByUserId = async (
  data: Partial<GetRolesByUserIdRequest>
): Promise<GetRolesByUserIdResponse> => {
  return await (
    await AxiosInstance()
  )
    .get<GetRolesByUserIdResponse>(`/users/get-roles-to-user/${data.userId}`)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};

type AssingRoleToUserRequest = {
  roles: string[];
  userId: string;
};
type AssingRoleToUserResponse = {};
export const AssingRoleToUser = async (
  data: Partial<AssingRoleToUserRequest>
): Promise<AssingRoleToUserResponse> => {
  return await (
    await AxiosInstance()
  )
    .post("/users/assign-role-to-user", JSON.stringify(data))
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};
