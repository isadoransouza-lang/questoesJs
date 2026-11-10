
function calcularDesconto(subtotal, percentual) {

    let economia = subtotal * (percentual / 100);

    return economia;
}

function calcularCompra() {

    let produto = document.getElementById("produto").value;

    let valor = Number(document.getElementById("valor").value);

    let quantidade = Number(document.getElementById("quantidade").value);

    let desconto = Number(document.getElementById("desconto").value);

    let resultado = document.getElementById("resultado");

    // Validar os dados
    if (produto.trim() === "") {
        resultado.innerHTML = "Digite o nome do produto!";
        return;
    }

    if (
        document.getElementById("valor").value === "" ||
        document.getElementById("quantidade").value === "" ||
        document.getElementById("desconto").value === ""
    ) {
        resultado.innerHTML = "Preencha todos os campos!";
        return;
    }

    if (
        !Number.isFinite(valor) ||
        !Number.isInteger(quantidade) ||
        !Number.isFinite(desconto) ||
        valor < 0 ||
        quantidade <= 0 ||
        desconto < 0 ||
        desconto > 100
    ) {
        resultado.innerHTML = "Valores inválidos!";
        return;
    }

    // Calcular subtotal
    let subtotal = valor * quantidade;

    // Calcular economia
    let economia = calcularDesconto(subtotal, desconto);

    // Calcular total
    let total = subtotal - economia;

    // Exibir resultado
    resultado.innerHTML = `
        <h3>Resumo da compra</h3>
        Produto: ${produto}<br>
        Subtotal: R$ ${subtotal.toFixed(2)}<br>
        Economia: R$ ${economia.toFixed(2)}<br>
        <strong>Total a pagar: R$ ${total.toFixed(2)}</strong>
    `;
}
