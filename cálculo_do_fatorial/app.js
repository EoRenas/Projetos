function calcularFatorial(numero) {
    let fatorial = 1;
    for (let i = 2; i <= numero; i++) {
      fatorial *= i;
    }
    return fatorial;
  }
  
  //exemplo:
  const numero = 5;
  const fatorialCalculado = calcularFatorial(numero);
  console.log("O fatorial de", numero, "é:", fatorialCalculado);