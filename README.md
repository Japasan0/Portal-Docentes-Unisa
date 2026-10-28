Portal de Docentes UNISA (Unisa Lattes Hub)
Este projeto é um sistema web desenvolvido para centralizar, organizar e exibir o perfil profissional e acadêmico do corpo docente da Universidade Santo Amaro (Unisa). Ele oferece uma interface moderna e acessível onde alunos e futuros ingressantes podem consultar o currículo, a experiência de mercado, as titulações e as disciplinas ministradas por cada professor, aumentando a transparência institucional e a visibilidade dos docentes.

🔗 Acesse o projeto online: unisa-lattes-hub.lovable.app

🚀 Tecnologias
React + TypeScript – Interface dinâmica, performática e tipada

Vite – Build tool rápido para desenvolvimento front-end

Tailwind CSS – Estilização moderna, responsiva e acessível

Shadcn/UI & Lucide Icons – Componentes visuais elegantes e consistentes

Lovable / Supabase – Infraestrutura de hospedagem e integração de dados

⚡ O que o sistema faz
Busca e Filtragem de Professores: Pesquisa rápida por nome, disciplina, área de atuação ou titulação.

Perfil Detalhado do Docente: Exibição da trajetória acadêmica, experiência de mercado e conquistas científicas.

Vitrine para Futuros Alunos: Apresenta a qualidade do corpo docente como diferencial decisivo de escolha do curso.

Conexão Aluno-Professor: Facilita a identificação de orientadores para TCC, iniciação científica e monitorias.

Links e Redes Acadêmicas: Acesso direto ao Currículo Lattes, LinkedIn, ORCID e e-mail institucional.

🧠 Estrutura do Projeto
Plaintext
📁 unisa-lattes-hub
├── 📁 public/            # Arquivos estáticos (ícones, favicon, imagens)
├── 📁 src/
│   ├── 📁 components/    # Componentes reutilizáveis de UI (cards, buscas, filtros)
│   ├── 📁 data/          # Mocks e dados dos docentes/disciplinas
│   ├── 📁 hooks/         # Hooks customizados para gerenciamento de estado
│   ├── 📁 pages/         # Páginas do sistema (Home, Perfil, Busca)
│   ├── App.tsx           # Roteamento e estrutura principal
│   └── main.tsx          # Ponto de entrada da aplicação
├── package.json          # Dependências e scripts do projeto
└── vite.config.ts        # Configuração do Vite
🏁 Como rodar o projeto
Clone o repositório:

Bash
git clone https://github.com/seu-usuario/unisa-lattes-hub.git
cd unisa-lattes-hub
Instale as dependências:

Bash
npm install
Inicie o servidor de desenvolvimento:

Bash
npm run dev

Acesse no navegador:
👉 http://localhost:8080
