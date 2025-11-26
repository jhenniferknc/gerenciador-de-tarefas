package br.edu.ifpb.es.gerenciador.rest.controller;

import br.edu.ifpb.es.gerenciador.rest.dto.LoginRequestDTO;
import br.edu.ifpb.es.gerenciador.rest.dto.LoginResponseDTO;
import br.edu.ifpb.es.gerenciador.rest.dto.UsuarioRequestDTO;
import br.edu.ifpb.es.gerenciador.rest.dto.UsuarioResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;

@Tag(name = "autenticacao", description = "Autenticação da API")
public interface AuthRestControllerAPI {

    @Operation(summary = "Cadastrar um usuário.", description = "Cadastrar um novo usuário.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                        description = "Operação realizada com sucesso!",
                        content = @Content(mediaType = "application/json",
                        schema = @Schema(implementation = UsuarioResponseDTO.class))),
            @ApiResponse(responseCode = "500",
                        description = "Erro inesperado.",
                        content = @Content(mediaType = "application/json",
                        schema = @Schema(implementation = ProblemDetail.class))),
    })
    ResponseEntity<UsuarioResponseDTO> register(@RequestBody(description = "Dados do usuário a ser adicionado.")
                                                UsuarioRequestDTO usuarioRequestDTO);

    @Operation(summary = "Logar um usuário.", description = "Realizar login de um usuário.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                        description = "Operação realizada com sucesso!",
                        content = @Content(mediaType = "application/json",
                        schema = @Schema(implementation = LoginResponseDTO.class))),
            @ApiResponse(responseCode = "500",
                        description = "Erro inesperado.",
                        content = @Content(mediaType = "application/json",
                        schema = @Schema(implementation = ProblemDetail.class))),
    })
    ResponseEntity<LoginResponseDTO> login(LoginRequestDTO loginRequestDTO);

    /*@Operation(summary = "Logout do usuário.", description = "Realizar logout de um usuário.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                        description = "Operação realizada com sucesso!",
                        content = @Content(mediaType = "application/json",
                        schema = @Schema(implementation = ProblemDetail.class))),

    })
    ResponseEntity<>*/
}
