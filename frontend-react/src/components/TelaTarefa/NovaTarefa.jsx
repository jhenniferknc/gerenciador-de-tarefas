import './NovaTarefa.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const NovaTarefa = () => {
    const [tituloTarefa, setTituloTarefa] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tarefas, setTarefas] = useState([]);
    const [erro, setErro] = useState("");
    const [editando, setEditando] = useState(null);  
    const [editado, setEditado] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:8082/gerenciador-de-tarefas/api/tarefas", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        .then((res) => {
            if (!res.ok) throw new Error(`Erro ${res.status}`);
            return res.json();
        })
        .then((data) => {
            console.log("Dados recebidos do backend:", data);
            setTarefas(Array.isArray(data) ? data : data.tarefas || []);
        })
        .catch((err) => {
            console.error("Erro ao carregar tarefas: ", err);
            setErro("Não foi possível carregar as tarefas.");
        });
    }, []);

    const adicionarTarefa = () => {
        if (tituloTarefa.trim() === "" || descricao.trim() === "") return;

        const token = localStorage.getItem("token");

        if (!token) {
            setErro("Você precisa estar logado para adicionar uma tarefa");
            return;
        }

        fetch("http://localhost:8082/gerenciador-de-tarefas/api/tarefas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ titulo: tituloTarefa, descricao }),
        })
        .then((res) => {
            if (!res.ok) throw new Error(`Erro ${res.status}`);
            return res.json();
        })
        .then((novaTarefa) => {
            console.log("Tarefa criada:", novaTarefa);
            setTarefas((prev) => [...prev, novaTarefa]);
            setTituloTarefa("");
            setDescricao("");
            setErro("");
        })
        .catch((err) => {
            console.error("Erro ao adicionar tarefa:", err);
            setErro("Não foi possível adicionar a tarefa.");
        });
    };

    const marcarComoConcluida = (tarefaId) => {
        const token = localStorage.getItem("token");

        fetch(`http://localhost:8082/gerenciador-de-tarefas/api/tarefas/${tarefaId}/concluir`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        .then((res) => {
            if (!res.ok) throw new Error(`Erro ${res.status}`);
            return res.json();
        })
        .then((tarefaAtualizada) => {
            setTarefas((prev) =>
                prev.map((t) =>
                    t.lookupId === tarefaAtualizada.lookupId ? tarefaAtualizada : t
                )
            );
        })
        .catch((err) => {
            console.error("Erro ao concluir tarefa:", err);
            setErro("Não foi possível concluir a tarefa.");
        });
    };

    const handleEditarTarefa = (tarefa) => {
        setEditando(tarefa.lookupId);
        setEditado(tarefa);
    };

    const handleSalvarTarefa = async (id) => {
        const token = localStorage.getItem("token");

        const dadosAtualizados = {
            titulo: editado.titulo,
            descricao: editado.descricao
        };

        try {
            const response = await fetch(`http://localhost:8082/gerenciador-de-tarefas/api/tarefas/${id}/editar`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dadosAtualizados)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erro ${response.status}: ${errorData.message || "Falha na atualização"}`);
            }

            const tarefaAtualizada = await response.json();
            setTarefas(tarefas.map(item => item.lookupId === id ? tarefaAtualizada : item));  // Corrigido o map
            setEditando(null);
        } catch (err) {
            console.error("Erro ao editar tarefa:", err);
            setErro(`Não é possível editar a tarefa. Detalhes: ${err.message}`);
        }
    };

    const handleExcluirTarefa = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir a tarefa?")) {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`http://localhost:8082/gerenciador-de-tarefas/api/tarefas/${id}/deletar`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Bearer ${token}` 
                    },
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Erro ${response.status}: ${errorData.message || 'Falha ao tentar excluir a tarefa'}`);
                }
                setTarefas(tarefas.filter(t => t.lookupId !== id));  
            } catch (err) {
                console.error("Erro ao excluir tarefa:", err);
                setErro(`Não foi possível excluir a tarefa. ${err.message}`);
            }
        }
    };

    return (
        <div className='container-inicial'>
            <div className='container-titulo-novaTarefa'>
                <h1>Gerenciador de tarefas</h1>
                <p>Organize suas tarefas de forma simples e eficiente</p>
            </div>

            <div className='input-novaTarefa'>
                <input
                    type="text"
                    placeholder="Título da tarefa"
                    value={tituloTarefa}
                    onChange={(e) => setTituloTarefa(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Descrição da tarefa"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
                <button onClick={adicionarTarefa}>
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
                    Adicionar
                </button>
            </div>

            {erro && <p style={{ color: "red" }}>{erro}</p>}

            <div className="tarefas-container">
                {Array.isArray(tarefas) && tarefas.length > 0 ? (
                    tarefas.map((t) => (
                        <div key={t.lookupId} className={`tarefa-item ${t.concluidoEm ? "concluida" : ""}`}>
                            <div className="tarefa-checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={t.concluidoEm !== null}
                                        onChange={() => marcarComoConcluida(t.lookupId)}
                                    />
                                </label>
                            </div>
                            <div className="tarefa-conteudo">
                                {editando === t.lookupId ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editado.titulo}
                                            onChange={(e) => setEditado({ ...editado, titulo: e.target.value })}
                                            placeholder="Título"
                                            className="edit-input-titulo"
                                        />
                                        <input
                                            type="text"
                                            value={editado.descricao}
                                            onChange={(e) => setEditado({ ...editado, descricao: e.target.value })}
                                            placeholder="Descrição"
                                            className="edit-input-descricao"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <span className="tarefa-titulo">{t.titulo}</span>
                                        <span className="tarefa-descricao">{t.descricao}</span>
                                    </>
                                )}
                            </div>
                            <div className="tarefa-acoes">
                                {editando === t.lookupId ? (
                                    <button className="tarefa-acao-btn editar" onClick={() => handleSalvarTarefa(t.lookupId)}>Salvar</button>
                                ) : (
                                    <>
                                        <button className="tarefa-acao-btn editar" onClick={() => handleEditarTarefa(t)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className="tarefa-acao-btn excluir" onClick={() => handleExcluirTarefa(t.lookupId)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="sem-tarefas">
                        <FontAwesomeIcon icon={faFilePen} className='tarefa-icon' />
                        <h3>Nenhuma tarefa ainda</h3>
                        <p>Comece adicionando sua primeira tarefa acima</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NovaTarefa;