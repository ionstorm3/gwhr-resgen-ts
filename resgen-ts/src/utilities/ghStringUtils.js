export class GhStringUtils {
    static toPascalCase(value) {
        let output = "";
        value = value.replace(/[^a-zA-Z0-9]/g, '_');
        let prevChar = undefined;
        for (const currChar of value) {
            if (currChar == "_") {
                prevChar = currChar;
                continue;
            }
            if (prevChar == "_" || prevChar == null) {
                //Capitalize the first letter
                output += currChar.toUpperCase();
                prevChar = currChar;
                continue;
            }
            output += currChar;
            prevChar = currChar;
        }
        return output;
    }
    static toCamelCase(value) {
        let output = "";
        value = value.replace(/[^a-zA-Z0-9]/g, '_');
        let prevChar = undefined;
        for (const currChar of value) {
            if (currChar == "_") {
                prevChar = currChar;
                continue;
            }
            if (prevChar == "_" || prevChar == null) {
                //Capitalize the first letter
                output += output.length === 0
                    ? currChar.toLowerCase()
                    : currChar.toUpperCase();
                prevChar = currChar;
                continue;
            }
            output += currChar;
            prevChar = currChar;
        }
        return output;
    }
}
