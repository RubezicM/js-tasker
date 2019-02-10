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
    _: '_'
};

describe('First test task', () => {
    for (let i = 0; i < assignments.length; ++i) {
        for (let j = 0; j < 10; j++) {
            console.log('index', i);
            //console.log('Index: -', i, '- Current working task: ', assignments[i], 'End of task.');
            let testString = startTest(i);

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
        };
    };
});

