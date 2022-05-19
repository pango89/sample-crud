export class PaginatedResponse<T> {
  public data: T[];
  public count: number;
  public offset: number;
  public limit: number;

  public constructor(data: T[], count: number, offset: number, limit: number) {
    this.data = data;
    this.count = count;
    this.offset = offset;
    this.limit = limit;
  }
}
