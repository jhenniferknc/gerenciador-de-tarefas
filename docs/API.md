# Documentação da API – Gerenciador de Tarefas

Esta documentação descreve os endpoints expostos pela API do projeto **Gerenciador de Tarefas**, desenvolvida em **Spring Boot**. A documentação oficial da API está disponível através do **Swagger UI**.

## Acesso à Documentação Automática (Swagger)

A documentação completa da API pode ser acessada após iniciar o backend conforme indicado na [seção de execução do backend](https://github.com/jhenniferknc/gerenciador-de-tarefas?tab=readme-ov-file#backend-1)

### **Swagger UI**

http://localhost:8082/gerenciador-de-tarefas/api/swagger-ui/index.html

### **OpenAPI JSON**

http://localhost:8082/gerenciador-de-tarefas/api/v3/api-docs

# Endpoints da API

## Tarefas

### **1. Listar todas as tarefas**

**GET /tarefas**

Retorna uma lista com todas as tarefas cadastradas.

### **2. Buscar tarefa por ID**

**GET /tarefas/{id}**

Retorna uma tarefa específica pelo ID.

### **3. Criar nova tarefa**

**POST /tarefas**

Adiciona uma nova tarefa.

### 4. Atualizar tarefa existente

**PUT /tarefas/{id}**

Atualiza a tarefa correspondente ao ID informado.

### 5. Excluir tarefa

**DELETE /tarefas/{id}**

Remove a tarefa correspondente ao ID informado.

## Autenticação

### Login

**POST /auth/login**

Corpo:

```json
[
  {
    "email": "user@email.com",
    "senha": "123456"
  }
]
```

Resposta:

```json
[
  {
    "token": "<jwt>"
  }
]
```

**Uso do token:**

Enviar no header:

```makefile
    Authorization: Bearer <token>
```

## Observações finais

- A documentação completa e atualizada está sempre no Swagger UI.
- Todos os endpoints podem ser testados diretamente pelo navegador via Swagger.