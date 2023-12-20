import {InputOptions, Plugin} from "rollup";
import path, {ParsedPath} from "path";
import {IResgenPluginOptions} from "./iResgenPluginOptions";
import {GhTypescriptInterfaceTranslator} from "../translators/ghTypescriptInterfaceTranslator";
import {GhTypescriptClassTranslator} from "../translators/ghTypescriptClassTranslator";
import {GhResourceDocument} from "../models/ghResourceDocument";
import {GhResFileParser} from "../parsers/ghResFileParser";
import {glob} from "glob";


export function ResGen(pluginOptions: IResgenPluginOptions): Plugin {
    return ({
        name: "res-file-plugin",
        buildStart(options: InputOptions): void {

            if (pluginOptions.translators == null) {
                pluginOptions.translators = [new GhTypescriptInterfaceTranslator(), new GhTypescriptClassTranslator()];
            }

            console.log("watched file:", this.getWatchFiles());
            for (const item of pluginOptions.globs) {
                glob.sync(path.resolve(item)).forEach((filename: string) => {
                    console.log("Add watch file:", filename);
                    this.addWatchFile(filename);
                });
            }
        },
        watchChange: async (id: string, change: { event: 'create' | 'update' | 'delete' }): Promise<void> => {
            //Do file transformation here
            if (change.event == "delete") {
                return;
            }

            const fileInfo: ParsedPath = path.parse(id);

            if (fileInfo.ext !== ".res") {
                return;
            }

            const baseName: string = path.posix.basename(id);
            if (baseName.split(".").length !== 2) {
                return;
            }
            if (pluginOptions.translators == null) {
                return;
            }
            const doc: GhResourceDocument = await GhResFileParser.parseAsync(id);
            for (const translator of pluginOptions.translators!) {
                await translator.saveAsync(doc)
            }
        }
    });
}