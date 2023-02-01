export interface IPaginationResponse<T> {
  count: number;
  count_page: number;
  data: T;
}
