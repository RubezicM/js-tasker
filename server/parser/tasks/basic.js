const _ = require('lodash');

let pickTask = (index = _.random(0, assignments.length - 1)) => {

    let assignments = [
        `
        var $a_λN = $num;
        var $b_λN = $num;
        var $c_λN = $num;
        console.log($used_λN + $used_λN); // +0
        `, `
        var $a_λN = $num;   
        var $b_λN = $num;   // # r0
        var $c_λN = $num;   // # r0
        console.log($used_λN);
        `, `
        var $a_λS = 'a';
        var $b_λS = 'b';
        var $c_λS = 'c';
        console.log($used_λS + $used_λS);
        `,
        `
        var $a_λA = ['a', '1']; // []
        var $b_λA = ['b', '2']; // []
        var $c_λA = ['c', '3']; // []
        console.log($used_λA + $used_λA);
        `,
        `
        var $a_λA = ['a', '1']; // []
        var $b_λA = ['b', '2']; // []
        var $c_λA = ['c', '3']; // []
        console.log($used_λA.concat($used_λA));
        `

    ];

    if (!index) {
        index = _.random(0, assignments.length - 1);
    }


    return assignments[index];
};

module.exports = { pickTask };