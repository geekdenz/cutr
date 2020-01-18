// TODO: not mix styles (quick for now)
import assert from 'assert'
import {expect} from 'chai'
import {Flags, parseFields, processor} from '../lib'
describe('cutr', () => {
  describe('parse arguments', () => {
    it('should parse -f argument', () => {
        const field = '1-'
        const parsedField = parseFields(field)
        // expect(parsedField).to.deepEqual([1, Number.POSITIVE_INFINITY])
        assert.deepEqual(parsedField, [1, Number.POSITIVE_INFINITY])
        assert.deepEqual(parseFields('2'), [2, 2])
        assert.deepEqual(parseFields('2'), [2, 2])
        assert.deepEqual(parseFields('0-0'), [1, 1])
        assert.deepEqual(parseFields('3-0'), [3, 3])
    })
    it('should have a working processor', () => {
        expect(processor({
            d: ' +',
            f: '1-3',
            r: ' ',
        })('1 2     3 4  5')).equal('1 2 3')
        assert.equal(processor({
            d: ' +',
            f: '3',
            r: ' ',
        })('1 2     3 4  5'), '3')
        expect(processor({
            d: ' +',
            f: '3-4',
            r: ' ',
        })('1 2     3 4  5')).equal('3 4')
        expect(processor({
            d: ' (Abraham)+',
            f: '3-4',
            r: ' ',
        })('1 2     3 4  5')).equal(false)
        try {
            processor({
                d: '(',
                f: '3-4',
                r: ' ',
            })
        } catch (e) {
            expect(e instanceof Error).equal(true)
        }
    })
  })
})