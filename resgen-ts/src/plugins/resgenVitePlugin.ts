import {PluginOption} from "vite";
import {InputOptions} from "rollup";
import {glob} from "glob";
import path from "path";
import * as child_process from "child_process";


const ResourceGeneratorPlugin = (globs: string[]): PluginOption => ({
    name: "res-file-watcher",
    buildStart(options: InputOptions): void {
        console.log("watched file:", this.getWatchFiles());
        for (const item of globs) {
            glob.sync(path.resolve(item)).forEach((filename) => {
                console.log("Add watch file:", filename);
                this.addWatchFile(filename);
            });
        }
    },
    watchChange(id: string, change: { event: 'create' | 'update' | 'delete' }): void {
        console.log("change", id, change);
        //Do file transformation here
        if (change.event == "delete") {
            return;
        }

        const ext: string = path.extname(id);
        console.log("ext:", ext);
        if (ext !== ".res") {
            console.log(`${ext} != .res`);
            return;
        }

        const dirPath: string = path.dirname(id);
        console.log("dirpath", dirPath);

        const exec = child_process.exec;
        let result: string = "";
        const child = exec(`/Users/gregory/Development/gwhr/ts-resgen/dotnet/Gwhr.ResourceGenerator/bin/Debug/net8.0/tsresgen ${dirPath}`);
        child.stdout?.on("data", (data) => {
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