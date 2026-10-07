const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    let errorMsg = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData?.message) errorMsg = errorData.message;
    } catch {
      // fallback to status text
    }
    throw new Error(errorMsg);
  }

  return response.json() as Promise<T>;
}
