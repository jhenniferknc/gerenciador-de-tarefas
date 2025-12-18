import { createRouter, createWebHistory } from 'vue-router'

import Inicial from '../components/usuario/inicial.vue'
import Login from '../components/usuario/login.vue'
import NovaTarefa from '../components/tarefa/novaTarefa.vue'
import Cadastro from '../components/usuario/cadastro.vue'

const routes = [
  { path: '/', name: 'inicial', component: Inicial },
  { path: '/login', name: 'login', component: Login },
  { path: '/cadastro', name: 'cadastro', component: Cadastro},
  { path: '/novaTarefa', name: 'novaTarefa', component: NovaTarefa}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router