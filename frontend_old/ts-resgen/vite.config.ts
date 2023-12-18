import {defineConfig, PluginOption} from 'vite'
import react from '@vitejs/plugin-react'
import {glob} from "glob";
import path from "path";
import {PluginHooks} from 'rollup';


const watcher = (globs: string[]): PluginOption => ({
    name: "res-file-watcher",
    buildStart(options): void {
        console.log("watched file:", this.getWatchFiles());
        for (const item of globs) {
            glob.sync(path.resolve(item)).forEach((filename) => {
                console.log("Add watch file:", filename);
                this.addWatchFile(filename);
            });
        }
    },
    watchChange(id, change): void {
        console.log("change", id, change);
        //Do file transformation here
    }
});

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), watcher(['src/**/*.res'])],
})


