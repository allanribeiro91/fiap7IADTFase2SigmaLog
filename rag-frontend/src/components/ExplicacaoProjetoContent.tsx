export function ExplicacaoProjetoContent() {
  return (
    <>
      <div style={{ textAlign: "justify", fontSize: "1rem" }}>
        <p>
          O <strong>Sigma Log</strong> foi concebido com uma arquitetura modular,
          separando claramente as responsabilidades entre otimização, backend de
          dados e interface de visualização. Essa organização permite simular um
          fluxo real de uma operação logística inteligente, desde o cálculo das
          rotas até a interpretação dos resultados e o suporte à tomada de decisão.
        </p>

        <p>
          A arquitetura geral do projeto está dividida em{" "}
          <strong>três grandes componentes</strong>, que se comunicam de forma
          desacoplada:
        </p>

        <h4>1. Optimization</h4>
        <p>
          O módulo <strong>optimization</strong> é responsável pelo núcleo
          computacional do projeto. Nele está implementado o algoritmo genético
          utilizado para resolver o problema de otimização de rotas (Vehicle Routing
          Problem – VRP), considerando múltiplos veículos, entregas, restrições de
          capacidade, distância, tempo e níveis de prioridade.
        </p>

        <p>
          Como resultado, esse módulo gera a sequência ótima de entregas por veículo,
          além de métricas consolidadas como distância total percorrida, tempo,
          custo estimado e carga transportada. Esses resultados são exportados em
          arquivos estruturados (CSV e HTML), que passam a servir de base para os
          demais componentes do sistema.
        </p>

        <h4>2. RAG Backend</h4>
        <p>
          O <strong>rag-backend</strong> funciona como a camada de orquestração e
          inteligência do sistema. Implementado em <strong>FastAPI</strong>, ele é
          responsável por carregar os dados gerados pela etapa de otimização,
          organizá-los em estruturas analíticas (KPIs, resumos por veículo,
          itinerários e entregas) e disponibilizá-los por meio de APIs REST.
        </p>

        <p>
          Além disso, esse backend incorpora um mecanismo de{" "}
          <strong>RAG (Retrieval-Augmented Generation)</strong>, integrado ao modelo{" "}
          <strong>gpt-o4-mini</strong>. Esse componente permite que perguntas em
          linguagem natural sejam respondidas com base exclusivamente nos dados da
          operação, fornecendo explicações executivas, análises operacionais e
          detalhamento de itinerários e entregas.
        </p>

        <p>
          O backend também é responsável por servir conteúdos estáticos, como o mapa
          interativo das rotas, permitindo que a visualização geográfica esteja
          alinhada com os dados calculados pelo algoritmo de otimização.
        </p>

        <h4>3. RAG Frontend</h4>
        <p>
          O <strong>rag-frontend</strong> representa a camada de apresentação e
          interação do sistema. Desenvolvido em React, ele consome as APIs do backend
          para exibir indicadores globais, resumos por veículo, itinerários
          detalhados, entregas ordenadas e o mapa de rotas.
        </p>

        <p>
          Além da visualização dos dados, o frontend integra um chat interativo que
          permite aos usuários consultar o sistema em linguagem natural. Dessa
          forma, o usuário pode compreender rapidamente o planejamento logístico,
          identificar pontos críticos e obter suporte à decisão sem a necessidade
          de interpretar diretamente tabelas ou arquivos técnicos.
        </p>

        <p>
          Em conjunto, esses três componentes demonstram como uma solução de
          logística inteligente pode combinar otimização algorítmica, APIs de dados,
          modelos de linguagem e interfaces visuais para apoiar decisões em
          operações logísticas complexas, especialmente no contexto sensível da
          área da saúde.
        </p>
      </div>
    </>
  );
}
