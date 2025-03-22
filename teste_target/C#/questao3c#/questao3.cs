using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using System.Xml.Linq;
using System.Globalization;

public class Faturamento
{
    public int dia { get; set; }
    public double valor { get; set; }
}

public class Program
{
    public static void Main(string[] args)
    {
        // Ler dados JSON do arquivo
        string json = File.ReadAllText("dados1.json");
        List<Faturamento> dadosJson = JsonConvert.DeserializeObject<List<Faturamento>>(json);
        ProcessarDados(dadosJson, "JSON");

        // Ler dados XML do arquivo
        string xml = File.ReadAllText("dados2.xml");
        XDocument doc = XDocument.Parse(xml);
        var dadosXml = doc.Descendants("row").Select(row => new Faturamento
        {
            dia = int.Parse(row.Element("dia").Value),
            valor = double.Parse(row.Element("valor").Value, CultureInfo.InvariantCulture)
        }).ToList();
        ProcessarDados(dadosXml, "XML");
    }

    public static void ProcessarDados(List<Faturamento> dados, string tipoDados)
    {
        var faturamentos = dados.Where(d => d.valor > 0).Select(d => d.valor).ToList();

        double menorFaturamento = faturamentos.Min();
        double maiorFaturamento = faturamentos.Max();
        double mediaMensal = faturamentos.Average();
        int diasAcimaMedia = dados.Count(d => d.valor > mediaMensal);

        Console.WriteLine($"Resultados {tipoDados}:");
        Console.WriteLine($"Menor faturamento: R$ {menorFaturamento:F2}");
        Console.WriteLine($"Maior faturamento: R$ {maiorFaturamento:F2}");
        Console.WriteLine($"Dias com faturamento acima da média: {diasAcimaMedia}");
        Console.WriteLine();
    }
}