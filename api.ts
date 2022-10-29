export default class Api {
  public static async get<TData>(resource: string): Promise<TData> {
    const response = await fetch(resource);
    const body = await (response.json() as Promise<{ data: TData }>);
    return body.data;
  }
}
