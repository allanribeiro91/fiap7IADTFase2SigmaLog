const API_URL = "http://localhost:8000";

export async function sendChatMessage(params: {
  question: string;
  history?: { role: string; content: string }[];
}) {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: params.question,
      mode: "auto",
      history: params.history,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Erro ao chamar o chat");
  }

  return response.json();
}
