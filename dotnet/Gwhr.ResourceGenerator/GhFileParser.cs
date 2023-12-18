using Gwhr.ResourceGenerator.Models;

namespace Gwhr.ResourceGenerator;

public class GhFileParser
{
    public async Task<GhResourceDocument> ReadAsync(string dirPath)
    {
        dirPath = Path.GetFullPath(dirPath);
        //Determine if the path exists
        if (!Path.Exists(dirPath))
        {
            throw new DirectoryNotFoundException();
        }

        //Get the base resource file
        foreach (string file in  Directory.GetFiles(dirPath, "*.res"))
        {
            Console.WriteLine(file);
        }

        List<FileInfo> files = Directory.GetFiles(dirPath, "*.res").Select(x => new FileInfo(x)).ToList();

        //Get the root file
        FileInfo? rootFile = files.FirstOrDefault(x => x.Name.Count(y => y == '.') == 1);
        if (rootFile == null)
        {
            throw new ArgumentException("Unable to find the main resource file.");
        }

        //Root file found.  Parse the file into a dictionary.
        Dictionary<string, GhResourceItem> items = new Dictionary<string, GhResourceItem>();
        int lineCount = 0;
        using StreamReader sr = new StreamReader(rootFile.FullName);
        while (sr.Peek() >= 0)
        {
            lineCount++;
            string? line = await sr.ReadLineAsync();

            //Skip empty lines
            if (string.IsNullOrEmpty(line) || line[0] == '#')
            {
                continue;
            }

            string[] lineSplit = line.Split('|');
            if (lineSplit.Length != 3)
            {
                Console.WriteLine($"[Error] Invalid data at line {lineCount}");
            }

            GhResourceItem item = new GhResourceItem()
            {
                Key = lineSplit[0],
                Value = lineSplit[1],
                Comment = lineSplit[2]
            };

            //Check if this is a duplicate key
            if (items.TryAdd(item.Key, item))
            {
                continue;
            }

            Console.WriteLine($"[Warning]  An entry with the key{item.Key} already exists.  Duplicates not allowed.  Skipping...");
        }

        return new GhResourceDocument()
        {
            DirectoryPath = dirPath,
            Name = Path.GetFileNameWithoutExtension(rootFile.FullName),
            Items = items
        };
    }
}