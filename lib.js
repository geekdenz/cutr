"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseFields(fields) {
    if (fields === void 0) { fields = '2-'; }
    fields = '' + fields;
    var parts = fields.split('-').map(function (s) { return parseInt(s); }).filter(function (n) { return !isNaN(n); });
    if (fields.indexOf('-') === -1) {
        parts = [parts[0], parts[0]];
    }
    if (parts[0] < 1)
        parts[0] = 1;
    if (fields[fields.length - 1] == '-' && parts.length < 2) {
        parts = [parts[0], Number.POSITIVE_INFINITY];
    }
    if (parts[1] < parts[0])
        parts[1] = parts[0];
    return parts;
}
exports.parseFields = parseFields;
var getFlags = function (myArgs) { return ({
    f: parseFields(myArgs.f),
    d: new RegExp(myArgs.d),
    r: myArgs.r
}); };
exports.processor = function (myArgs) {
    // console.log(myArgs)
    var flags = getFlags(myArgs);
    // console.log(flags)
    return function (line) {
        var delimiter = flags.d;
        var field = flags.f;
        if (delimiter.test(line)) {
            var sp = line.split(delimiter);
            var s = '';
            for (var i = field[0]; i <= field[1] && i <= sp.length; ++i) {
                if (i > field[0])
                    s += flags['r'];
                s += sp[i - 1];
            }
            return s;
        }
        return false;
    };
};
