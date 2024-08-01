export interface IResponse {
  success: boolean;
  message: string;
  data: any | any[] | null;
  count?: number;
}
