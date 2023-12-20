import {defineConfig} from "vite";
import {ResGen} from "./src/plugins/resgenPlugin";

export default defineConfig({
    plugins: [ResGen({globs: ['src/**/*.res']})]
    //plugins: [react(), watcher(['src/**/*.res'])],
});
