const hbs = require('express-hbs');


hbs.registerHelper('if_eq', function (a, b, opts) {
    if (a === b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    };
});

module.exports = { hbs };