import moduleExample from "../moduleExample";

/* eslint-disable no-undef */

describe("moduleExample tests", function() {
    it("greeting() returns Hello World", function() {
        expect(moduleExample.greeting()).toEqual("Hello World");
    });
});
