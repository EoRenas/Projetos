function questao4() {
    const faturamento = {
      SP: 67836.43,
      RJ: 36678.66,
      MG: 29229.88,
      ES: 27165.48,
      Outros: 19849.53
    };
  
    const total = Object.values(faturamento).reduce((a, b) => a + b, 0);
  
    for (const estado in faturamento) {
      const percentual = (faturamento[estado] / total) * 100;
      console.log(`${estado}: ${percentual.toFixed(2)}%`);
    }
  }
  
  questao4();