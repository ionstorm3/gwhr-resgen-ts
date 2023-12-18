using System.Threading.Tasks;
using Gwhr.ResourceGenerator.Models;

namespace Gwhr.ResourceGenerator.Translators;

public interface ITranslator
{
    Task SaveAsync();
}