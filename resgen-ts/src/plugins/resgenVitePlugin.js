import { glob } from "glob";
import path from "path";
import * as child_process from "child_process";
const ResourceGeneratorPlugin = (globs) => ({
    name: "res-file-watcher",
    buildStart(options) {
        console.log("watched file:", this.getWatchFiles());
        for (const item of globs) {
            glob.sync(path.resolve(item)).forEach((filename) => {
                console.log("Add watch file:", filename);
                this.addWatchFile(filename);
            });
        }
    },
    watchChange(id, change) {
        var _a;
        console.log("change", id, change);
        //Do file transformation here
        if (change.event == "delete") {
            return;
        }
        const ext = path.extname(id);
        console.log("ext:", ext);
        if (ext !== ".res") {
            console.log(`${ext} != .res`);
            return;
        }
        const dirPath = path.dirname(id);
        console.log("dirpath", dirPath);
        const exec = child_process.exec;
        let result = "";
        const child = exec(`/Users/gregory/Development/gwhr/ts-resgen/dotnet/Gwhr.ResourceGenerator/bin/Debug/net8.0/tsresgen ${dirPath}`);
        (_a = child.stdout) === null || _a === void 0 ? void 0 : _a.on("data", (data) => {
            result += data;
        });
        child.on("close", () => {
            console.log('done');
            console.log(result);
        });
    }
});
export default ResourceGeneratorPlugin;
//
// var exec = require('child_process').exec;
//
// var result = '';
//
// var child = exec('ping google.com');
//
// child.stdout.on('data', function(data) {
//     result += data;
// });
//
// child.on('close', function() {
//     console.log('done');
//     console.log(result);
// });
