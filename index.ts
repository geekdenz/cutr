#!/usr/bin/env node
import args from 'args'
import readline from 'readline'
import { parseFields, processor, Flags} from './lib'

args.option('d', 'delimiter regex (does not show non-matches)', ' ')
args.option('f', 'field ($start-$end) (defaults to "2-")')
args.option('r', 'replacement for delimiter', ' ')

const processorFunction = processor(args.parse(process.argv))

process.stdin.setEncoding('utf8')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})
rl.on('line', line => {
    const o = processorFunction(line)
    if (o) console.log(o)
})