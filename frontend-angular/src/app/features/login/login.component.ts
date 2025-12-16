import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './login.html', 
  styleUrl: './login.css'      
})
export class Login {
  email: string = '';
  senha: string = '';

  constructor(private http: HttpClient, private router: Router) {

  }

  fazerLogin(){
    const dadosLogin = { email: this.email, senha: this.senha};

    this.http.post<any>('http://localhost:8082/gerenciador-de-tarefas/api/auth/login', dadosLogin).subscribe({
        next: (data) => {
            if(data.token) {
                localStorage.setItem('token', data.token);
            }
            if (data.usuario){
                localStorage.setItem('usuario', JSON.stringify(data.usuario));
            }

            this.router.navigate(['/tarefa']);
        },
        error: (erro) => {
            console.error('Erro no login:', erro);
            alert('Email ou senha inválidos');
        }
    });
  }
}