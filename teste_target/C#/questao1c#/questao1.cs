public class Questao1
{
    public static void Resolver()
    {
        int INDICE = 13, SOMA = 0, K = 0;
        while (K < INDICE)
        {
            K = K + 1;
            SOMA = SOMA + K;
        }
        Console.WriteLine(SOMA); // Output: 91
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        Questao1.Resolver();
    }
}