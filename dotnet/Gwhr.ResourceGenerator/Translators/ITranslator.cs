using Gwhr.ResourceGenerator.Models;

namespace Gwhr.ResourceGenerator.Translators;

public interface ITranslator
{
    Task SaveAsync();
}