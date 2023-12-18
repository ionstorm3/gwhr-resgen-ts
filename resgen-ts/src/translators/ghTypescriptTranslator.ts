import {IGhTranslator} from "./iGhTranslator";
import {GhResourceDocument} from "../models/ghResourceDocument";
import {GhStringUtils} from "../utilities/ghStringUtils";
import * as fs from "fs";
import path from "path";

export class GhTypescriptTranslator implements IGhTranslator {
    private _document?: GhResourceDocument = undefined;
    private readonly _tplClass: string = "import {{1}} from './{1}'; \n\nexport class {0} implements {1} {{2}}";
    private readonly _tplClassProperty: string = "\n\tpublic get {0}(): string {\n\t\treturn \"{1}\";\n\t}\n";
    private readonly _tplInterface: string = "export interface {0} { {1} \n}";
    private readonly _tplInterfaceProperty: string = "\n\treadonly {0}: string;";

    public get document(): GhResourceDocument {
        if (this._document == null) {
            throw new Error("Document not initialized");
        }
        return this._document;
    }

    public get className(): string {
        return GhStringUtils.toPascalCase(this.document.name);
    }

    public get classFileName(): string {
        return `${GhStringUtils.toCamelCase(this.document.name)}.ts`;
    }

    public get interfaceName(): string {
        return GhStringUtils.toPascalCase(this.document.name);
    }

    public get interfaceFileName(): string {
        return `i${GhStringUtils.toCamelCase(this.document.name)}.ts`;
    }

    public async saveAsync(document: GhResourceDocument): Promise<void> {\
        this._document = document;
        //Ensure the output directory exists
        if (!fs.existsSync(this.document.directoryPath)) {
            throw new Error(`Path not found: ${this.document.directoryPath}`);
        }

        throw new Error("not implemented");
    }

    private async generateInterfaceAsync(): Promise<void> {
        let output: string = "";
        for (const item of this.document.items) {
            // output+=i
        }
    }

    private async generateClassAsync(): Promise<void> {
        //
    }

    private async writeFileAsync(name: string, content: string): Promise<void> {
        const filename: string = path.join(this.document.directoryPath, name);
        await fs.promises.writeFile(filename, content);
    }
}