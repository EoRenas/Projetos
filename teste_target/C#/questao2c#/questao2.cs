using System;
using System.Collections.Generic;

public class Questao2
{
    public static void Resolver(int numero)
    {
        int a = 0, b = 1, c;
        List<int> fibonacci = new List<int> { a, b };

        while (b <= numero)
        {
            c = a + b;
            fibonacci.Add(c);
            a = b;
            b = c;
        }

        if (fibonacci.Contains(numero))
        {
            Console.WriteLine($"{numero} pertence à sequência de Fibonacci.");
        }
        else
        {
            Console.WriteLine($"{numero} não pertence à sequência de Fibonacci.");
        }
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        Questao2.Resolver(21); // Insira o número aqui para verificar se pertence à sequência de Fibonacci
    }
}