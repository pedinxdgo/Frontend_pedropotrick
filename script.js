function executarSistema(){
    //Dados de Entrada
    const nome = document.getElementById("inputNome").value;
    const idade = parseInt(document.getElementById("inputIdade").value);
    const valor = parseFloat(document.getElementById("inputValor").value);
    const cupom = document.getElementById("inputCupom").value === "true";

    //Dados de Saída
    const msg = document.getElementById("mensagem-autorizacao");
    const lista = document.getElementById("lista-estoque");
    const relatorio = document.getElementById("relatorio-final");

    //Validação para campos vazios
    if (!nome || isNaN(idade) || isNaN (valor)) {
        alert("Por favor, preencha todos os campos!");
        return;
    }
    // Regra de negocios
    if (idade >= 16) {
        msg.innerText = `Venda autotizada: ${nome}`;
        msg.style.color = "#f0f8ff";

    // Desconto
    let calculoTotal = (valor > 500 || cupom ) ? valor * 0.85 : valor;

    // Estoque
    let Estoque = ["Placa de Vídeo", "Processador", "Memória RAM"];
    lista.innerHTML = ""; //Limpa a lista anterior
    }
}
