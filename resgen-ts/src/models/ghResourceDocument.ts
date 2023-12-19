import {GhResourceItem} from "./ghResourceItem";
import path from "path";
import fs from "fs";

export class GhResourceDocument {

    public constructor(name?: string, directoryPath?: string) {
        this.name = name == null ? this.name : name;
        this.directoryPath = directoryPath == null ? this.directoryPath : directoryPath;
    }

    public name: string = "";
    public directoryPath: string = "";
    public items: Map<string, GhResourceItem> = new Map<string, GhResourceItem>();

    public async writeToDiskAsync(name: string, content: string): Promise<void> {
        const filename: string = path.join(this.directoryPath, name);
        console.log(filename);
        await fs.promises.writeFile(filename, content);
    }
}