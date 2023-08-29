export interface Application_Service {
  name: string;
  actions?: ActionsEntity[] | null;
}
export interface ActionsEntity {
  actionType: string;
  httpType: string;
  definition: string;
  code: string;
}
