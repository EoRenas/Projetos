function inverterString(texto) {
  let textoInvertido = "";
  for (let i = texto.length - 1; i >= 0; i--) {
    textoInvertido += texto[i];
  }
  return textoInvertido;
}

const textoOriginal = "Renan Almeida de Oliveira";
const textoInvertido = inverterString(textoOriginal);

console.log(textoInvertido);