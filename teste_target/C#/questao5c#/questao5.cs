using System;

public class InverterString
{
    public static void Main(string[] args)
    {
        string texto = "Renan Almeida de Oliveira"; // String a ser invertida
        string textoInvertido = Inverter(texto);
        Console.WriteLine(textoInvertido); // Imprime a string invertida
    }

    public static string Inverter(string texto)
    {
        char[] caracteres = texto.ToCharArray();
        int esquerda = 0;
        int direita = caracteres.Length - 1;

        while (esquerda < direita)
        {
            // Troca os caracteres das extremidades
            char temp = caracteres[esquerda];
            caracteres[esquerda] = caracteres[direita];
            caracteres[direita] = temp;

            // Move os índices para o centro
            esquerda++;
            direita--;
        }

        return new string(caracteres);
    }
}