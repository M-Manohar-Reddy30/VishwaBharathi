export default class ApiResponse<T> {
  constructor(
    public success: boolean,
    public message: string,
    public data: T | null = null,
    public meta: object | null = null,
    public errors: unknown[] | null = null
  ) {}

  static success<T>(message: string, data: T | null = null, meta: object | null = null) {
    return new ApiResponse(true, message, data, meta, null);
  }

  static error(message: string, errors: unknown[] = []) {
    return new ApiResponse(false, message, null, null, errors);
  }
}