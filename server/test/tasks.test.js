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
    _: '_'
};

describe('First test task', () => {
    let testString = startTest(0);

    it('does not have "undefined" in it.', () => {
        expect(testString).toEqual(expect.not.stringContaining(badWords.undefined));
    });

    it('does not have "$" in it.', () => {
        expect(testString).toEqual(expect.not.stringContaining(badWords.$));
    });

    it('does not have "º" in it.', () => {
        expect(testString).toEqual(expect.not.stringContaining(badWords.º));
    });

    it('does not have "_" in it.', () => {
        expect(testString).toEqual(expect.not.stringContaining(badWords._));
    });
});

