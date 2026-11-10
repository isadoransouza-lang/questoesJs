function calcularMedia() {

    let nome = document.getElementById("nome").value;

    let nota1 = Number(document.getElementById("nota1").value);
    let nota2 = Number(document.getElementById("nota2").value);
    let nota3 = Number(document.getElementById("nota3").value);

    let resultado = document.getElementById("resultado");

    // Validar nome
    if (nome.trim() === "") {
        resultado.innerHTML = "Digite o nome do aluno!";
        return;
    }

    // Validar notas
    if (
        document.getElementById("nota1").value === "" ||
        document.getElementById("nota2").value === "" ||
        document.getElementById("nota3").value === ""
    ) {
        resultado.innerHTML = "Preencha todas as notas!";
        return;
    }

    if (
        nota1 < 0 || nota1 > 10 ||
        nota2 < 0 || nota2 > 10 ||
        nota3 < 0 || nota3 > 10
    ) {
        resultado.innerHTML = "As notas devem estar entre 0 e 10!";
        return;
    }

    
    let media = (nota1 + nota2 + nota3) / 3;

    
    let situacao;

    if (media >= 7) {
        situacao = "Aprovado";
    } 
    else if (media >= 5) {
        situacao = "Recuperação";
    } 
    else {
        situacao = "Reprovado";
    }

    
    resultado.innerHTML = `
        Aluno: ${nome}<br><br>
        Média: ${media.toFixed(2)}<br><br>
        Situação: ${situacao}
    `;
}
