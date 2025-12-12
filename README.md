# Gerenciador de Tarefas – Aplicação Web Completa

Bem vindo(a)! Este repositório contém um projeto desenvolvido para a disciplina de **Desenvolvimento de Aplicações Web III**, com o objetivo de criar um sistema completo de gerenciamento de tarefas (To-Do List) utilizando arquitetura frontend + backend.
O backend é único e expõe uma API REST, enquanto cada frontend consome a mesma API, demonstrando domínio de integração entre camadas.

## Objetivo do Projeto

Desenvolver uma aplicação web completa, composta por:

- Backend (API REST com persistência e documentação)
- Múltiplos Frontends (cada um usando um framework diferente)
- Integração entre os frontends e a API
- Interface responsiva e funcional em todos os frontends

## Funcionalidades implementadas

A aplicação permite:

- Criar uma tarefa
- Listar todas as tarefas
- Editar uma tarefa
- Excluir uma tarefa
- Consumir a API REST do backend
- Persistência em banco de dados
- Documentação da API

## Arquitetura do Repositório

```plaintext
├── backend/               # API REST completa
├── frontend-react/        # Interface em React
├── frontend-angular/      # Interface em Angular
├── frontend-blazor/       # Interface em Blazor
├── frontend-vue/          # Interface em Vue
├── docs/                  # Documentação e instruções
└── README.md
```

## Tecnologias Utilizadas

### Backend

- Java + Spring Boot
- Banco de dados: Postgres
- Documentação: Swagger

### Frontends Desenvolvidos

Todos os frontends consomem a mesma API REST:

| Framework | Linguagem  | Status |
| --------- | ---------- | ------ |
| React     | JavaScript |   ✔️   |
| Angular   | TypeScript |   ✔️   |
| Blazor    | C#         |   ✔️   |
| Vue.js    | JavaScript |   ✔️   |

### Requisitos Atendidos

- CRUD completo de tarefas
- API REST integrada
- Persistência em banco de dados
- Documentação da API
- Responsividade nos frontends
- Organização clara do repositório

# Como executar o projeto

### Backend

```bash
cd backend
mvn spring-boot:run
```

### Frontend

- React
```bash
cd frontend-react
npm install
npm start
```

- Vue
```bash
cd frontend-vue
npm install
npm run dev
```

- Blazor
```bash
cd frontend-blazor
dotnet run
```

- Angular
```bash
cd frontend-angular
npm install
npm start
```

---

🖤 **Obrigada por visitar este repositório!**
