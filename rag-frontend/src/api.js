const API_URL = "http://localhost:8000";

export async function sendChat({ question, history = [], mode = "auto" }) {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, history, mode }),
  });

  if (!res.ok) {
    throw new Error("Erro ao consultar o backend");
  }

  return res.json();
}
