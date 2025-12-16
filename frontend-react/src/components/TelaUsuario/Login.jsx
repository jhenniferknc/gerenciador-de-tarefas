import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8082/gerenciador-de-tarefas/api/auth/login', { email, senha })
            .then((response) => {
                const data = response.data;

                if (data.token) {
                    localStorage.setItem('token', data.token);  
                }

                if(data.usuario) {
                    localStorage.setItem('usuario', JSON.stringify(data.usuario));

                }
                navigate('/novaTarefa');
            })
            .catch((error) => {
                console.error('Erro no login:', error);
                alert('Email ou senha inválidos.');
            }
        );
    };

    return (
        <div className="pagina-login-container">
            <div className="conteudo">
                <h1>Login</h1>

                <form className="form-group" onSubmit={handleLogin}>
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
                    <div className="form-options">
                        <a href="#">Esqueceu a senha?</a>
                        <button type="submit" className="btn-submit">Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
