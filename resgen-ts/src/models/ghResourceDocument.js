export class GhResourceDocument {
    constructor(name, directoryPath) {
        this.name = "";
        this.directoryPath = "";
        this.items = new Map();
        this.name = name == null ? this.name : name;
        this.directoryPath = directoryPath == null ? this.directoryPath : directoryPath;
    }
}
