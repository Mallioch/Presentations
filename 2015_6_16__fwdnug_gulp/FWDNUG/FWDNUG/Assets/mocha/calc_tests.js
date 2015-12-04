var assert = require("assert")
var context = require('./../js/calc.js');

console.log('the calc', context.Calc);

describe('Calc', function () {
    describe('adding', function () {
        it('should return 5 when 2 and 3 are added', function () {
            assert.equal(5, context.Calc.add(2, 3));
        })
    })
})