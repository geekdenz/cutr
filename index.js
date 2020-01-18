#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var args_1 = __importDefault(require("args"));
var readline_1 = __importDefault(require("readline"));
args_1.default.option('d', 'delimiter regex (does not show non-matches)', ' ', function (d) { return new RegExp(d); });
args_1.default.option('f', 'field (does not show lines with less fields)', '1-', function (f) {
    var parts = f.split('-').map(function (s) { return parseInt(s); }).filter(function (n) { return !isNaN(n); });
    if (parts[0] < 1)
        parts[0] = 1;
    if (f[f.length - 1] == '-' && parts.length < 2) {
        return [parts[0], Number.POSITIVE_INFINITY];
    }
    if (parts[1] < parts[0])
        parts[1] = parts[0];
    return parts;
});
args_1.default.option('r', 'replacement for delimiter', ' ');
var flags = args_1.default.parse(process.argv);
var delimiter = flags['d'];
var field = flags['f'];
process.stdin.setEncoding('utf8');
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
rl.on('line', function (chunk) {
    if (delimiter.test(chunk)) {
        var sp = chunk.split(delimiter);
        var s = '';
        for (var i = field[0]; i <= field[1] && i <= sp.length; ++i) {
            if (i > field[0])
                s += flags['r'];
            s += sp[i - 1];
        }
        console.log(s);
    }
});
