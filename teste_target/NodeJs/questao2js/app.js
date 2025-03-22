function questao2(numero) {
    let a = 0, b = 1, c;
    let fibonacci = [a, b];
  
    while (b <= numero) {
      c = a + b;
      fibonacci.push(c);
      a = b;
      b = c;
    }
  
    if (fibonacci.includes(numero)) {
      console.log(`${numero} pertence à sequência de Fibonacci.`);
    } else {
      console.log(`${numero} não pertence à sequência de Fibonacci.`);
    }
  }
  
  questao2(15); // Insira o número aqui para verificar se pertence à sequência de Fibonacci