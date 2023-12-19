import {IGhTranslator} from "../translators/iGhTranslator";

export interface IResgenPluginOptions {
    globs: string[];
    translators?: IGhTranslator[];
}