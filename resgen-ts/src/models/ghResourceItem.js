export class GhResourceItem {
    constructor(key, value, comment) {
        this.key = "";
        this.value = "";
        this.comment = "";
        this.key = key == null ? this.key : key;
        this.value = value == null ? this.value : value;
        this.comment = comment == null ? this.comment : comment;
    }
}
