import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './cadastro.html', 
  styleUrl: './cadastro.css'      
})
export class Cadastro {
    nome: string = '';
    email: string = '';
    senha: string = '';

    constructor(private http: HttpClient, private router: Router) {
  }

    fazerCadastro(){
        const usuario = {nome: this.nome, email: this.email, senha: this.senha};
        this.http.post<any>('http://localhost:8082/gerenciador-de-tarefas/api/auth/cadastrar', usuario)
      .subscribe({
        next: (response) => {
          const usuarioLogado = response; 
          localStorage.setItem('usuario', JSON.stringify(usuarioLogado));
          
          alert('Usuário cadastrado com sucesso!');
          
          this.router.navigate(['/login']);
        },
        error: (erro) => {
          console.error('Erro ao cadastrar usuário:', erro);
          alert('Erro ao cadastrar usuário.');
        }
      });

    }
}