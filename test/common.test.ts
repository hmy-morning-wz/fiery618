
globalThis.my={getStorageSync:()=>{return {}}}
import common from "../utils/common.ts"
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});


describe('common', function() {
  it('common.hashCode', function() {    
    assert.equal(common.hashCode("abc"), 17862);
  });
});