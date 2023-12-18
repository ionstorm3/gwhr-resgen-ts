using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Gwhr.ResourceGenerator.Extensions;
using Gwhr.ResourceGenerator.Models;

namespace Gwhr.ResourceGenerator.Translators.Typescript;

public class TypescriptTranslator : ITranslator
{
    private readonly string _tplClass = "import {{{1}}} from './{3}'; \n\nexport class {0} implements {1} {{{2}}}";
    private readonly string _tplClassProperty = "\n\tpublic get {0}(): string {{\n\t\treturn \"{1}\";\n\t}}\n";
    private readonly string _tplInterface = "export interface {0} {{ {1} \n}}";
    private readonly string _tplInterfaceProperty = "\n\treadonly {0}: string;";

    private readonly GhResourceDocument _document;

    public TypescriptTranslator(GhResourceDocument document)
    {
        _document = document;
        _document.DirectoryPath = Path.GetFullPath(_document.DirectoryPath);
    }

    private string ClassName => _document.Name.ToPascalCase();
    private string ClassFileName => $"{_document.Name.ToCamelCase()}.ts";
    private string InterfaceName => $"I{_document.Name.ToPascalCase()}";
    private string InterfaceImportName => $"i{_document.Name.ToPascalCase()}";
    private string InterfaceFileName => $"i{_document.Name.ToCamelCase()}.ts";


    public async Task SaveAsync()
    {
        _document.DirectoryPath = Path.GetFullPath(_document.DirectoryPath);

        //Ensure output directory exists
        if (!Directory.Exists(_document.DirectoryPath))
        {
            throw new DirectoryNotFoundException();
        }

        await GenerateInterfaceAsync();
        await GenerateClassAsync();
    }

    private async Task GenerateInterfaceAsync()
    {
        StringBuilder body = new StringBuilder();

        foreach (KeyValuePair<string, GhResourceItem> item in _document.Items)
        {
            body.Append(string.Format(_tplInterfaceProperty, item.Key.ToCamelCase()));
        }

        string content = string.Format(_tplInterface, InterfaceName, body);

        await WriteFileAsync(InterfaceFileName, content);
    }

    private async Task GenerateClassAsync()
    {
        StringBuilder body = new StringBuilder();

        foreach (KeyValuePair<string, GhResourceItem> item in _document.Items)
        {
            body.Append(string.Format(_tplClassProperty, item.Key.ToCamelCase(), item.Value.Value));
        }

        string content = string.Format(_tplClass, ClassName, InterfaceName, body, InterfaceName.ToCamelCase());

        await WriteFileAsync(ClassFileName, content);
    }

    private async Task WriteFileAsync(string name, string content)
    {
        string filename = Path.GetFullPath(Path.Join(_document.DirectoryPath, name));

        // Write the specified text asynchronously to a new file named "WriteTextAsync.txt".
        await using StreamWriter outputFile = new StreamWriter(filename);
        await outputFile.WriteAsync(content);
    }
}