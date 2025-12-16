<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit, faTrash, faFilePen, faPlus } from '@fortawesome/free-solid-svg-icons'

const tituloTarefa = ref("")
const descricao = ref("")
const erro = ref("")
const editando = ref(null)
const editado = reactive({})
const tarefas = ref([])

const tarefasOrdenadas = computed(() => {
  return [...tarefas.value].sort((a, b) => {

    const aConcluida = !!a.concluidoEm;
    const bConcluida = !!b.concluidoEm;
    
    if (aConcluida && !bConcluida) return 1;
    if (!aConcluida && bConcluida) return -1;
    return 0;
  });
});

onMounted(() => {
  const token = localStorage.getItem("token")
  fetch("http://localhost:8082/gerenciador-de-tarefas/api/tarefas", {
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(data => { tarefas.value = Array.isArray(data) ? data : data.tarefas || [] })
  .catch(err => { console.error(err); erro.value = "Não foi possível carregar as tarefas." })
})

const adicionarTarefa = () => {
  if(!tituloTarefa.value.trim() || !descricao.value.trim()) return
  const token = localStorage.getItem("token")
  
  fetch("http://localhost:8082/gerenciador-de-tarefas/api/tarefas", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify({ titulo: tituloTarefa.value, descricao: descricao.value })
  })
  .then(res => res.json())
  .then(nova => {
    tarefas.value.push(nova)
    tituloTarefa.value = ""
    descricao.value = ""
    erro.value = ""
  })
  .catch(() => { erro.value = "Não foi possível adicionar a tarefa." })
}

const marcarComoConcluida = (id) => {
  const token = localStorage.getItem("token")
  fetch(`http://localhost:8082/gerenciador-de-tarefas/api/tarefas/${id}/concluir`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(atualizada => {
    tarefas.value = tarefas.value.map(t => t.lookupId === atualizada.lookupId ? atualizada : t)
  })
}

const editarTarefa = (tarefa) => {
  editando.value = tarefa.lookupId
  editado.titulo = tarefa.titulo
  editado.descricao = tarefa.descricao
}

const salvarEdicao = (id) => {
  const token = localStorage.getItem("token")
  fetch(`http://localhost:8082/gerenciador-de-tarefas/api/tarefas/${id}/editar`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify(editado)
  })
  .then(res => res.json())
  .then(atualizada => {
    tarefas.value = tarefas.value.map(t => t.lookupId === id ? atualizada : t)
    editando.value = null
  })
}

const excluirTarefa = (id) => {
  if (!confirm("Tem certeza que deseja excluir?")) return
  const token = localStorage.getItem("token")
  fetch(`http://localhost:8082/gerenciador-de-tarefas/api/tarefas/${id}/deletar`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  })
  .then(() => { tarefas.value = tarefas.value.filter(t => t.lookupId !== id) })
}
</script>

<template>  
  <div class="container-inicial">
    <div class="container-titulo-novaTarefa">
      <h1>Gerenciador de Tarefas</h1>
      <p>Adicione e gerencie suas tarefas</p>
    </div>

    <div class="input-novaTarefa">
      <input v-model="tituloTarefa" placeholder="Título" />
      <input v-model="descricao" placeholder="Descrição" />
      <button @click="adicionarTarefa">         
        <font-awesome-icon :icon="faPlus" style="margin-right: 8px;" />
        Adicionar
      </button>
    </div>

    <div class="tarefas-container">
      <p v-if="erro" style="color: red">{{ erro }}</p>

      <template v-if="tarefasOrdenadas && tarefasOrdenadas.length > 0">
        <div 
          v-for="t in tarefasOrdenadas" 
          :key="t.lookupId" 
          class="tarefa-item"
          :class="{ 'concluida': t.concluidoEm}"
        >
        <div class="tarefa-checkbox">
          <label>
            <input
              type="checkbox"
              :checked="t.concluidoEm"
              @change="marcarComoConcluida(t.lookupId)"
            />
          </label>
        </div>
          <div class="tarefa-conteudo">
            <template v-if="editando === t.lookupId">
              <input v-model="editado.titulo" class="edit-input-titulo" placeholder="Título" />
              <input v-model="editado.descricao" class="edit-input-descricao" placeholder="Descrição" />
            </template>
            
            <template v-else>
              <span class="tarefa-titulo">{{ t.titulo }}</span>
              <span class="tarefa-descricao">{{ t.descricao }}</span>
            </template>
          </div>
          <div class="tarefa-acoes">
            <template v-if="editando === t.lookupId">
              <button class="tarefa-acao-btn editar" @click="salvarEdicao(t.lookupId)">
                Salvar
              </button>
            </template>
            
            <template v-else>
              <button class="tarefa-acao-btn editar" @click="editarTarefa(t)">
                <font-awesome-icon :icon="faEdit"/>
              </button>
              <button class="tarefa-acao-btn excluir" @click="excluirTarefa(t.lookupId)">
                <font-awesome-icon :icon="faTrash" />
              </button>
            </template>
          </div>
        </div>
      </template>
      <div v-else class="sem-tarefas">
        <font-awesome-icon :icon="faFilePen" class="tarefa-icon" />
        <h3>Nenhuma tarefa ainda</h3>
        <p>Comece adicionando sua primeira tarefa acima</p>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import "../../assets/css/novaTarefa.css";
</style>