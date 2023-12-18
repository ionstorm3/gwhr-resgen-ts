import {GhResourceItem} from "./ghResourceItem";

export class GhResourceDocument {

    public constructor(name?: string, directoryPath?: string) {
        this.name = name == null ? this.name : name;
        this.directoryPath = directoryPath == null ? this.directoryPath : directoryPath;
    }

    public name: string = "";
    public directoryPath: string = "";
    public items: Map<string, GhResourceItem> = new Map<string, GhResourceItem>();
}