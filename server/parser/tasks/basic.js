const _ = require('lodash');

let pickTask = (index = _.random(0, assignments.length - 1)) => {

    let assignments = [
        `
        var $a_λS = "str"; // # r0
        var $b_λN = 8; // # r0
        var $c_λN = 8; // # r0
        function $c_λF(){
            var $a = 5;
            var $rnd_λN = 5;
        }
        console.log($a);
        `
    ];

    if (!index) {
        index = _.random(0, assignments.length - 1);
    }


    return assignments[index];
};

module.exports = { pickTask };