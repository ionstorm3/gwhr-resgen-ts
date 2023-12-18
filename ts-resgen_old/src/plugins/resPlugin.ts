import {glob} from "glob";
import path from "path";
import {PluginOption} from 'vite'
import {ChangeEvent, InputOptions, PluginContext} from "rollup";


const ResWatcher = (globs: string[]): PluginOption => ({
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
    }
});

function ResFilePlugin(): PluginOption {
    return PluginOption = {
        name: "",
        buildStart: (options: InputOptions) => {
            //
        },
        watchChange: (id: string, change: { event: ChangeEvent }) => {
            //
        }
    }

    const y: PluginOption = {
        name: "",
        buildStart: (options: InputOptions) => {
            //
        },
        watchChange: (id: string, change: { event: ChangeEvent }) => {
            //
        }
    };

// export default ResWatcher;
// //
    export default class ResWatcherX {
        private readonly _globs: string[] = [];

        public constructor(globs: string[]) {
            this._globs = globs;
        }

        public name: string = "";

        //#region Hooks

        buildStart = (ctx: PluginContext, options: InputOptions): void => {
            console.log("Build start!!!");
            for (const item of this._globs) {
                glob.sync(path.resolve(item)).forEach((filename) => {
                    console.log("Add watch file:", filename, ctx, options);
                    console.log("this:", this);
                    (this as unknown as PluginContext).addWatchFile(filename);
                });
            }
        };
        watchChange = (id: string, change: { event: 'create' | 'update' | 'delete' }): void => {
            console.log("id:", id, change);
        }

        //#endregion
    }