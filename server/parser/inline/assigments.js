function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};


var assigment = [
    `var $a_λN = $num;
    var $b_λN = $num;
    var $c_λN = $num;
    var $rnd_λN = $num;
    var $rnd_λF = (function (){
        $rdc_λN = $num;
        $rdc_$b = $num;
        console.log("$a", $a, "$c", $c);
        var $rnd_V = $g()[0]();
        $rdc_λN = $num;
        var $rnd_λN = $num;
        console.log("$a", $a, "$b", $b);
        function $g_λF() {
            $rdc_$a = $num;
            $rdc_$b = $num;
            console.log("$a", $a, "$b", $b);
            return [function(){
                $rdc_$a = $num;
                $rdc_$b = $num;
                console.log("$a", $a, "$b", $b);
            }]
        }
        return $g_λF();
    })();`,
    `
   var $a_λS = "str";
   var $b_λN = $num;
   console.log($a + $b)
   function $c_λF(){
       var $a = $num;
       var $rnd_λN = $num;
   }
   $c;
   `,
    `var $a, $b;
   if (true) { // # if2-0 b13-0 ~ c--true--n-Math.sqrt(25)--
       var $a = $num;
       var $b = $num;
   } else if (false) { // # if3-0
       var $a = $num;
       var $c = $num;
       var $d = $num;
   } else if (1) { // # if3-0
       var $rnd_λN  = $num;
       var $rnd_λN  = $num;
       var $rnd_λN  = $num;
   } else {
       console.log("x");
   }
   if (true) { // # if2-1 b13-0 ~ c--true--n-Math.sqrt(25)--
       $rdc_$a = $num; // var # p0
       $rdc_$b = $num; // var # p0
   } else if (false) { // # if3-1
       var $a = 1;
       var $b = 2;
       var $d = 3;
   } else if (1) { // # if3-1
       $rdc_λN = 1;
       $rdc_λN = 2;
        $rdc_λN = 3;
   } else {
       console.log("y");
   }`,
    `
  var $a_λO = {
    $b_λNK:$num,
    $c_λNK:$num,
    $g_λO:{
        $rnd_λNK:$num,
        $h_λFK:function(){
        $a.$b = $num;
        return $a.$b * 2
           }
         }         
      }
      
      
      console.log("$a.$b",$a.$b,"$a.$g",$a.$g.$h)
   `,
    `var $a = [$num,$num,$num]
        $a.push($num,$num);
        var $b = $num;
        function $d_λF(){
            $rdc_$b = $a[3];
        }
        $d();
        var $c_λN = $num;
        $rnd_V = $num;
        var $g = $b + $used_V;
        console.log("$g",$g);
        console.log("$b * $c",$b * $c)
   `
];


let currentAssigment = assigment[1/*random(0, assigment.length - 1)*/];

module.exports = {
    currentAssigment
}