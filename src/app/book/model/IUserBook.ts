export interface IUserBook {
  id: string; // book id
  bookName: string;
  bookUserId: string; // row id
  price: number;
  catalogId: string;
  onSale?: boolean;
  subscriptionId?: string;
}
