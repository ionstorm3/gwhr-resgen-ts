import {IGhTranslator} from "./iGhTranslator";
import {GhResourceDocument} from "../models/ghResourceDocument";
import {GhStringUtils} from "../utilities/ghStringUtils";

export class GhTypescriptInterfaceTranslator implements IGhTranslator {
    private readonly _tmplHeader: string = "/* \nThis code was generated by the resgen-ts tool.\nChanges to this file may cause incorrect behavior and will be lost if\nthe code is regenerated \n*/\n";
    private readonly _tmplInterface: string = "export interface {0} { {1} \n}";
    private readonly _tmplProperty: string = "\n\t/** {1} */\n\treadonly {0}: string;"

    public async saveAsync(document: GhResourceDocument): Promise<void> {
        const content: string = this.generateInterface(document);
        await document.writeToDiskAsync(this.getInterfaceFileName(document), content);
    }

    private getInterfaceName(document: GhResourceDocument): string {
        return `I${GhStringUtils.toPascalCase(document.name)}`;
    }

    private getInterfaceFileName(document: GhResourceDocument): string {
        return `i${GhStringUtils.toPascalCase(document.name)}.res.ts`;
    }

    private generateInterface(document: GhResourceDocument): string {
        let body: string = "";
        for (const item of document.items) {
            body += GhStringUtils.format(this._tmplProperty, GhStringUtils.toCamelCase(item[1].key), item[1].comment);
        }
        let content: string = GhStringUtils.format(this._tmplInterface, this.getInterfaceName(document), body);
        content = `${this._tmplHeader}\n${content}`;
        return content;
    }
}