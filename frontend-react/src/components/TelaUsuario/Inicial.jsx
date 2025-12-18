import './Inicial.css';
import { useNavigate } from 'react-router-dom';

const Inicial = () => {
    const navigate = useNavigate();

    return (
        <div className='pagina-inicial-container'>
            <h1>
                Gerenciando e organizando as suas tarefas
            </h1>
            <p>
                Faça login ou cadastre-se para começar a organizar suas atividades conosco!!
            </p>
            <div className='botoes'>
                <button className='btn' onClick={() => navigate('/login')}>
                    Login
                </button>
                <button className='btn' onClick={() => navigate('/cadastro')}>
                    Cadastro
                </button>
            </div>
        </div>
    );
}

export default Inicial;