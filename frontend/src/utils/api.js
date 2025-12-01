const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function handleResponse(res) {
  if (!res.ok) {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const error = await res.json();
      throw new Error(error.error || `API Error: ${res.status}`);
    } else {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }
  }
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    throw new Error("Expected JSON response but got HTML");
  }
}

const api = {
  get: async (url) => {
    const res = await fetch(`${API_BASE}${url}`);
    return handleResponse(res);
  },

  post: async (url, body) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${url}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },
};

export default api;
