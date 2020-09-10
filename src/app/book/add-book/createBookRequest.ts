export interface CreateBookRequest {
  bookName: string;
  price: number;
  catalogId: string;
  onSale: boolean;
}
