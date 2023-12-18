import {GhResourceDocument} from "../models/ghResourceDocument";

export interface IGhTranslator {
    saveAsync(document: GhResourceDocument): Promise<void>;
}