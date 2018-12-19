const {handleToggle} = require('./sean')

describe("ensure that a boolean is returned", function(){
    test("test that an id number returns true",function(){
        expect(handleToggle(4)).toBeTruthy()
    })
    test("when passed a boolean true value, returns true", function(){
        expect(handleToggle(true)).toEqual(true)
    })
    test("when passed undefined, returns false", function(){
        expect(handleToggle(undefined)).toEqual(false)
    })
    test("empty value returns false", function() {
        expect(handleToggle()).toEqual(false)
    })
    test("when passed a string, returns true", function(){
        expect(handleToggle('This is a string')).toEqual(true)
    })
})