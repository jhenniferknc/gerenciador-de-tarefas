# Gerenciador de Tarefas - Backend

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

## Funcionalidades atuais

- Estrutura base de backend em Java
- Dependências declaradas no pom.xml
- Projeto organizado com padrão comum de pastas
- Rotas REST para CRUD de tarefas
- Persistência de dados
- Autenticação/autorização de usuários
- Documentação da API
