export async function fetch<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await window.fetch(url, options);
  const content = response.headers.get('content-type')?.includes('application/json')
    ? response.json()
    : response.text();

  if (response.status >= 400) {
    throw content;
  }

  return content;
}
