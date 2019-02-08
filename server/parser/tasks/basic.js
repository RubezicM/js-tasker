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
    var $a_λO = {
        $b_λS: 'x',
        $c_λS: 'y'
    };
    var $d_λO = {
        $b_λS: 'x',
        $c_λS: 'y'
    };
    console.log($used_λO.$used_λS);
    `
    

];

// let pickTask = (index = _.random(0, assignments.length - 1)) => assignments[index];

let pickTask = (index = assignments.length - 1) => assignments[index];

module.exports = { pickTask };