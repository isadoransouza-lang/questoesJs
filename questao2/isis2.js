
function gerarTabuada() {

    
    let campo = document.getElementById("numero");
    let numero = Number(campo.value);

    let resultado = document.getElementById("resultado");

    
    if (
        campo.value === "" ||
        !Number.isInteger(numero) ||
        numero < 1 ||
        numero > 20
    ) {
        resultado.innerHTML =
            "<p class='erro'>Digite um número inteiro entre 1 e 20!</p>";

        return;
    }

    
    let tabuada = "";

    
    for (let i = 1; i <= 10; i++) {

        let multiplicacao = numero * i;

        tabuada += `
            <p>
                ${numero} x ${i} = ${multiplicacao}
            </p>
        `;
    }


    resultado.innerHTML = `
        <h3>Tabuada do ${numero}</h3>
        ${tabuada}
    `;
}



function limpar() {

    document.getElementById("numero").value = "";

    document.getElementById("resultado").innerHTML = "";

}
