const _ = require("lodash");

let assignments = [
  `
    var $a = $num;

    {
    var $a = $num; // var
    };

    var $b_ºN = $num; // # r0
    var $c_ºN = $str; // # r0

    console.log($used_ºN + $used_ºN); // +0
    `, `
    var $a_ºN = '"$num"';   // '0 "0 # r0
    var $b_ºN = '"$num"';   // '0 "0 # r0
    var $c_ºN = "'$num'";   // '0 "0 # r0

    console.log($used_ºN);
    `, `
    var $a_ºS = $str;
    var $b_ºS = $str;
    var $c_ºS = $str;

    console.log($used_ºS + $used_ºS); // +0
    `, `
    var $a_ºA = [$str, '$num']; // [] // # r0
    var $b_ºA = [$str, '$num']; // [] // # r0
    var $c_ºA = [$str, '$num']; // [] // # r0

    console.log($used_ºA.concat($used_ºA));
    `, `
    var $a_ºN = $num; // # r0
    var $b_ºN = $num; // # r0
    var $c = 0; // # r0
    for (i = 0; i < $used_ºN; ++i) {
        ++$c;
        if (i === $used_ºN - $1_3) {
            $c += 1;
        };
    };

    console.log($c);
    `, `
    var $a_ºN = '$num';
    var $b_ºN = $num;
    var $c_ºN = $num;

    $used_ºN = $num;

    console.log($used_ºN);
    `, `
    function $a($b_ºP, $c_ºP) {
        console.log($used_ºP);
    };

    $a(1, 3);
    `, `
    var $a_ºA = ["str",23,"broj","12",$num2,"str",$num3];
    var $rnd_ºN = $num;
    var $rnd_ºN = $num;
    var $rnd_ºN = $num;
    var $b_ºA = [];
    var $c_ºA = [$used_ºN1, $num3]; // []
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

    console.log($rnd_ºN = $num);
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
     var $a_ºN = $num;
     var $g_ºN = $num;
     var $b_ºS = $str;

     console.log($used_ºN + $a);
    `, `
    var $a_ºO1 = {
    $rnd_ºKN1 : $num,
    $rnd_ºKF1 : () => {
      console.log($str);
    },
    $c_ºKF1 : () => {
      console.log($str);
      }
    };

    var $b_ºN = $num;
    var $rnd_ºN = $num;
    
    console.log($used_ºO1.N);
    `, `
    var $a_ºO1 = {};
    var $rnd_ºN = $num;
    var $b_ºO2 = {
      $rnd_ºKN2 : $num
    };

    console.log($used_ºO2.N);
    `, `
    var $h_ºN = $num;
    var $a_ºO1 = {
      $rnd_ºKN1: $num,
      $rnd_ºKN1: $num,
      $b_ºKF1: () => {
        console.log($str);
      }
    };

    $used_ºO1.N;
    $a.$b();
    `, `
    var $rnd_ºO1 = {
      $rnd_ºKN1 : $num
    };

    console.log($used_ºO1.N)
    `, `
    var $a_ºO1 = {   // # b3-0
      $b_ºKS1: $str,
      $c_ºKS1: $str
    };

    var $d_ºO2 = {   // # b3-0
      $b_ºKN2: 1,
      $c_ºKN2: 2
    };

    console.log($used_ºO2.N);
    `, `      
    var $c_ºN = $num;
    var $a_ºN = $0_4 + --$c; // #r0
    var $g_ºN = ++$c; // #r0

    console.log($used_ºN + $used_ºN);
    `, `
    var $a_ºN = $num;
    var $b_ºN = $num;
    var $d_ºA = [$num, $num, $num];
    var $c = [$used_ºN, $used_ºN, $d[0], $b]; // []

    console.log($c[$0_2]);
    `, `
    function $b() {
      return $num;
    };

    var $a = $num;

    {
      var $a = $b() + $b() // var
    };

    console.log($a);
    `, `
    var $a = '$num' + '$num' + '"$num"' + '$num'; // '03 "0

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
    var $a_ºN = $num;
    var $b_ºN = $num;
    var $d_ºA = [$num, $num, $num];
    var $c = [$used_ºN, $used_ºN, $d[0], $b]; // []

    console.log($c[2]);`, `
    var $rnd_ºN = $num;
    var $used_ºN = $num; // var
    var $used_ºN = $num;
    var $a_ºN = $num;
    var $g_ºN = $num;

    console.log($used_ºN + $a);
    `, `
    var $a_ºN = $num;
    var $b_ºN = $num;
    var $d_ºA = [$num, $num, $num];
    var $c = [$used_ºN, $used_ºN, $d[0], $b]; // []

    console.log($c[1]);
    `, `
    function $a_ºF() {
      console.log(11);
    };

    $used_ºF() + $used_ºF(); // ()1
    `, `
    function $b() {
      return $num;
    }
    var $a = $num;
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
    };

    console.log($used_ºO2.N);
    `, `
  var $b_ºN = 4;
  var $a_ºO1 = {
  $rnd_ºKN1: $used_ºN,
  $rnd_ºKS1: $str,
  $rnd_ºKS1: $str
  };

  var $f_ºO2 = {
    $c_ºKN2: $num,
    $d_ºKN2: $num,
    $e_ºKN2: $num,
  };

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
      var $a_ºS = "$num"; // "0
      var $b_ºS = "$num"; // "0
      var $c_ºS = "$num"; // "0

      console.log($used_ºS + $used_ºS); // +0
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
    `,
    `
    var $a = $num;
    var $b = $a--;

    console.log($b + $a); // +0
    `,
    `
    var $a = ["$num", "$num", "$num"]; // "012
    var $b = [$0_2 + $0_2 + $0_2]; // +01

    console.log($b);
    `,
    `
    function $c(a, b) {
      return (a > b ? a : b);
    };

    [$a_ºN, $b_ºN] = [$num, $num];

    console.log($c($used_ºN, $used_ºN));
    `,

    `
    var $a_ºN = $num; // # r0
    var $b_ºN = $num; // # r0

    $a = Math.floor($used_ºN / $2_3); // ~ c--Math.floor--y-Math.ceil--

    console.log($used_ºN);
    `,
    `
    var $a = function() { // # b2-0
      var $a;
    };

    var $c = $str + $str; // # b0-0

    if (typeof $a === typeof $a()) { // # if1-0
      console.log($str);
    } else if (typeof $a === typeof($c)) { // # if1-0
      console.log($str);
    } else {
      console.log($str);
    };

    $a();
    `,
    `
    var $a = [$num, $str]; // [] # r0
    var $b = [$num]; // [] # r0

    var $c = $a.concat($b.concat($a));

    console.log($c.length);
    `,
    `
    var $a = $num;

    function $g(i) {
      console.log(++i + $a); // +2
    };

    $g($a);
    `,
    `
    var $b = 5;
    var $g = $b * $1-2 * $1-3 + $1-3; // +0

    console.log($g % 6);
    `,
    `
    var $a = $num;
    var $b = $a++;

    console.log($a++ + $b--); // +0
    `,
    `
    var $a_ºN = $num;
    var $b_ºN = $a + $num;

    function $g_ºF(x) {
      var $used_ºN = $num + x; // var
    };

    $a = $g($used_ºN);

    console.log($a);
    `,
    `
    var $a_ºN = $num; // # r0
    var $c_ºN = $num; // # r0
    var $b_ºN = $num; // # r0

    var $g = $used_ºN % $used_ºN + $1_2; // 0+

    console.log($g % $4_6);
    `,
    `
    var $a = typeof( Boolean("$num") );

    console.log($a);
    `,
    `
    var $a = 0;
    for (var i = $a; i <  $1_3; i++) { //
      $a--; // # r0
      for (var j =  $1 + $a; j <= $2_3; j++) { // +0
        $a++; // # r0
      };
    };

    console.log($a);
    `,
    `
    var $a_ºA = [$num,$num,$str]; // []
    var $b_ºA = [$num,$num,$str]; // []
    $used_ºA[$0_2] = $num;

    console.log($used_ºA[$0_2]);
    `,
    `
    var $a = $num;
    var $c = $a % $4_6;
    $a -= $c % $a;

    console.log($a);
    `,
    `
    console.log($1_3 + true + $1_3 + false); // +01
    `,
    `
    var $a = $num;
    if ($a !== $num) { // # if1-0
      console.log("a");
    } else if($a > $num){ // # if1-0
      console.log("$b");
    } else {
      console.log($b + $num); // +0
    };
    `,
    `
    var $a = $0_2; // # r0
    var $b = $1_3; // # r0
    if ($a > $b) { // # if1-0
      $a = $b;
    } else if ($a === $b) { // # if1-0
      $b = $a + $a;
    } else {
      $b = $num;
    };

    console.log(Math.sqrt($a * $b));
    `,
    `
    $a = $num;

    if ("$a" != "$a") { // "01
      console.log($num);
    } else {
      console.log($str);
    };
    `
    ,
    `
    $a_ºS = $str; // # r0
    $b_ºS = $str; // # r0

    function $c_ºF(a, b) { // # b2-0
      return $used_ºS.length + $used_ºS.length; // +0
    };

    function $d_ºF(a, b) { // # b2-0
      return false || $used_ºS.lastIndexOf('o') // +0 ~ c--false--y-true--
    };

    console.log($used_ºF($used_ºS, $used_ºS) + $used_ºF($used_ºS, $used_ºS));
    `

];

 let pickTask = (index = _.random(0, assignments.length - 1)) => assignments[index];

// let pickTask = (index = assignments.length - 1) => assignments[index];

// pickTask = (index = 17) => assignments[index];

module.exports = { pickTask, assignments };