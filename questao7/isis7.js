let estudantes = JSON.parse(localStorage.getItem("estudantes")) || [];
let frequencias = JSON.parse(localStorage.getItem("frequencias")) || [];
     
function salvarDados() {
 
    localStorage.setItem("estudantes", JSON.stringify(estudantes));
     localStorage.setItem("frequencias", JSON.stringify(frequencias));
        }

 function cadastrarEstudante() {

 let nome = document.getElementById("nome").value.trim();
 let matricula = document.getElementById("matricula").value.trim();
 let turma = document.getElementById("turma").value.trim();
 let curso = document.getElementById("curso").value.trim();

if (!nome || !matricula || !turma || !curso) {
                alert("Preencha todos os campos!");
                return;
 }

 if (estudantes.some(e => e.matricula === matricula)) {
                alert("Matrícula já cadastrada!");
                return;
 }
  estudantes.push({
                id: Date.now(),
                nome,
                matricula,
                turma,
                curso
            });

  salvarDados();

            document.getElementById("nome").value = "";
            document.getElementById("matricula").value = "";
            document.getElementById("turma").value = "";
            document.getElementById("curso").value = "";

            atualizarTela();
        }

  function registrarFrequencia() {

     let estudanteId = Number(document.getElementById("estudante").value);
     let data = document.getElementById("data").value;
     let situacao = document.getElementById("situacao").value;

     if (!estudanteId || !data) {
                alert("Selecione o estudante e a data!");
                return;
    }

     let existe = frequencias.some(f =>
                f.estudanteId === estudanteId && f.data === data
            );

    if (existe) {
                alert("Já existe um registro nessa data!");
                return;
            }

            frequencias.push({
                estudanteId,
                data,
                situacao
            });

            salvarDados();
            atualizarTela();

            alert("Frequência registrada!");
        }

 function atualizarTela() {

    let lista = document.getElementById("listaEstudantes");
    let select = document.getElementById("estudante");
    let filtro = document.getElementById("filtro");

            lista.innerHTML = "";
            select.innerHTML = "";
            filtro.innerHTML = '<option value="">Todos os estudantes</option>';

            estudantes.forEach(e => {

                lista.innerHTML += `
                    <li>
                        Nome: ${e.nome} |
                        Matrícula: ${e.matricula} |
                        Turma: ${e.turma} |
                        Curso: ${e.curso}
                    </li>
                `;

                select.innerHTML += `
                    <option value="${e.id}">${e.nome}</option>
                `;

                filtro.innerHTML += `
                    <option value="${e.id}">${e.nome}</option>
                `;
            });

            mostrarHistorico();
            verificarAlertas();
        }

   function mostrarHistorico() {

            let filtro = document.getElementById("filtro").value;
            let historico = document.getElementById("historico");

            historico.innerHTML = "";

            let registros = [...frequencias].sort((a, b) =>
                a.data.localeCompare(b.data)
            );

            registros.forEach(f => {

                if (filtro && f.estudanteId !== Number(filtro)) {
                    return;
                }

                let aluno = estudantes.find(e => e.id === f.estudanteId);

                if (aluno) {
                    historico.innerHTML += `
                        <li>
                            ${aluno.nome} - ${f.data} - ${f.situacao}
                        </li>
                    `;
                }
            });
        }

        function verificarAlertas() {

            let alertas = document.getElementById("alertas");
            alertas.innerHTML = "";

            estudantes.forEach(aluno => {

                let registros = frequencias
                    .filter(f => f.estudanteId === aluno.id)
                    .sort((a, b) => a.data.localeCompare(b.data));

                let faltas = 0;

                registros.forEach(f => {

                    if (f.situacao === "Falta não justificada") {
                        faltas++;

                        if (faltas === 4) {
                            alertas.innerHTML += `
                                <p>
                                    ALERTA: ${aluno.nome} possui
                                    mais de três faltas consecutivas
                                    sem justificativa!
                                </p>
                            `;
                        }

                    } else {
                        faltas = 0;
                    }

                });
            });
        }

        atualizarTela();
