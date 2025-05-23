export const fetcher = async (url: string): Promise<any> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`error!: ${res.status}`);
  }
  return res.json();
};
