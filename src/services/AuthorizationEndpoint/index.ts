import AxiosInstance from "@/lib/axios";

type GetRolesEndpointRequest = {
  menu: string;
  code: string;
};
type GetRolesEndpointResponse = {
  roles: string[];
};

export const GetRolesToEndpoint = async (
  data: Partial<GetRolesEndpointRequest>
): Promise<GetRolesEndpointResponse> => {
  return await (
    await AxiosInstance()
  )
    .post("AuthorizationEndpoints/GetRolesToEndpoint", JSON.stringify(data))
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};

type AssingRoleEndpointRequest = {
  roles: string[];
  menu: string;
  code: string;
};
type AssingRoleEndpointResponse = {};

export const AssingRoleEndpoint = async (
  data: Partial<AssingRoleEndpointRequest>
) => {
  return await (
    await AxiosInstance()
  )
    .post("/AuthorizationEndpoints", JSON.stringify(data))
    .then((res) => res.data)
    .catch((e) => {
      throw new Error(e);
    });
};
