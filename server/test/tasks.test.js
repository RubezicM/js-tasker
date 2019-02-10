const { inlineSyntax } = require('./parser/inline/inline-syntax');
const { commentsSyntax } = require('./parser/comments/comments-syntax');
const { pickTask } = require('./parser/tasks/basic');

let assignment = pickTask();
let commentsRandomization = commentsSyntax(assignment).function;
let task = inlineSyntax(commentsRandomization);

