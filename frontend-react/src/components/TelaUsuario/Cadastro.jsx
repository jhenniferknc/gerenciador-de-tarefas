import './Cadastro.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Cadastro = () => {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

     const handleSubmit = (event) => {
        event.preventDefault();

        const usuario = {
            nome,
            email,
            senha
        };

        axios.post('http://localhost:8082/gerenciador-de-tarefas/api/auth/cadastrar', usuario)
            .then((response) => {
                const usuarioLogado = response.data;
                localStorage.setItem('usuario', JSON.stringify(usuarioLogado));
                alert('Usuário cadastrado com sucesso!');
                navigate('/login');
            })
            .catch((error) => {
                console.error('Erro ao cadastrar usuário:', error);
                alert('Erro ao cadastrar usuário.');
            }
        );
    };

    return (
        <div className='pagina-cadastro-container'>
            <div className='conteudo'>
                <h1>Cadastro</h1>
                <form className='form-group-cadastro' onSubmit={handleSubmit}>
                    <input 
                       type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required 
                    />
                    <input
                        type="text"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <div className="form-options-cadastro">
                        <button type="submit" className="btn-submit-cadastro">Cadastrar</button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Cadastro;
