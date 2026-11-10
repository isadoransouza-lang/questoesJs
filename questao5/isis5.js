let alunos = [
    {
        nome: "Ana Silva",
        curso: "Informática"
    },

    {
         nome: "Carlos Souza",
        curso: "Administração"
    },
     {
        nome: "Maria Oliveira",
        curso: "Enfermagem"
    },
    {
        nome: "João Santos",
        curso: "Informática"
    },
    {
        nome: "Pedro Lima",
        curso: "Administração"
    }
];

function pesquisarAlunos(){

   let nome = document.getElementById("pesquisa").value.toLowerCase().trim();

   let curso = document.getElementById("curso").value;

   let encontrados = alunos.filter(aluno => {

    let nomeCorresponde = aluno.nome.toLowerCase().includes(nome);

    let cursoCorresponde = 
    curso === "" || aluno.curso === curso; 

    return nomeCorresponde && cursoCorresponde;

   });

   document.getElementById("quantidade").innerHTML = "Resultados encontrados: " + encontrados.length;

   let resultado = document.getElementById("resultado");

   resultado.innerHTML = "";

   if(encontrados.length === 0){
    resultado.innerHTML = "Nenhum aluno encontrado!";
    return;
   }

   encontrados.forEach(aluno => {
     resultado.innerHTML += `
            <div class="resultado">
                <strong>Nome:</strong> ${aluno.nome}<br>
                <strong>Curso:</strong> ${aluno.curso}
            </div>
        `;
   });

}

pesquisarAlunos();