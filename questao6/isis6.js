let produtos = [];

function cadastrarProduto(){

    let nome = document.getElementById("nome").value.trim();

    let codigo = document.getElementById("codigo").value.trim();

    let quantidade = Number(document.getElementById("quantidade").value);

    let preco = Number(document.getElementById("preco").value);

    if(!nome || !codigo || 
        document.getElementById("quantidade").value === "" || 
        document.getElementById("preco").value === ""
    ) {
        alert("Preencha todos os campos!");
        return;
    }

    if(
         !Number.isInteger(quantidade) ||
        !Number.isFinite(preco) ||
        quantidade < 0 ||
        preco < 0
    ) {
        alert("Valores inválidos!");
        return;
    }

    let existe = produtos.find(p => p.codigo === codigo);

    if(existe){
        alert("Código já cadastrado!");
        return;
    }

     let produto = {
        nome: nome,
        codigo: codigo,
        quantidade: quantidade,
        preco: preco
    };

    produtos.push(produto);

    atualizarLista();
}

function entrada(){

    let codigo = document.getElementById("codigoMov").value.trim();

    let quantidade = Number(document.getElementById("quantidadeMov").value);

    if(!Number.isInteger(quantidade) || quantidade <= 0){
        alert("Digite uma quantidade válida!");
        return;
    }

    let produto = produtos.find(p => p.codigo === codigo);

    if(!produto){
        alert("Produto não encontrado!");
        return;
    }

    produto.quantidade += quantidade;

    atualizarLista();
}

function saida(){

    let codigo = document.getElementById("codigoMov").value.trim();

    let quantidade = Number(document.getElementById("quantidadeMov").value);

    if(!Number.isInteger(quantidade) || quantidade <= 0){
        alert("Digite uma quantidade válida!");
        return;
    }

     let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (quantidade > produto.quantidade) {
        alert("Estoque insuficiente!");
        return;
    }

    produto.quantidade -= quantidade;

    atualizarLista();

}

function atualizarLista(){

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    let total = 0;

    produtos.forEach(produto => {

        let valorProduto = produto.quantidade * produto.preco;

        total += valorProduto;

        let alerta = produto.quantidade < 5 
        ? "ESTOQUE BAIXO" : "Normal";

        lista.innerHTML += `
            <div class="resultado">
                Produto: ${produto.nome}<br>
                Código: ${produto.codigo}<br>
                Quantidade: ${produto.quantidade}<br>
                Preço: R$ ${produto.preco.toFixed(2)}<br>
                Valor em estoque: R$ ${valorProduto.toFixed(2)}<br>
                <strong>${alerta}</strong>
            </div>
        `;
    });

    document.getElementById("valorTotal").innerHTML = "Valor total do estoque:  R$ " + total.toFixed(2);
    
}