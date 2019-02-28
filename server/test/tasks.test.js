const expect = require('expect');

const { inlineSyntax } = require('../parser/inline/inline-syntax');
const { commentsSyntax } = require('../parser/comments/comments-syntax');
const { pickTestTask } = require('./basic-tts');

let startTest = (taskIndex) => {
    let assignment = pickTestTask(taskIndex);
    let commentsRandomization = commentsSyntax(assignment).function;
    return inlineSyntax(commentsRandomization);
};

let badWords = {
    undefined: 'undefined',
    $: '$',
    º: 'º',
    _: '_',
    NaN: 'NaN'
};

describe('First test task', () => {
    for (i = 0; i < 1; ++i) {
        let testStringBasic = startTest(0);
        let testString = testStringBasic.function + testStringBasic.result;

        // it('does not have "undefined" in it.', () => {
        //     expect(testString).toEqual(expect.not.stringContaining(badWords.undefined));
        // });

        // it('does not have "NaN" in it.', () => {
        //     expect(testString).toEqual(expect.not.stringContaining(badWords.NaN));
        // });

        it('does not have "$" in it.', () => {
            expect(testString).toEqual(expect.not.stringContaining(badWords.$));
        });

        it('does not have "º" in it.', () => {
            expect(testString).toEqual(expect.not.stringContaining(badWords.º));
        });

        it('does not have "_" in it.', () => {
            expect(testString).toEqual(expect.not.stringContaining(badWords._));
        });
    };
});

