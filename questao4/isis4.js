let alunos = [];

function cadastrarAluno(){
    let nome = document.getElementById("nome").value.trim();

    let idade = Number(document.getElementById("idade").value);

    let curso = document.getElementById("curso").value.trim();

    let matricula = document.getElementById("matricula").value.trim();

    let mensagem = document.getElementById("mensagem");

    if (!Number.isInteger(idade) || idade <= 0){
        mensagem.innerHTML = "Digite uma idade válida!";
        return;
    }

    let existe = alunos.find(aluno => aluno.matricula === matricula);

    if (existe){
        mensagem.innerHTML = "Matrícula já cadastrada!";
        return;
    }

    let aluno = {
        nome: nome,
        idade: idade,
        curso: curso,
        matricula: matricula
    };

    alunos.push(aluno);

    mensagem.innerHTML = "Aluno cadastrado com sucesso!";

    listarAlunos();

     document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("curso").value = "";
    document.getElementById("matricula").value = "";
}

function listarAlunos(){
    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    alunos.forEach(aluno => {
        lista.innerHTML += `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.idade}</td>
                <td>${aluno.curso}</td>
                <td>${aluno.matricula}</td>
            </tr>
        `;
    });

    document.getElementById("total").innerHTML = "Total de alunos: " + alunos.length;
}