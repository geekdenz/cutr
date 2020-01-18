#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var args_1 = __importDefault(require("args"));
var readline_1 = __importDefault(require("readline"));
var lib_1 = require("./lib");
args_1.default.option('d', 'delimiter regex (does not show non-matches)', ' ');
args_1.default.option('f', 'field ($start-$end) (defaults to "2-")');
args_1.default.option('r', 'replacement for delimiter', ' ');
var processorFunction = lib_1.processor(args_1.default.parse(process.argv));
process.stdin.setEncoding('utf8');
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
rl.on('line', function (line) {
    var o = processorFunction(line);
    if (o)
        console.log(o);
});
