import {defineConfig, PluginOption} from 'vite'
import {glob} from "glob";
import path from "path";
import ResWatcher from "./src/plugins/resPlugin";
import ResWatcherX from "./src/plugins/resPlugin";


// const watcher = (globs: string[]): Plugin => ({
//     name: "res-file-watcher",
//     buildStart(options) {
//         console.log("watched file:", this.getWatchFiles());
//         for (const item of globs) {
//             glob.sync(path.resolve(item)).forEach((filename) => {
//                 console.log("Add watch file:", filename);
//                 this.addWatchFile(filename);
//             });
//         }
//     },
//     watchChange(id, change) {
//         console.log("change", id, change);
//         //Do file transformation here
//     }
// });

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [new ResWatcherX(['src/**/*.res'])]
});
//, watcher(['src/**/*.res']

