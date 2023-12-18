var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GhStringUtils } from "../utilities/ghStringUtils";
import * as fs from "fs";
import path from "path";
export class GhTypescriptTranslator {
    constructor() {
        this._document = undefined;
        this._tplClass = "import {{1}} from './{1}'; \n\nexport class {0} implements {1} {{2}}";
        this._tplClassProperty = "\n\tpublic get {0}(): string {\n\t\treturn \"{1}\";\n\t}\n";
        this._tplInterface = "export interface {0} { {1} \n}";
        this._tplInterfaceProperty = "\n\treadonly {0}: string;";
    }
    get document() {
        if (this._document == null) {
            throw new Error("Document not initialized");
        }
        return this._document;
    }
    get className() {
        return GhStringUtils.toPascalCase(this.document.name);
    }
    get classFileName() {
        return `${GhStringUtils.toCamelCase(this.document.name)}.ts`;
    }
    get interfaceName() {
        return GhStringUtils.toPascalCase(this.document.name);
    }
    get interfaceFileName() {
        return `i${GhStringUtils.toCamelCase(this.document.name)}.ts`;
    }
    saveAsync(document) {
        return __awaiter(this, void 0, void 0, function* () {
            this._document = document;
            //Ensure the output directory exists
            if (!fs.existsSync(this.document.directoryPath)) {
                throw new Error(`Path not found: ${this.document.directoryPath}`);
            }
            throw new Error("not implemented");
        });
    }
    generateInterfaceAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            let output = "";
            for (const item of this.document.items) {
                // output+=i
            }
        });
    }
    generateClassAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            //
        });
    }
    writeFileAsync(name, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const filename = path.join(this.document.directoryPath, name);
            yield fs.promises.writeFile(filename, content);
        });
    }
}
