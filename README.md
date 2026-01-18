# Sigma Log – Otimização de Rotas Logísticas com IA
O **Sigma Log** é um projeto acadêmico desenvolvido no âmbito do **Tech Challenge – Fase 2** da Pós Tech **FIAP – IA para Devs (7IADT)**.  
O objetivo do projeto é demonstrar como técnicas de **inteligência artificial** podem ser aplicadas à **logística médica**, integrando otimização algorítmica, APIs de dados, modelos de linguagem e visualização interativa.

O sistema simula um cenário real de distribuição de medicamentos e insumos hospitalares, considerando múltiplos veículos, destinos, restrições operacionais e níveis de prioridade.

________________________________________________________________________________

## Objetivo do Projeto
O Sigma Log demonstra como a inteligência artificial pode ser aplicada de forma integrada para:
- Otimizar decisões logísticas complexas;
- Reduzir custos e riscos operacionais;
- Aumentar a transparência e a explicabilidade dos resultados;
- Apoiar a tomada de decisão em operações críticas da área da saúde.

________________________________________________________________________________

## Visão Geral da Arquitetura
O projeto foi estruturado de forma **modular**, separando responsabilidades e facilitando a compreensão do fluxo completo da solução:

FASE2/
├── optimization/
├── rag-backend/
└── rag-frontend/

________________________________________________________________________________

## 1. optimization – Otimização de Rotas
O módulo optimization concentra o núcleo computacional do projeto.
Principais responsabilidades
- Implementação de um algoritmo genético para resolução do problema de roteamento de veículos
(Vehicle Routing Problem – **VRP**);
- Consideração de restrições como:
o	capacidade dos veículos;
o	distância;
o	tempo;
o	custo;
o	prioridade das entregas;
- Geração da sequência otimizada de entregas por veículo;
- Exportação dos resultados em formatos estruturados (**CSV** e **HTML**), que alimentam os demais módulos do sistema.
Este módulo representa a etapa de planejamento logístico propriamente dita.

________________________________________________________________________________

## 2. rag-backend – APIs e **RAG**
O rag-backend funciona como a camada de orquestração, dados e inteligência do sistema.
Tecnologias principais
- FastAPI
- Python
- **RAG** (Retrieval-Augmented Generation)
- Modelo de linguagem: gpt-o4-mini
Principais responsabilidades
- Carregar e organizar os dados gerados pela etapa de otimização;
- Expor APIs **REST** para:
o	KPIs globais da operação;
o	resumos por veículo;
o	itinerários detalhados;
o	entregas ordenadas;
- Servir conteúdo estático, como o mapa interativo das rotas;
- Implementar um mecanismo de **RAG**, permitindo que perguntas em linguagem natural sejam respondidas com base exclusiva nos dados da operação.
O backend atua como a camada de inteligência e explicação, traduzindo dados técnicos em informações compreensíveis para gestores e equipes operacionais.

________________________________________________________________________________

## 3. rag-frontend – Interface e Visualização
O rag-frontend é a camada de apresentação e interação com o usuário.
Tecnologias principais
- React
- TypeScript
- Vite
- Styled Components
Principais funcionalidades
- Exibição de KPIs globais da operação;
- Visualização de resumos por veículo;
- Apresentação detalhada dos itinerários e entregas;
- Exibição do mapa interativo de rotas;
- Chat integrado, permitindo consultas em linguagem natural ao sistema (via **RAG**).
O frontend foi projetado para facilitar tanto a análise executiva quanto o acompanhamento operacional do planejamento logístico.

________________________________________

## Fluxo Geral do Sistema
- O algoritmo genético calcula as rotas otimizadas no módulo optimization;
- Os resultados são exportados em arquivos estruturados;
- O rag-backend carrega esses dados e os disponibiliza via APIs;
- O rag-frontend consome essas APIs para exibir informações e permitir interação via chat;
- O usuário pode analisar KPIs, itinerários, mapas e fazer perguntas em linguagem natural sobre a operação.

________________________________________

## Como Executar o Projeto
A execução do Sigma Log é dividida em três etapas, correspondentes aos módulos do projeto. Cada módulo deve ser executado em um terminal separado.

### 1. Executando o módulo `optimization`
O módulo **optimization** é responsável por calcular as rotas otimizadas utilizando o algoritmo genético.

#### Passos
cd optimization
virtualenv .venv
    Windows --> .venv\Scripts\activate
    Linux/macOS --> source .venv/bin/activate
pip install -r requirements.txt
python main.py

Ao final da execução, os arquivos de resultados (CSV e HTML) serão gerados e utilizados pelos demais módulos do sistema.


### 2. Executando o módulo rag-backend
O rag-backend disponibiliza as APIs e o mecanismo de RAG que consome os dados gerados pela otimização.

#### Passos
cd rag-backend
virtualenv .venv
    Windows --> .venv\Scripts\activate
    Linux/macOS --> source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
    O backend estará disponível em: http://localhost:8000

### 3. Executando o módulo rag-frontend
O rag-frontend é responsável pela interface de visualização e interação com o sistema.

#### Passos
cd rag-frontend
npm install
npm run dev
    A aplicação estará disponível em: http://localhost:5173
________________________________________

## Observações
- O módulo optimization deve ser executado antes do rag-backend, pois ele gera os dados utilizados pelas APIs;
- O rag-backend deve estar em execução para que o rag-frontend funcione corretamente;
- Recomenda-se manter cada módulo em um terminal separado durante a execução;
- O projeto foi testado em ambiente local utilizando Python 3.11+ e Node.js 18+.
- Este projeto possui fins educacionais e demonstrativos, simulando um cenário real de logística médica, sem utilização de dados sensíveis ou operacionais reais.