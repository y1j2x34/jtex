"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rollup_plugin_typescript2_1 = __importDefault(require("rollup-plugin-typescript2"));
var plugin_commonjs_1 = __importDefault(require("@rollup/plugin-commonjs"));
var plugin_node_resolve_1 = __importDefault(require("@rollup/plugin-node-resolve"));
var rollup_plugin_string_1 = require("rollup-plugin-string");
var plugin_json_1 = __importDefault(require("@rollup/plugin-json"));
var package_json_1 = __importDefault(require("./package.json"));
var input = './src/index.tsx';
if (process.argv.indexOf('-w') > -1) {
    input = './src/debug.ts';
}
exports.default = {
    input: input,
    output: [
        { file: package_json_1.default.main, name: 'json2html', format: 'umd', sourcemap: false },
        { file: package_json_1.default.module, format: 'esm', sourcemap: false }
    ],
    external: [],
    plugins: [
        rollup_plugin_typescript2_1.default(),
        plugin_commonjs_1.default(),
        plugin_node_resolve_1.default(),
        plugin_json_1.default(),
        rollup_plugin_string_1.string({
            include: 'src/res/*.{css,txt,js}'
        })
    ]
};
