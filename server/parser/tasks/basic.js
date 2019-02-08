const _ = require('lodash');

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
    `,`
    var $a_λO = {   // # b3-0
        $b_λK: 'x',
        $c_λK: 'y'
    };
    var $d_λO = {   // # b3-0
        $b_λK: 1,
        $c_λK: 2
    };
    console.log($used_λO.$used_λK);
    `,`
    var $a_λN = $num;
    var $b_λN = $num;
    var $c = 0;
    for (i = 0; i < $used_λN; ++i) {
        ++$c;
        if (i === $used_λN - 2) {
            $c += 1;
        };
    };
    console.log($c);
    `
    

];



let pickTask = (index = _.random(0, assignments.length - 1)) => assignments[index];

// let pickTask = (index = assignments.length - 1) => assignments[index];

module.exports = { pickTask };