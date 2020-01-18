#!/usr/bin/env node
import args from 'args'
import readline from 'readline'
args.option('d', 'delimiter regex (does not show non-matches)', ' ', d => new RegExp(d))
args.option('f', 'field (does not show lines with less fields)', '1-', f => {
    const parts = f.split('-').map(s => parseInt(s)).filter(n => !isNaN(n))
    if (parts[0] < 1) parts[0] = 1
    if (f[f.length - 1] == '-' && parts.length < 2) {
        return [parts[0], Number.POSITIVE_INFINITY]
    }
    if (parts[1] < parts[0]) parts[1] = parts[0];
    return parts
})
args.option('r', 'replacement for delimiter', ' ')
const flags = args.parse(process.argv)
const delimiter: RegExp = flags['d']
const field: number[] = flags['f']

process.stdin.setEncoding('utf8')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})
rl.on('line', chunk => {
    if (delimiter.test(chunk)) {
        let sp = chunk.split(delimiter)
        let s = ''
        for (let i = field[0]; i <= field[1] && i <= sp.length; ++i) {
            if (i > field[0]) s += flags['r']
            s += sp[i - 1]
        }
        console.log(s)
    }
})