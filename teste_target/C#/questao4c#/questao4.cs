using System;
using System.Collections.Generic;
using System.Linq;

public class Questao4
{
    public static void Resolver()
    {
        Dictionary<string, double> faturamento = new Dictionary<string, double>
        {
            { "SP", 67836.43 },
            { "RJ", 36678.66 },
            { "MG", 29229.88 },
            { "ES", 27165.48 },
            { "Outros", 19849.53 }
        };

        double total = faturamento.Values.Sum();

        foreach (var estado in faturamento)
        {
            double percentual = (estado.Value / total) * 100;
            Console.WriteLine($"{estado.Key}: {percentual:F2}%");
        }
    }

    public static void Main(string[] args)
    {
        Resolver();
    }
}