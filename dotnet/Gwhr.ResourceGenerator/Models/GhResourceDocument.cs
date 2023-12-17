namespace Gwhr.ResourceGenerator.Models;

public class GhResourceDocument
{
    public string Name { get; set; } = string.Empty;
    public string DirectoryPath { get; set; } = string.Empty;
    public Dictionary<string, GhResourceItem> Items = new Dictionary<string, GhResourceItem>();
}