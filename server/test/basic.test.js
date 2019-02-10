const expect = require('expect');

const { inlineSyntax } = require('../parser/inline/inline-syntax');
const { commentsSyntax } = require('../parser/comments/comments-syntax');
const { pickTask, assignments } = require('../parser/tasks/basic');

let startTest = (taskIndex) => {
    let assignment = pickTask(taskIndex);
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

describe('Test task', () => {
    for (let i = 0; i < assignments.length; ++i) {
        if (i === 9) {
            continue;
        };
        for (let j = 0; j < 10; j++) {
            console.log('index', i);
            let testStringBasic = startTest(i);
            let testString = testStringBasic.function + testStringBasic.result;

            it(`does not have "undefined" in it. Task index: ${i}`, () => {
                expect(testString).toEqual(expect.not.stringContaining(badWords.undefined));
            });

            it(`does not have "NaN" in it. Task index: ${i}`, () => {
                expect(testString).toEqual(expect.not.stringContaining(badWords.NaN));
            });

            it(`does not have "$" in it. Task index: ${i}`, () => {
                expect(testString).toEqual(expect.not.stringContaining(badWords.$));
            });

            it(`does not have "º" in it. Task index: ${i}`, () => {
                expect(testString).toEqual(expect.not.stringContaining(badWords.º));
            });

            it(`does not have "_" in it. Task index: ${i}`, () => {
                expect(testString).toEqual(expect.not.stringContaining(badWords._));
            });
        };
    };
});

