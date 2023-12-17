import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {glob} from "glob";
import path from "path";

const watcher = (globs: string[]): Partial<PluginHooks> => ({
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
        console.log("change", id, change);
    }
});

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), watcher(['src/**/*.res'])],
})


