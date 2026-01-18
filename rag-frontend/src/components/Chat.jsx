import { useState } from "react";
import { sendChat } from "../api";
import Message from "./Message";
import Suggestions from "./Suggestions";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend(text) {
    if (!text.trim()) return;

    const userMsg = { role: "user", content: text };
    const newHistory = [...messages, userMsg];

    setMessages(newHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await sendChat({
        question: text,
        history: newHistory,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.answer },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Erro ao consultar o sistema. Tente novamente.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((m, i) => (
          <Message key={i} role={m.role} content={m.content} />
        ))}
        {loading && <div className="loading">Gerando resposta...</div>}
      </div>

      {messages.length === 0 && (
        <Suggestions onSelect={(s) => handleSend(s)} />
      )}

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pergunte sobre rotas, entregas ou planejamento..."
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
        />
        <button onClick={() => handleSend(input)}>Enviar</button>
      </div>
    </div>
  );
}
