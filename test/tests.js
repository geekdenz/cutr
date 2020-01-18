"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: not mix styles (quick for now)
var assert_1 = __importDefault(require("assert"));
var chai_1 = require("chai");
var lib_1 = require("../lib");
describe('cutr', function () {
    describe('parse arguments', function () {
        it('should parse -f argument', function () {
            var field = '1-';
            var parsedField = lib_1.parseFields(field);
            // expect(parsedField).to.deepEqual([1, Number.POSITIVE_INFINITY])
            assert_1.default.deepEqual(parsedField, [1, Number.POSITIVE_INFINITY]);
            assert_1.default.deepEqual(lib_1.parseFields('2'), [2, 2]);
            assert_1.default.deepEqual(lib_1.parseFields('2'), [2, 2]);
            assert_1.default.deepEqual(lib_1.parseFields('0-0'), [1, 1]);
            assert_1.default.deepEqual(lib_1.parseFields('3-0'), [3, 3]);
        });
        it('should have a working processor', function () {
            chai_1.expect(lib_1.processor({
                d: ' +',
                f: '1-3',
                r: ' ',
            })('1 2     3 4  5')).equal('1 2 3');
            assert_1.default.equal(lib_1.processor({
                d: ' +',
                f: '3',
                r: ' ',
            })('1 2     3 4  5'), '3');
            chai_1.expect(lib_1.processor({
                d: ' +',
                f: '3-4',
                r: ' ',
            })('1 2     3 4  5')).equal('3 4');
            chai_1.expect(lib_1.processor({
                d: ' (Abraham)+',
                f: '3-4',
                r: ' ',
            })('1 2     3 4  5')).equal(false);
            try {
                lib_1.processor({
                    d: '(',
                    f: '3-4',
                    r: ' ',
                });
            }
            catch (e) {
                chai_1.expect(e instanceof Error).equal(true);
            }
        });
    });
});
