export class GenericError extends Error {
  public constructor(
    public httpCode: number,
    public message: string
  ) {
    super(message);
  }
}
