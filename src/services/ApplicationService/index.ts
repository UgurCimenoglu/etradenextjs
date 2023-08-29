import { Application_Service } from "@/contracts/application-service/application_service";
import AxiosInstance from "@/lib/axios";

type GetApplicationServiceRequest = {};

type GetApplicationServiceResponse = Application_Service[];

export const GetApplicationService =
  async (): Promise<GetApplicationServiceResponse> => {
    return await (
      await AxiosInstance()
    )
      .get("ApplicationServices")
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });
  };
