const _ = require("lodash");

let assignments = [
  `
    var a = $num;
    {
    var a = $num; // var
    }
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
    `, `
    var $a_ºA = ['a', '1']; // []
    var $b_ºA = ['b', '2']; // []
    var $c_ºA = ['c', '3']; // []
    console.log($used_ºA.concat($used_ºA));
    `, `
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
    `, `
    var $a_ºN = '$num';
    var $b_ºN = $num;
    var $c_ºN = $num;
    $used_ºN = 5;
    console.log($used_ºN);
    `, `
    function $a($b_ºP, $c_ºP) {
        console.log($used_ºP);
    };
    $a(1, 3);
    `, `
    var $rnd_ºN = $num;
    console.log($used_ºN);
    `, `
    function test() {
        return // # ret-O
    };`, `
    var $a_ºN = $num;
    var $b_ºO1 = $rndObj_1; // # insO_uN1
    `, `
    var $a_ºA = ["str",23,"broj","12",$num2,"str",$num3];
    var $rnd_ºN = $num;
    var $rnd_ºN = $num;
    var $rnd_ºN = $num;
    var $b_ºA = [];
    var $c_ºA = [$used_ºN1,$num3];
    var $d = [$used_ºN3];
    $c.push($d);
    console.log($c);
    `, `
    var $a_ºA = [];
    var $rnd_ºN = $num;
    var $rnd_ºN = $num;
    var $rnd_ºN = $num;
    var $b_ºA = [];
    var $c_ºA = [$used_ºN1,$num2];
    var $d = [$used_ºN2];
    $c.push($d);
    console.log($c);
    `, `
    var $g_ºN = $num;
    var $h_ºN = $num;
    var $k_ºN = $num;
    var $a_ºO1 = {
        $a_ºKN1: $num
    };
    $used_ºN = $num;
    $rnd_ºN = $num;
    `, `
    var $a_ºN = $num;
    var $rnd_ºN = $num;
    var $used_ºN = $num; // var
    `, `
    var $rnd_ºN = $num;
    var $rnd_ºN = $num;
    var $b_ºA = [$used_ºNx2];
    var $g_ºA = ["str","foo",23];
    var $c_ºA = [$num4,$used_ºNx2];
    $var $d_ºN = $num;
    $var $used_ºN = $num;
    console.log($b[0],$c[2]);
    `, `
     var $rnd_ºN = $num;
     var $used_ºN = $num; // var
     var $used_ºN = $num;
     var $a_ºN = $num;
     var $g_ºN = $num;
     var $b_ºS = $str;
     console.log($used_ºN + $a);
    `, `
      var $a_ºO1 = {
      $rnd_ºKN1 : $num,
      $rnd_ºKF1 : () => {
        console.log("hello");
      },
      $c_ºKF1 : () => {
        console.log("Hey");
      }
    }
      var $b_ºN = $num;
      var $rnd_ºN = $num;
      console.log($used_ºO1.N)
      console.log($used_ºO1.F())
      console.log($a.$c())
    `, `
     var $a_ºO1 = {};
     var $rnd_ºN = $num;
     var $b_ºO2 = {
       $rnd_ºKN2 : $num
     }
     console.log($used_ºO2.N);
    `, `
       var $h_ºN = $num;
      var $a_ºO1 = {
       $rnd_ºKN1: $num,
       $rnd_ºKN1: $num,
       $b_ºKF1: () => {
         console.log("hello")
       }
    };
    $used_ºO1.N;
    $a.$b();
    `, `
      var $rnd_ºO1 = {
      $rnd_ºKN1 : $num
    }
    console.log($used_ºO1.N)
    `, `
        var $a_ºO1 = {   // # b3-0
        $b_ºKS1: 'x',
        $c_ºKS1: 'y'
    };
        var $d_ºO2 = {   // # b3-0
        $b_ºKN2: 1,
        $c_ºKN2: 2
    };
    console.log($used_ºO2.N);
    `, `     
    var $a_ºN = 5;
    var $b_ºN = 10;
    var $d_ºA = [1, 2, 3];
    var $c = [$used_ºN, $used_ºN, $d[0], $b]; // []
    console.log($c[2]);`, `      
    var $rnd_ºN = $num;
    var $used_ºN = $num; // var
    var $used_ºN = $num;
    var $a_ºN = $num;
    var $g_ºN = $num;
    console.log($used_ºN + $a);
    `, `
    var $a_ºN = 5;
    var $b_ºN = 10;
    var $d_ºA = [1, 2, 3];
    var $c = [$used_ºN, $used_ºN, $d[0], $b]; // []
    console.log($c[1]);
    `, `
    function $a_ºF() {
      console.log(11);
    };
    $used_ºF() + $used_ºF(); // ()1
    `, `
    function $b() {
      return 5;
    }
    var $a = 5;
    {
      var $a = $b() + $b() // var ()1
    };
    console.log($a);
    `, `
    var $a = '5' + '5' + '"5"' + '5'; // '03 "0
    console.log($a);
    `,
  `var $rnd_ºN = $num;
    var $rnd_ºN = $num;
    var $b_ºA = [$used_ºNx2];
    var $g_ºA = ["str","foo",23];
    var $c_ºA = [$num4,$used_ºNx2];
    $var $d_ºN = $num;
    $var $used_ºN = $num;
    console.log($b[0],$c[2]);
    `, `
    var $a_ºN = 5;
    var $b_ºN = 10;
    var $d_ºA = [1, 2, 3];
    var $c = [$used_ºN, $used_ºN, $d[0], $b]; // []
    console.log($c[2]);`, `
    var $rnd_ºN = $num;
    var $used_ºN = $num; // var
    var $used_ºN = $num;
    var $a_ºN = $num;
    var $g_ºN = $num;
    console.log($used_ºN + $a);
    `, `
    var $a_ºN = 5;
    var $b_ºN = 10;
    var $d_ºA = [1, 2, 3];
    var $c = [$used_ºN, $used_ºN, $d[0], $b]; // []
    console.log($c[1]);
    `, `
    function $a_ºF() {
      console.log(11);
    };
    $used_ºF() + $used_ºF(); // ()1
    `, `
    function $b() {
      return 5;
    }
    var $a = 5;
    {
      var $a = $b() + $b() // var ()1
    };
    console.log($a);
    `, `
    var $a = '5' + '5' + '"5"' + '5'; // '03 "0
    console.log($a);
    `, `
    var $a = 1;
    var $rnd_ºN = $num;
    var $rnd_ºN = $num;
    var $b_ºA = [$used_ºNx2];
    var $g_ºA = ["str","foo",23,$a];
    var $c_ºA = [$num4,$used_ºNx2,222];
    var $d_ºN = $num; // var
    var $used_ºN = $num; // var
    console.log($b[0],$c[2]);
    `, `
    var $a_ºN = $num; // # r0
    var $b_ºN = $num; // # r0
    var $c_ºA = [$a, $b]; // []
    console.log($c[0]);
    `, `
    var $h_ºN = $num;
    var $a_ºO1 = {
        $rnd_ºKN1: $num,
        $rnd_ºKN1: $num,
        $b_ºKF1: () => {
          console.log("hello")
        }
    };
    $used_ºO1.F()
    var $g_ºO2 = {
      $rnd_ºKN2: $num,
      $rnd_ºKN2: $num
    }
    console.log($used_ºO2.N);
    `, `
    var $b_ºN = 4;
    var $a_ºO1 = {
    $rnd_ºKN1: $used_ºN,
    $rnd_ºKS1: 'foo',
    $rnd_ºKS1: 'bar'
  };
  var $f_ºO2 = {
    $c_ºKN2: $num,
    $d_ºKN2: $num,
    $e_ºKN2: $num,
  }
  console.log($used_ºO2.N);
  `, `
  var $a_ºN = 4;
  var $b_ºO1 = $rndObj_1; // # insO_uN3_N3
  console.log($used_ºO1.N);
  `, `
  var $a = $num; // # r0
  var $b = []; // # r0
  for (var i = $num - $num; i < $a; i++) {
      if (i % 2 === 0) {
        $b.push(i);
      };
  };
  console.log($b[1]);
    `, `
    var $a_ºN = $num; // # r0
    var $b_ºN = $num; // # r0
    var $c_ºN = $num; // # r0
    var $d_ºA = [$used_ºNx2, $num]; // []
    $used_ºA.push($used_ºN);
    console.log($d[$d.length - $num]);
    `,`
      var $a_ºS = $str;
      var $b_ºS = $str;
      var $c_ºS = $str;
      console.log($used_ºS);
    `,`
    var $a_ºN = $num; 
    var $d = [];
    var $b_ºN = '$num' + $1_2; // '0 # b1-0 r0
    var $c_ºN = $num; // # r0
    for (var i = $1_3; i < 5; i++) { // # b3-0
      $used_ºN++; // # r1
      $d.push($used_ºN); // # r1
    };
    console.log($d[$1]);
    `,`
    var $a_ºA = [$str, $str, $num, $str, $num]; // [] # r0
    var $b = '$num'; // '0 # r0

    $a.forEach(function(item, index, array) {

      if (index % $2_3 && index !== 0) { // # b2-0
        var $b = $str; // var 
      };

      $b = $b + item; // # b0-0

    });

    $b = $b.toString(); //

    console.log($b.slice(0, $1_3)); //
    `,`
    var $a_ºA = [$str, $str]; // # b0-0

    var $b_ºO1 = { // # b4-0
      $rnd_ºKS1: false, // # r1
      $rnd_ºKS1: true, // # r1
      $rnd_ºKS1: $str
    };

    $a.push($used_ºO1.S); // # r0
    $a.shift($used_ºO1.S); // # r0 ~ c--shift--y-pop--
    $a.unshift($used_ºO1.S); // # r0
    $a.pop($used_ºO1.S); // # r0 ~ c--pop--y-shift--

    console.log($a[$1]);
    `,`
    var $a_ºA = [$str, $num]; // []
    var $b_ºA = [$num, $str]; // []
    var $c_ºA = [$num, $str]; // []

    $used_ºA = $used_ºA.concat($used_ºA);
    var $d = $used_ºA.splice($1, $1_2, $used_ºA[$1]) - $used_ºA;

    console.log($d[$8]);
    `,`
    var $a = [$str, $str, $num, $str]; // []

    $a.reverse();

    var $b_ºO1 = {
      $c_ºKS1: $num, // # b0-0
      $d_ºKS1: $a[$3], // # b0-0
      $rnd_ºKF1: function () { // # b3-0
          this.$c++;
          return this.$c + this.$d; // +0
      },
      $rnd_ºKF1: function () { // # b2-0
        return $a.push(this.$d[0]) // +0
      },
    };

    $used_ºO1.F(); // # r0
    
    $used_ºO1.F(); // # r0

    console.log($used_ºO1.S); // # r0
    `
];




// let pickTask = (index = _.random(0, assignments.length - 1)) => assignments[index];

let pickTask = (index = assignments.length - 1) => assignments[index];

// pickTask = (index = 17) => assignments[index];

module.exports = { pickTask, assignments };