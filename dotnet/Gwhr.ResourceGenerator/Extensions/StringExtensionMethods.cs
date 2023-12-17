using System.Text;
using System.Text.RegularExpressions;

namespace Gwhr.ResourceGenerator.Extensions;

public static class StringExtensionMethods
{
    public static string ToCamelCase(this string value)
    {
        StringBuilder builder = new StringBuilder();
        value = Regex.Replace(value, "[^a-zA-Z0-9]", "_").Trim();

        char? prevChar = null;
        foreach (char currChar in value)
        {
            if (currChar == '_')
            {
                prevChar = currChar;
                continue;
            }

            if (prevChar == '_' || prevChar == null)
            {
                //Capitalize the letter
                builder.Append(builder.Length == 0
                    ? char.ToLower(currChar)
                    : char.ToUpper(currChar));
                prevChar = currChar;
                continue;
            }

            builder.Append(currChar);
            prevChar = currChar;
        }

        return builder.ToString();
    }

    public static string ToPascalCase(this string value)
    {
        StringBuilder builder = new StringBuilder();
        value = Regex.Replace(value, "[^a-zA-Z0-9]", "_").Trim();

        char? prevChar = null;
        foreach (char currChar in value)
        {
            if (currChar == '_')
            {
                prevChar = currChar;
                continue;
            }

            if (prevChar == '_' || prevChar == null)
            {
                //Capitalize the letter
                builder.Append(char.ToUpper(currChar));
                prevChar = currChar;
                continue;
            }

            builder.Append(currChar);
            prevChar = currChar;
        }

        return builder.ToString();
    }
}