export interface Order {
  Id: string;
  OrderCode: string;
  UserName: string;
  TotalPrice: number;
  CreatedDate: Date;
  Completed: boolean;
}
