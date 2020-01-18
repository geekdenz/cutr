export interface Flags {
    f: number[]
    d: RegExp
    r: string
}

export function parseFields(fields: string | number = '2-') {
    fields = '' + fields
    let parts = fields.split('-').map(s => parseInt(s)).filter(n => !isNaN(n))
    if (fields.indexOf('-') === -1) {
        parts = [parts[0], parts[0]]
    }
    if (parts[0] < 1) parts[0] = 1
    if (fields[fields.length - 1] == '-' && parts.length < 2) {
        parts = [parts[0], Number.POSITIVE_INFINITY]
    }
    if (parts[1] < parts[0]) parts[1] = parts[0];
    return parts
}
const getFlags = (myArgs: any) => ({
    f: parseFields(myArgs.f),
    d: new RegExp(myArgs.d),
    r: myArgs.r
})
export const processor = (myArgs: any) => {
    // console.log(myArgs)
    const flags = getFlags(myArgs)
    // console.log(flags)
    return (line: string) => {
        const delimiter = flags.d
        const field = flags.f
        if (delimiter.test(line)) {
            let sp = line.split(delimiter)
            let s = ''
            for (let i = field[0]; i <= field[1] && i <= sp.length; ++i) {
                if (i > field[0]) s += flags['r']
                s += sp[i - 1]
            }
            return s
        }
        return false
    }
}