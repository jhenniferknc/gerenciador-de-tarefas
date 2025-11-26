package br.edu.ifpb.es.gerenciador.rest.dto;

public record TarefaUpdateRequestDTO (

        String titulo,
        String descricao,
        Boolean concluido

) {}