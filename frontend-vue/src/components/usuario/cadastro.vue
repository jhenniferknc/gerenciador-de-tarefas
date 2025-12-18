<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const nome = ref("");
const email = ref("");
const senha = ref("");

const router = useRouter();

const handleSubmit = async () => {
    const usuario = {
        nome: nome.value,
        email: email.value,
        senha: senha.value
    };

    try{
        const response = await axios.post(
      "http://localhost:8082/gerenciador-de-tarefas/api/auth/cadastrar",
      usuario
    );

    const usuarioLogado = response.data;
    localStorage.setItem("usuario", JSON.stringify(usuarioLogado));

    alert("Usuário cadastrado com sucesso!");
    router.push("/login");

    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        alert("Erro ao cadastrar usuário.");
    }
};
</script>
<template>
    <div class="pagina-cadastro-container">
        <div class="conteudo">
            <h1>Cadastro</h1>

            <form class="form-group-cadastro" @submit.prevent="handleSubmit">
                <input
                    type="text"
                    placeholder="Nome"
                    v-model="nome"                
                    required
                />

                <input
                    type="text"
                    placeholder="Email"
                    v-model="email"
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    v-model="senha"
                    required
                />

                <div class="form-options-cadastro">
                    <button type="submit" class="btn-submit-cadastro">Cadastrar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
@import '../../assets/css/cadastro.css';
</style>