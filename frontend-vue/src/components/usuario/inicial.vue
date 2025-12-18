<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="pagina-inicial-container">
        <h1>Gerenciando e organizando as suas tarefas</h1>
        <p>Faça login ou cadastre-se para começar a organizar suas atividades conosco!</p>
        <div class="botoes">
            <RouterLink to="/login">
                <button class="btn">Login</button>
            </RouterLink>
            <RouterLink to="/cadastro">
                <button class="btn">Cadastro</button>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
@import '../../assets/css/inicial.css';
</style>
