export class GhStringUtils {
    public static toPascalCase(value: string): string {
        let output: string = "";
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

    public static toCamelCase(value: string): string {
        let output: string = "";
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

    public static format(target: string, ...args: string[]): string {
        for (let i: number = 0; i < args.length; i++) {
            target = target.replaceAll(`{${i}}`, args[i]);
        }
        return target;
    }
}