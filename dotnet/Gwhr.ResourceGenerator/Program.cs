using Gwhr.ResourceGenerator.Models;
using Gwhr.ResourceGenerator.Translators.Typescript;

namespace Gwhr.ResourceGenerator;

public class Program
{
    static async Task<int> Main(string[] args)
    {
        if (args.Length == 0)
        {
            ShowManPage();
            return 1;
        }

        return await RunAsync(args[0]);
    }

    private static async Task<int> RunAsync(string path)
    {
        try
        {
            GhFileParser parser = new GhFileParser();
            GhResourceDocument document = await parser.ReadAsync(path);
            TypescriptTranslator translator = new TypescriptTranslator(document);
            await translator.SaveAsync();
            return 0;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return 1;
        }
    }

    private static void ShowManPage()
    {
        Console.WriteLine("Gwhr Typescript Resource Generator");
        Console.WriteLine("(c) 2023 All Rights Reserved");
        string content = "USAGE \n \n \t hello";
        Console.WriteLine(content);
    }
}