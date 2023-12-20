import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {ResGen} from "resgen-ts";
// import * as resgen from "resgen-ts";
//
// const ResGen = resgen.ResGen;

/*
import * as YourModule from 'your-commonjs-module';
const ResGen = YourModule.ResGen;
* */

// https://vitejs.dev/config/
export default defineConfig({
    // @ts-ignore

    plugins: [react(), ResGen({globs: ['src/**/*.res']})]
})
