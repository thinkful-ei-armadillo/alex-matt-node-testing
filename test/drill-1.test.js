'use strict';

const expect = require('chai').expect;
const sort = require('../drill-1');

describe('sort in ascending order', () => {
    it('should sort positive numbers', () => {
        expect(sort([5,1,5,3,4,7])).to.have.ordered.members([1,3,4,5,5,7]);
    });
    it('should handle negative numbers', () => {
        expect(sort([-1,-5,-3,-6])).to.have.ordered.members([-6,-5,-3,-1]);
    });
    it('should handle a mix of positive and negative numbers', () => {
        expect(sort([-3,-6,10,9,34])).to.have.ordered.members([-6,-3,9,10,34]);
    });
    it('should handle an empty array', () => {
        expect(sort([])).to.eql([]);
    });

        //handles all positive
        //handles all negative
        //handles mix of positive and negative
        //handles empty
    //throws error if not numbers
    //throws error is NaN?
});