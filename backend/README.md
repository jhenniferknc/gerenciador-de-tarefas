# Gerenciador de Tarefas

Este diretório contém um sistema backend para gerenciamento de tarefas.  

## Visão geral

Este projeto implementa a lógica de backend de um gerenciador de tarefas. Ele permite a criação, leitura, atualização e exclusão (CRUD) de tarefas, servindo como base para um potencial frontend ou integração com outras aplicações.  

## Tecnologias utilizadas

- Java  
- Maven (pom.xml está presente)  
- Estrutura de pastas conforme convenção padrão (`src/main/java`, etc.)  

## Estrutura do projeto

```plaintext
gerenciador-de-tarefas/
└── src/
  └── main/
    └── java/
      └── br.edu.ifpb.es.gerenciador
          └── exception
          └── model
          └── repository
          └── rest
            └── controller
            └── dto
          └── security
          └── service
          GerenciadorApplication.java
```

## Como executar / compilar

1. Clone o repositório:
   ```bash
   git clone https://github.com/jhenniferknc/gerenciador-de-tarefas.git
   ```

2. Acesse a pasta do projeto:
  ```bash
  cd gerenciador-de-tarefas
  ```

3. Compile com Maven:
   ```bash
   mvn clean install
   ```

Execute a aplicação.

## Funcionalidades atuais

- Estrutura base de backend em Java
- Dependências declaradas no pom.xml
- Projeto organizado com padrão comum de pastas
- Rotas REST para CRUD de tarefas
- Persistência de dados
- Autenticação/autorização de usuários
- Documentação da API

---

🖤 **Obrigada por visitar este repositório!**
