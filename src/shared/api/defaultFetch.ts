interface IDefaultFetchProps {
  url: string;
}

export async function defaultFetch<T>({ url }: IDefaultFetchProps): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Что-то пошло не так');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Ошибка в defaltFetch: ${error}`);
    throw error;
  }
}
