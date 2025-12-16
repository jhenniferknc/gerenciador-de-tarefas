import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilePen, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface TarefaData {
  lookupId: string;
  titulo: string;
  descricao: string;
  concluidoEm: string | null;
}

@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './tarefa.html',
  styleUrl: './tarefa.css'
})

export class Tarefa implements OnInit {
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faFilePen = faFilePen;

  tituloTarefa: string = '';
  descricao: string = '';
  tarefas: TarefaData[] = [];
  erro: string = '';
  editandoId: string | null = null;
  editado: Partial<TarefaData> = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.carregarTarefas();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
        return new HttpHeaders({ 'Content-Type': 'application/json' });
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  carregarTarefas() {
    const token = localStorage.getItem("token");
    if (!token) {
        this.erro = "Sessão expirada. Faça login novamente.";
        this.router.navigate(['/login']);
        return;
    }

    this.http.get<any>("http://localhost:8082/gerenciador-de-tarefas/api/tarefas", { 
        headers: this.getHeaders() 
    })
    .subscribe({
        next: (data) => {
          console.log("Dados recebidos do backend:", data);
          if (Array.isArray(data)) {
              this.tarefas = data;
          } else if (data && data.tarefas && Array.isArray(data.tarefas)) {
              this.tarefas = data.tarefas;
          } else {
              this.tarefas = []; 
          }
        },
        error: (err) => {
          console.error("Erro ao carregar tarefas: ", err);
          if (err.status === 403 || err.status === 401) {
             this.erro = "Acesso negado. Faça login novamente.";
          } else {
             this.erro = "Não foi possível carregar as tarefas.";
          }
        }
    });
  }

  adicionarTarefa() {
    if (!this.tituloTarefa.trim() || !this.descricao.trim()) {
        return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
        this.erro = "Você precisa estar logado para adicionar uma tarefa";
        return;
    }

    const novaTarefa = {
      titulo: this.tituloTarefa,
      descricao: this.descricao
    }

    this.http.post<TarefaData>("http://localhost:8082/gerenciador-de-tarefas/api/tarefas", novaTarefa, {
      headers: this.getHeaders()
    })
      .subscribe({
        next: (tarefaCriada) => {
          console.log("Tarefa criada: ", tarefaCriada);
          this.tarefas.push(tarefaCriada);

          this.tituloTarefa = '';
          this.descricao = '';
          this.erro = '';
        },
        error: (err) => {
          console.error("Erro ao adicionar:", err);
          this.erro = "Erro ao adicionar tarefa.";
        }
      });
  }

  marcarComoConcluida(tarefa: TarefaData) {
    this.http.patch<TarefaData>(`http://localhost:8082/gerenciador-de-tarefas/api/tarefas/${tarefa.lookupId}/concluir`, {}, { headers: this.getHeaders() })
      .subscribe({
        next: (tarefaAtualizada) => {
          const index = this.tarefas.findIndex(t => t.lookupId === tarefaAtualizada.lookupId);
          if (index !== -1) this.tarefas[index] = tarefaAtualizada;
        },
        error: (err) => {
            console.error("Erro ao concluir:", err);
            this.erro = "Não foi possível concluir a tarefa.";
        }
      });
  }

  iniciarEdicao(tarefa: TarefaData) {
    this.editandoId = tarefa.lookupId;
    this.editado = { ...tarefa };
  }

  cancelarEdicao() {
    this.editandoId = null;
    this.editado = {};
  }

  salvarEdicao(id: string) {
    const dadosAtualizados = {
        titulo: this.editado.titulo,
        descricao: this.editado.descricao
    };
    this.http.put<TarefaData>(`http://localhost:8082/gerenciador-de-tarefas/api/tarefas/${id}/editar`, dadosAtualizados, { headers: this.getHeaders() })
    .subscribe({
        next: (tarefaAtualizada) => {
        this.tarefas = this.tarefas.map(t => t.lookupId === id ? tarefaAtualizada : t);
        this.editandoId = null;
        this.editado = {};
        },
        error: (err) => {
            console.error("Erro ao salvar:", err);
            this.erro = `Erro ao editar: ${err.message || 'Falha na atualização'}`;
        }
    });
  }

  excluirTarefa(id: string) {
    if (confirm("Tem certeza que deseja excluir a tarefa?")) {
        this.http.delete(`http://localhost:8082/gerenciador-de-tarefas/api/tarefas/${id}/deletar`, { headers: this.getHeaders() })
            .subscribe({
            next: () => {
                this.tarefas = this.tarefas.filter(t => t.lookupId !== id);
            },
            error: (err) => {
                console.error("Erro ao excluir:", err);
                this.erro = "Erro ao excluir tarefa.";
            }
        });
    }
  }
}