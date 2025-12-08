package br.edu.ifpb.es.gerenciador.service;

import br.edu.ifpb.es.gerenciador.model.Role;
import br.edu.ifpb.es.gerenciador.model.Usuario;
import br.edu.ifpb.es.gerenciador.repository.UsuarioRepository;
import br.edu.ifpb.es.gerenciador.rest.dto.UsuarioRequestDTO;
import br.edu.ifpb.es.gerenciador.rest.dto.UsuarioResponseDTO;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder encoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = encoder;
    }

    @Transactional
    public UsuarioResponseDTO criarUsuario(UsuarioRequestDTO dto) {
        if (usuarioRepository.findByEmail(dto.email()).isPresent()) {
            throw new RuntimeException("Email já cadastrado.");
        }

        Usuario usuario = Usuario.builder()
                .nome(dto.nome())
                .email(dto.email())
                .senha(passwordEncoder.encode(dto.senha()))
                .role(dto.role() != null ? dto.role() : Role.USUARIO)
                .build();
        usuarioRepository.save(usuario);
        return new UsuarioResponseDTO(
                usuario.getLookupId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getRole(),
                usuario.getCriadoEm()
        );
    }

}
