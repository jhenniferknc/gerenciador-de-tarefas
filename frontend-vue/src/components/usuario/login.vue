<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const email = ref("");
const senha = ref("");

const router = useRouter();

const handleLogin = async () => {
    try {
        const response = await axios.post(
            "http://localhost:8082/gerenciador-de-tarefas/api/auth/login",
            {email: email.value, senha: senha.value}
        );

        const data = response.data;

        if (data.token) {
            localStorage.setItem("token", data.token);
        }

        if (data.usuario) {
            localStorage.setItem("usuario", JSON.stringify(data.usuario));
        }

        router.push("/novaTarefa");
    } catch (error) {
        console.log("Erro no login:", error);
        alert("Email ou senha inváidos");
    }
};
</script>
<template>
    <div class="pagina-login-container">
        <div class="conteudo">
            <h1>Login</h1>
            <form class="form-group" @submit.prevent="handleLogin">
                <input
                    type="text"
                    placeholder="E-mail"
                    v-model="email"
                    required
                />
                
                <input
                    type="password"
                    placeholder="senha"
                    v-model="senha"
                    required
                />
                <div class="form-options">
                    <button type="submit" class="btn-submit">Entrar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
@import '../../assets/css/login.css';
</style>