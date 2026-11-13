 let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  function salvarDados() {
            localStorage.setItem("tarefas", JSON.stringify(tarefas));
        }
 function salvarTarefa(){
    let id = document.getElementById("idTarefa").value;
    let titulo = document.getElementById("titulo").value.trim();
    let descricao = document.getElementById("descricao").value.trim();
    let prioridade = document.getElementById("prioridade").value;
    let prazo = document.getElementById("prazo").value;

    if(!titulo || !descricao || !prazo){
        alert("Preencha todos os campos!");
        return;
    }

    if(id){
        let tarefa = tarefas.find(t => t.id === Number(id));

        if(tarefa){
            tarefa.titulo = titulo;
            tarefa.descrico = descricao;
            tarefa.prioridade = prioridade;
            tarefa.prazo = prazo;
        }

        else{
            tarefas.push({
                id: Date.now(),
                titulo: titulo,
                descricao: descricao,
                prioridade: prioridade,
                prazo: prazo,
                concluida: false
            });

        }
       salvarDados();
       limparFormulario();
       atualizar();
    }
 }
function editarTarefa(id){
      let tarefa = tarefas.find(t => t.id === id);

            document.getElementById("idTarefa").value = tarefa.id;
            document.getElementById("titulo").value = tarefa.titulo;
            document.getElementById("descricao").value = tarefa.descricao;
            document.getElementById("prioridade").value = tarefa.prioridade;
            document.getElementById("prazo").value = tarefa.prazo;
}

function excluirTarefa(id){

    if(confirm("Deseja excluir esta tarefa?")){
        tarefas = tarefas.filter(t => t.id !== id);

         salvarDados();
         atualizar();
    }
}

  function concluirTarefa(id) {

            let tarefa = tarefas.find(t => t.id === id);

            tarefa.concluida = !tarefa.concluida;

            salvarDados();
            atualizar();
        }

        function limparFormulario() {

            document.getElementById("idTarefa").value = "";
            document.getElementById("titulo").value = "";
            document.getElementById("descricao").value = "";
            document.getElementById("prioridade").value = "Baixa";
            document.getElementById("prazo").value = "";
        }

        function mostrarTarefas() {

            let lista = document.getElementById("listaTarefas");

            let filtro = document.getElementById("filtro").value;
            let ordenacao = document.getElementById("ordenacao").value;

            lista.innerHTML = "";

            let hoje = new Date();
            hoje.setHours(0, 0, 0, 0);

            let filtradas = tarefas.filter(t => {

                let prazo = new Date(t.prazo + "T00:00:00");
                let atrasada = !t.concluida && prazo < hoje;

                if (filtro === "Pendentes") return !t.concluida;

                if (filtro === "Concluídas") return t.concluida;

                if (filtro === "Atrasadas") return atrasada;

                return true;
            });

            if (ordenacao === "prazo") {

                filtradas.sort((a, b) =>
                    a.prazo.localeCompare(b.prazo)
                );

            } else {

                let pesos = {
                    "Alta": 3,
                    "Média": 2,
                    "Baixa": 1
                };

                filtradas.sort((a, b) =>
                    pesos[b.prioridade] - pesos[a.prioridade]
                );
            }

            filtradas.forEach(t => {

                let prazo = new Date(t.prazo + "T00:00:00");
                let atrasada = !t.concluida && prazo < hoje;

                lista.innerHTML += `
                    <hr>

                    <h3>${t.titulo}</h3>

                    <p>Descrição: ${t.descricao}</p>

                    <p>Prioridade: ${t.prioridade}</p>

                    <p>Prazo: ${t.prazo}</p>

                    <p>Status:
                        ${t.concluida ? "Concluída" :
                        atrasada ? "Atrasada" : "Pendente"}
                    </p>

                    <button onclick="concluirTarefa(${t.id})">
                        ${t.concluida ? "Reabrir" : "Concluir"}
                    </button>

                    <button onclick="editarTarefa(${t.id})">
                        Editar
                    </button>

                    <button onclick="excluirTarefa(${t.id})">
                        Excluir
                    </button>

                    <hr>
                `;
            });

            if (filtradas.length === 0) {
                lista.innerHTML = "<p>Nenhuma tarefa encontrada.</p>";
            }
        }

        function atualizarIndicadores() {

            let total = tarefas.length;

            let concluidas = tarefas.filter(
                t => t.concluida
            ).length;

            let pendentes = tarefas.filter(
                t => !t.concluida
            ).length;

            document.getElementById("total").textContent = total;
            document.getElementById("concluidas").textContent = concluidas;
            document.getElementById("pendentes").textContent = pendentes;
        }

        function atualizar() {
            atualizarIndicadores();
            mostrarTarefas();
        }

        atualizar();

