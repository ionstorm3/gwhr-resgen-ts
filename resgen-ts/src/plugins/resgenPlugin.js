var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { glob } from "glob";
import path from "path";
import { GhTypescriptInterfaceTranslator } from "../translators/ghTypescriptInterfaceTranslator";
import { GhTypescriptClassTranslator } from "../translators/ghTypescriptClassTranslator";
import { GhResFileParser } from "../parsers/ghResFileParser";
const ResGen = (pluginOptions) => ({
    name: "res-file-watcher",
    buildStart(options) {
        if (pluginOptions.translators == null) {
            pluginOptions.translators = [new GhTypescriptInterfaceTranslator(), new GhTypescriptClassTranslator()];
        }
        console.log("watched file:", this.getWatchFiles());
        for (const item of pluginOptions.globs) {
            glob.sync(path.resolve(item)).forEach((filename) => {
                console.log("Add watch file:", filename);
                this.addWatchFile(filename);
            });
        }
    },
    watchChange: (id, change) => __awaiter(void 0, void 0, void 0, function* () {
        //Do file transformation here
        if (change.event == "delete") {
            return;
        }
        const fileInfo = path.parse(id);
        if (fileInfo.ext !== ".res") {
            return;
        }
        const baseName = path.posix.basename(id);
        if (baseName.split(".").length !== 2) {
            return;
        }
        if (pluginOptions.translators == null) {
            return;
        }
        const doc = yield GhResFileParser.parseAsync(id);
        for (const translator of pluginOptions.translators) {
            yield translator.saveAsync(doc);
        }
    })
});
export default ResGen;
