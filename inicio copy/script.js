function executarSistema() {

    try {
        // Dados de entrada
        const inputNome = document.getElementById("inputNome");
        const inputIdade = document.getElementById("inputIdade");
        const inputValor = document.getElementById("inputValor");
        const inputCupom = document.getElementById("inputCupom");

        // Dados de saída
        const msg = document.getElementById("mensagem-autorizacao");
        const lista = document.getElementById("lista-estoque");
        const relatorio = document.getElementById("relatorio-final");

        const btn = document.getElementById("btnFinalizar");

        btn.disable = true;
        btn.innerText = "Processando...";

        // trim() remove os espaços em branco
        const nome = inputNome.value.trim();
        const idade = parseInt(inputIdade.value);
        const valor = parseFloat(inputValor.value);
        const cupom = inputCupom.value === "true";

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

        localStorage.setItem("name", nome);
        const nomeLocal = localStorage.getItem("name");
        const valorLocal = localStorage.getItem("value");
        
        
        // Validação para campos vazios
        if (!nome || isNaN(idade) || isNaN(valor)) {
            msg.innerText = "Preencha todos os campos corretamente!";
            msg.style.color = "#ff4444";
            return;
        }

        // Regra de negócio
        if (idade >= 16) {
            msg.innerText = `Venda autorizada: ${nome}`;
            msg.style.color = "#00ff88";

            // Desconto
            let valorFinal = (valor > 500 || cupom) ? valor * 0.85 : valor;
            let valorDesconto = (valor > 500 || cupom) ? valor - valorFinal : 0;
            let percentDesconto = (valor > 500 || cupom) ? 15 : 0;

            // Estoque
            let estoque = ["Placa de Vídeo", "Processador", "Memória RAM"];
            lista.innerHTML = ""; // Limpa a lista anterior

            // forEach: Percorre um array e aplica uma ação para cada elemento
            estoque.forEach(item => {
                let li = document.createElement("li");
                li.innerText = `Item ${item} reservado.`;
                lista.appendChild(li); // usado para adicionar um novo elemento ou texto
            });

            if (usuarios[nome]) {
                usuarios[nome] += Number(valorFinal.toFixed(2));
            } else {
                usuarios[nome] = Number(valorFinal.toFixed(2));
            }
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            localStorage.setItem("value", valorFinal);
            let categoriaCliente;

            if(usuarios[nome] < 1620){
                categoriaCliente = "Sem Categoria"
            }

            else if(usuarios[nome] > 1620 && usuarios[nome] < 4500){
                categoriaCliente = "Bronze";
            }
            else if (usuarios[nome] > 4500 && usuarios[nome] < 7500){
                categoriaCliente = "Prata";
            }
            else if (usuarios[nome] > 7500){
                categoriaCliente = "Ouro";
            }



            //add();

            // Relatório
            relatorio.style.display = "block";
            relatorio.innerHTML = `
            <strong> RESUMO DO PEDIDO <\strong><br>
            Cliente: ${nome} <br>
            Total Original: R$ ${valor.toFixed(2)} <br>
            <strong> Total com Desconto: R$ ${valorFinal.toFixed(2)} <\strong> <br>
            <strong> Total Economizado: R$ ${valorDesconto.toFixed(2)} <\strong> <br>
            <strong> Percentual de Desconto: ${percentDesconto}% <\strong> <br>
            <strong> Histórico de Compras: R$ ${usuarios[nome]} <\strong> <br>
            <strong> Categoria do cliente: ${categoriaCliente} <\strong> <br>

            
            `;
        } else {
            msg.innerText = "Venda bloqueada: Menor de 16 anos.";
            msg.style.color = "#ff4444";
            relatorio.style.display = "none";
            lista.innerHTML = "";
        }
    } catch (error) {

    }
}