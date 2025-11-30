const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function handleResponse(res) {
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "API Error");
  }
  return res.json();
}

const api = {
  get: async (url) => {
    const res = await fetch(`${API_BASE}${url}`);
    return handleResponse(res);
  },

  post: async (url, body) => {
    const res = await fetch(`${API_BASE}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },
};

export default api;
