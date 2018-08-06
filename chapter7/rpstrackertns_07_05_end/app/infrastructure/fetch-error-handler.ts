export function handleFetchErrors(response: Response): Promise<any> {
  if (!response.ok) {
    console.log(JSON.stringify(response));
    return Promise.reject<any>(response.statusText);
  }
  return response.json();
}
