export default function Suggestions({ onSelect }) {
  const suggestions = [
    "Gere um resumo do planejamento diário",
    "Quantas entregas críticas existem?",
    "Detalhes da entrega 23",
    "Qual veículo tem maior custo?",
    "Onde podemos otimizar as rotas?",
  ];

  return (
    <div className="suggestions">
      {suggestions.map((s, i) => (
        <button key={i} onClick={() => onSelect(s)}>
          {s}
        </button>
      ))}
    </div>
  );
}
