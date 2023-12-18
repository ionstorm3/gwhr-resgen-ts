export class GhResourceItem {

    public constructor(key?: string, value?: string, comment?: string) {
        this.key = key == null ? this.key : key;
        this.value = value == null ? this.value : value;
        this.comment = comment == null ? this.comment : comment;
    }

    public key: string = "";
    public value: string = "";
    public comment: string = "";
}