const _ = require('lodash');

let assignments = [
    `
    var $a_ºN = $num;
    var $b_ºN = $num;
    var $c_ºN = $num;
    console.log($used_ºN + $used_ºN); // +0
    `, `
    var $a_ºN = $num;   
    var $b_ºN = $num;   // # r0
    var $c_ºN = $num;   // # r0
    console.log($used_ºN);
    `, `
    var $a_ºS = 'a';
    var $b_ºS = 'b';
    var $c_ºS = 'c';
    console.log($used_ºS + $used_ºS);
    `,
    `
    var $a_ºA = ['a', '1']; // []
    var $b_ºA = ['b', '2']; // []
    var $c_ºA = ['c', '3']; // []
    console.log($used_ºA + $used_ºA);
    `,
    `
    var $a_ºA = ['a', '1']; // []
    var $b_ºA = ['b', '2']; // []
    var $c_ºA = ['c', '3']; // []
    console.log($used_ºA.concat($used_ºA));
    `,`
    var $a_ºO = {   // # b3-0
        $b_ºK: 'x',
        $c_ºK: 'y'
    };
    var $d_ºO = {   // # b3-0
        $b_ºK: 1,
        $c_ºK: 2
    };
    console.log($used_ºO.$used_ºK);
    `,`
    var $a_ºN = $num;
    var $b_ºN = $num;
    var $c = 0;
    for (i = 0; i < $used_ºN; ++i) {
        ++$c;
        if (i === $used_ºN - 2) {
            $c += 1;
        };
    };
    console.log($c);
    `,`
    var $a_ºN = $num;
    var $b_ºN = $num;
    var $c_ºN = $num;
    $var_$used_ºN = 5;
    `
    

];


// let pickTask = (index = _.random(0, assignments.length - 1)) => assignments[index];

let pickTask = (index = assignments.length - 1) => assignments[index];

module.exports = { pickTask };