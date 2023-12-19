import {FileHandle, open} from "fs/promises";
import {GhResourceDocument} from "../models/ghResourceDocument";
import {GhResourceItem} from "../models/ghResourceItem";
import path, {ParsedPath} from "path";

export class GhResFileParser {
    public static async parseAsync(filepath: string): Promise<GhResourceDocument> {
        const file: FileHandle = await open(filepath);
        let lineCount: number = 0;
        const document: GhResourceDocument = new GhResourceDocument();
        const parsedPath: ParsedPath = path.parse(filepath);
        document.name = parsedPath.name
        document.directoryPath = parsedPath.dir;
        for await (const line of file.readLines()) {
            lineCount++;
            if (line.length == 0) {
                continue;
            }
            if (line[0] === "#") {
                continue;
            }
            //Split the string at the pipe characters
            const split: string[] = line.split("|")
            if (split.length < 2) {
                throw new Error(`Unable to parse data on line: ${lineCount}`)
            }
            const item: GhResourceItem = new GhResourceItem();
            item.key = split[0].trim();
            item.value = split[1].trim();
            item.comment = split.length == 2 ? "" : split[2].trim();

            //Ensure the item does not already exist in the document
            if (document.items.has(item.key)) {
                console.warn(`An existing entry with the key ${item.key} found.  Duplicates not allowed.  Skipping...`);
                continue;
            }

            //Add to items
            document.items.set(item.key, item);
        }
        return document;
    }
}