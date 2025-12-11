import { Routes } from '@angular/router';
import { Home } from './features/home/home.component';
import { Login } from './features/login/login.component';
import { Cadastro } from './features/cadastro/cadastro.component';
import { Tarefa } from './features/tarefa/tarefa.component';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'cadastro', component: Cadastro },
    { path: 'tarefa', component: Tarefa }
];
