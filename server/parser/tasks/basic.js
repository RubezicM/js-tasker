const _ = require('lodash');

let pickTask = (index = _.random(0, assignments.length - 1)) => {

    let assignments = [
        `
        var $a_λS = "str"; 
        var $b_λN = 8; 
        var $c_λN = 8; 
        function $c_λF(){
            var $a = 5;
            var $rnd_λN = 5;
        }
        console.log($a);
        `,
        `
        var $a_λN = $num;
        var $b_λN = $num;
        var $c_λN = $num;
        console.log($used_λN);
        `
    ];

    if (!index) {
        index = _.random(0, assignments.length - 1);
    }


    return assignments[index];
};

module.exports = { pickTask };