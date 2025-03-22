const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrkey: "ATTR" });

const processarDados = (dados, tipoDados) => {
    const faturamentos = dados.filter(d => d.valor > 0).map(d => d.valor);

    const menorFaturamento = Math.min(...faturamentos);
    const maiorFaturamento = Math.max(...faturamentos);
    const mediaMensal = faturamentos.reduce((a, b) => a + b, 0) / faturamentos.length;
    const diasAcimaMedia = dados.filter(d => d.valor > mediaMensal).length;

    console.log(`Resultados ${tipoDados}:`);
    console.log(`Menor faturamento: R$ ${menorFaturamento.toFixed(2)}`);
    console.log(`Maior faturamento: R$ ${maiorFaturamento.toFixed(2)}`);
    console.log(`Dias com faturamento acima da média: ${diasAcimaMedia}`);
    console.log();
};

// Processamento JSON
const dadosJson = JSON.parse(fs.readFileSync('dados1.json', 'utf8'));
processarDados(dadosJson, "JSON");

// Processamento XML
const xmlDados = fs.readFileSync('dados2.xml', 'utf8');
parser.parseString(xmlDados, (err, result) => {
    if (err) {
        console.error("Erro ao processar XML:", err);
        return;
    }

    const dadosXml = result.dados.row.map(row => ({
        dia: parseInt(row.dia[0]),
        valor: parseFloat(row.valor[0])
    }));
    processarDados(dadosXml, "XML");
});