class Request {
    constructor(valorDoImovel, entrada, euribor, spread, termoEmAnos) {
        this.valorDoImovel = valorDoImovel;
        this.entrada = entrada;
        this.euribor = euribor;
        this.spread = spread;
        this.termoEmAnos = termoEmAnos;
    }
}

const TABLE_CELL_STYLE = "border border-gray-300";

function calcular() {
    const request = new Request(
        parseFloat(document.getElementById("valorDoImovel").value),
        parseFloat(document.getElementById("entrada").value),
        parseFloat(document.getElementById("euribor").value / 100),
        parseFloat(document.getElementById("spread").value / 100),
        parseFloat(document.getElementById("termoEmAnos").value),
    );
    debugger;
    const capitalEmprestado = request.valorDoImovel - request.entrada;
    const meses = request.termoEmAnos * 12;
    const taxaMensal = (request.euribor + request.spread) / 12;

    // Cálculo da prestação mensal fixa (método francês)
    const prestacaoMensal = capitalEmprestado * taxaMensal / (1 - Math.pow(1 + taxaMensal, -meses));

    let saldoDevedor = capitalEmprestado;
    const tabela = document.querySelector("#tabelaPrestacoes tbody");
    tabela.innerHTML = "";

    for (let i = 1; i <= meses; i++) {
        const juros = saldoDevedor * taxaMensal;
        const capital = prestacaoMensal - juros;
        saldoDevedor -= capital;

        tabela.innerHTML += `
        <tr>
            <td class="${TABLE_CELL_STYLE}">${i}</td>
            <td class="${TABLE_CELL_STYLE}">${prestacaoMensal.toFixed(2)}</td>
            <td class="${TABLE_CELL_STYLE}">${capital.toFixed(2)}</td>
            <td class="${TABLE_CELL_STYLE}">${juros.toFixed(2)}</td>
            <td class="${TABLE_CELL_STYLE}">${saldoDevedor > 0 ? saldoDevedor.toFixed(2) : "0.00"}</td>
        </tr>
        `;
    }
}

function init() {
    // alert("Test");

}

init();