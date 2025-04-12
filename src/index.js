class Request {
    constructor(valorDoImovel, entrada, euribor, spread, termoEmAnos) {
        this.valorDoImovel = valorDoImovel;
        this.entrada = entrada;
        this.euribor = euribor;
        this.spread = spread;
        this.termoEmAnos = termoEmAnos;
    }
}

const MOEDA = "€";
const TABLE_TR_STYLE = "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200";
const TABLE_TD_STYLE = "px-6 py-4";

function calcular() {
    const request = new Request(
        parseFloat(document.getElementById("valorDoImovel").value),
        parseFloat(document.getElementById("entrada").value / 100),
        parseFloat(document.getElementById("euribor").value / 100),
        parseFloat(document.getElementById("spread").value / 100),
        parseFloat(document.getElementById("termoEmAnos").value),
    );
    debugger;
    const capitalEmprestado = request.valorDoImovel - (request.entrada * request.valorDoImovel);
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
        <tr class="${TABLE_TR_STYLE}">
            <td class="${TABLE_TD_STYLE}">${i}</td>
            <td class="${TABLE_TD_STYLE}">${prestacaoMensal.toFixed(2)} ${MOEDA}</td>
            <td class="${TABLE_TD_STYLE}">${capital.toFixed(2)} ${MOEDA}</td>
            <td class="${TABLE_TD_STYLE}">${juros.toFixed(2)} ${MOEDA}</td>
            <td class="${TABLE_TD_STYLE}">${saldoDevedor > 0 ? saldoDevedor.toFixed(2) : "0.00"} ${MOEDA}</td>
        </tr>
        `;
    }
}

function init() {
    // alert("Test");

}

init();