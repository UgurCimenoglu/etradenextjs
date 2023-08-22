export interface Order_Detail {
  id: string;
  orderCode: string;
  basketItems: Order_Item[];
  address: string;
  description: string;
  createdDate: Date;
}

interface Order_Item {
  name: string;
  price: number;
  quantity: number;
}
