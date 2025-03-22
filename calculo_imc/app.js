function calcularIMC(peso, altura) {
  const imc = peso / (altura * altura);
  return imc;
}

// Exemplo de uso:
const pesoEmKg = 88;
const alturaEmMetros = 1.88;
const imcCalculado = calcularIMC(pesoEmKg, alturaEmMetros);
console.log("Seu IMC é:", imcCalculado);