export function getSessionStorage(key: string): string | null {
  let data: string | null = null;
  try {
    data = typeof window !== "undefined" ? sessionStorage.getItem(key) : null;
    if (data) {
      data = JSON.parse(data);
    }
  } catch (error) {}
  return data;
}

export function setSessionStorage(key: string, data: any): void {
  try {
    typeof window !== "undefined" &&
      sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {}
}

export function removeSessionStorage(key: string): void {
  try {
    typeof window !== "undefined" && sessionStorage.removeItem(key);
  } catch (error) {}
}

export function clearSessionStorage(): void {
  sessionStorage.clear();
}
