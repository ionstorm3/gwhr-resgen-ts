import {defineConfig} from "vite";
import ResourceGeneratorPlugin from "./src/plugins/resgenVitePlugin";

export default defineConfig({
    plugins: [ResourceGeneratorPlugin(['src/**/*.res'])]
    //plugins: [react(), watcher(['src/**/*.res'])],
});