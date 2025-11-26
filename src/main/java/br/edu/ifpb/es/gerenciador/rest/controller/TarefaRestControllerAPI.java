package br.edu.ifpb.es.gerenciador.rest.controller;

import br.edu.ifpb.es.gerenciador.rest.dto.TarefaRequestDTO;
import br.edu.ifpb.es.gerenciador.rest.dto.TarefaResponseDTO;
import br.edu.ifpb.es.gerenciador.rest.dto.TarefaUpdateRequestDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

@Tag(name = "tarefas", description = "Gerenciamento de tarefas do usuário")
public interface TarefaRestControllerAPI {

    @Operation(summary = "Criar tarefa", description = "Cria uma nova tarefa associada ao usuário logado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",
                    description = "Tarefa criada com sucesso",
                    content = @Content(schema = @Schema(implementation = TarefaResponseDTO.class))),
            @ApiResponse(responseCode = "400",
                    description = "Dados inválidos",
                    content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    ResponseEntity<TarefaResponseDTO> criarTarefa(@RequestBody(description = "Dados da nova tarefa")
                                                                TarefaRequestDTO dto
    );

    @Operation(summary = "Listar tarefas", description = "Lista todas as tarefas do usuário logado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Lista retornada com sucesso",
                    content = @Content(schema = @Schema(implementation = TarefaResponseDTO.class)))
    })
    ResponseEntity<List<TarefaResponseDTO>> listarTarefas();

    @Operation(summary = "Concluir tarefa", description = "Marca uma tarefa como concluída.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Tarefa concluída com sucesso",
                    content = @Content(schema = @Schema(implementation = TarefaResponseDTO.class))),
            @ApiResponse(responseCode = "404",
                    description = "Tarefa não encontrada",
                    content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    ResponseEntity<TarefaResponseDTO> concluirTarefa(
            @Parameter(
                    name = "id",
                    description = "ID da tarefa",
                    required = true,
                    in = ParameterIn.PATH
            )
            UUID id
    );

    @Operation(summary = "Editar tarefa", description = "Atualiza os dados de uma tarefa existente.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Tarefa atualizada com sucesso",
                    content = @Content(schema = @Schema(implementation = TarefaResponseDTO.class))),
            @ApiResponse(responseCode = "404",
                    description = "Tarefa não encontrada",
                    content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    ResponseEntity<TarefaResponseDTO> editarTarefa(
            @Parameter(name = "id", description = "ID da tarefa", required = true, in = ParameterIn.PATH)
            UUID id,
            @RequestBody(
                    description = "Dados atualizados da tarefa"
            )
            TarefaUpdateRequestDTO dto
    );

    @Operation(summary = "Buscar tarefa", description = "Busca uma tarefa pelo ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Tarefa encontrada",
                    content = @Content(schema = @Schema(implementation = TarefaResponseDTO.class))),
            @ApiResponse(responseCode = "404",
                    description = "Tarefa não encontrada",
                    content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    ResponseEntity<TarefaResponseDTO> buscarTarefa(@Parameter(name = "id", description = "ID da tarefa", 
                                                    required = true, in = ParameterIn.PATH)
                                                    UUID id
    );

    @Operation(summary = "Deletar tarefa", description = "Remove uma tarefa do usuário.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Tarefa deletada com sucesso"),
            @ApiResponse(responseCode = "404",
                    description = "Tarefa não encontrada",
                    content = @Content(schema = @Schema(implementation = ProblemDetail.class)))
    })
    ResponseEntity<Void> deletarTarefa(@Parameter(name = "id", description = "ID da tarefa", 
                                        required = true, in = ParameterIn.PATH)
                                        UUID id
    );
}
