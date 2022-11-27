export default class Api {
  public static async get<TData>(resource: string): Promise<TData> {
    const response = await fetch(resource);
    const body = await (response.json() as Promise<{ data: TData }>);
    return body.data;
  }

  public static async post<TBodyData>(
    resource: string,
    bodyData: TBodyData
  ): Promise<void> {
    const response = await fetch(resource, {
      method: "POST",
      body: JSON.stringify(bodyData),
    });
  }
}
