Project that was done in collaboration with a colleague during our front-end (JS) training in comtrade. The goal was to build an automated parser that would serve questions which users had to guess the answer to. It was built in NodeJS/Express, MongoDB, JS, HTML5 Canvas, Handlebars... First "real project" i worked on. 

**Parser code randomization** project aims to give options to randomize code while keeping base code valid for code editors. Parsing is done in two main "blocks" of randomization. Comments and Inline. 

Comments randomization deals with all randomization commands behind comments in a specific order as not to brake code:

    randomizeBlocks

    randomizeIfs

    insertObjects

    randomizeRows

    randomizeVars

    randomizeQuotes

    randomizeFunctionCalls

    randomizeMathOperators

    addCustomInline

    shuffleArrayElements

In order for randomization to function properly whole code string is broken to the array of objects where one element is one line of code. Once randomization has been complete, string is made with comments removed and then sent to the Inline parser.

Once Inline parser has finished with randomization. String is validated and parsing is complete.


# Comments syntax

- [ code ] // [ inline randomization ] # [ block/row randomization ] ~ [ custom code ] 

- Example:

                var rubor = 5 + 3; // var # r0 ~ c--66-n-Math.sqrt(9)--

- separators separate syntax on several parts which are then used to parse the code
- everythin before "//" is code moved forward to inline randomization parser
- everything in between "#" and some other separator is part of block/row randomization parser
- everything in between "~" and some other separator is custom parser randomization
- multiple same type randomization are separated by empty space
    example: var x = "awesome code"; // # r0 b1-1

## Inline comments randomization:

### Quotes randomization
- [ code ] // [ quote type ][ quote appearance index ]

    - "//": randomization separator
    - [ quote type ]: it can be either ' or ". arks witch quote type will be cought by parser
    - [ quote appearance index ]: containts integers which mark operator appearance in current line of code. Each number will catch both opening and closing quotes

example: 

        var a = '5' + '5' + '"5"' + '5'; // '03 "0

this example deals with both singe and double quotes. First and last 5 inside quotes will have its quotes randomize to either appear or not. Only double quotes are also cought by "0 and will be randomized by parser. Resulting code might look something like this:

        var a = 5 + '5' + '5' + '5'; // '03 "0


### Var randomization
- [ code ] // [ var ]

    - "//": randomization separator
    - "var": fixed mark

example:

            var x = 5 + 3; // var
    
var inside this code will either appear or not.


### Function call randomization
- [ code ] // ()[ call appearance index ]

    - "//": randomization separator
    - "()": fixed mark
    - [ call appearance index ]: containts integers which mark call appearance in current line of code.

    example:

        var a = functionOne() + functionTwo() // ()1
    
only second call will be randomized by the parser. Resulting code might look like this:

        var a = functionOne() + functionTwo // ()1


### Randomize array elements
- [ code ] // []

    - "//": randomization separator
    - "[]": fixed mark

example:

            var x = [1, 2, 3, 4]; // []
    
it will randomize elements inside array in given line of code


### Math operators randomization:
- [ code ] // +[ operator appearance index ]

    - "//": randomization separator
    - "+": fixed mark
    - [ operator appearance index ]: containts integers which mark operator appearance in current line of code

example:

            var x = 5 + 1 + 2 + 5 + 7; // +03
    
this example will randomize first plus and last plus as marked below:

            var x = 5 "random operator" 1 + 2 + 5 "random operator" 7; // +03


## Row/block randomization:

### Row position randomization
- [ code ] // # r[ row group ]

    - "#": separator type
    - "r": fixed mark
    - [ row group ]: integer type. It will put single row in a group which will have its element`s positions randomized inside a code. Group numbers start from 0 and each new group have to go up by 1.

example:

            var a = 1; // # r0
            var b = 2; // # r1
            var c = 3; // # r1
            var d = 4; // # r0
            var e = 5;
            var f = 6; // # r0

All rows with a group "0" will have its positions randomized with elements of the same group. Same will apply to group "1"


### Block randomization:
- [ code ] // # b[ block height ]-[ block group ]

    - "#": separator type
    - "b": fixed mark
    - [ block height ]: integer type. It marks how many rows counted from above to below block containts. Heigh of 0 will mark only current row. 
    - [ block group ]: integer type. It will put single block in a group which will have its element`s positions randomized inside a code. Group numbers start from 0 and each new group have to go up by 1.

example: 

            var a = 1; // # b3-0
            var b = 2; 
            var c = 3; 
            var d = 4; 
            var e = 5; // # b1-0
            var f = 6;
            var g = 7; 
            var h = 8; // # b0-1
            var i = 9; // # b0-1
    
First block "b3-0" contains 4 rows counted below from first and is in group "0". This means its position will be randomized with first block below it. Same applies to blocks from group "1". Resulting code might look like this: 

            var e = 5; // # b1-0
            var f = 6;
            var g = 7; 
            var a = 1; // # b3-0
            var b = 2; 
            var c = 3; 
            var d = 4; 
            var i = 9; // # b0-1
            var h = 8; // # b0-1

In this example all elements from both groups switched places to new positions. As it is random it could be that output code might look same as input.


### If/else block randomization:
- [ code ] // # if[ block height ]-[ block group ]

    - "#": separator type
    - "if": fixed mark
    - [ block height ]: intiger type. It marks how many rows counted from above to below block containts. Heigh of 0 will mark only current row. 
    - [ block group ]: integer type. It will put single block in a group which will have its element`s positions randomized inside a code while keeping "if" and "if else" prefexes. Only "else" block is omited from this as changing it could make code invalid.
    Group numbers start from 0 and each new group have to go up by 1.

example: 

            if (x === 0) { // # if1-0
                return 1;
            } if else (x === 1) { // # if2-0
                x = x * 2;
                return x;
            } if else (x === 2) { // # if1-0
                return 3;
            } else {
                return "x is too complex"
            };

    
In this example there is one group "0". "Else" block is left as it is while everything else is randomized. Resulting code might look like this:

            if (x === 1) { // # if2-0
                x = x * 2;
                return x;
            } if else (x === 0) { // # if1-0
                return 1;
            } if else (x === 2) { // # if1-0
                return 3;
            } else {
                return "x is too complex"
            };

Resulting code gives two first if blocks swapping places while third if else was left as it was. Else block always remains in its place. If we want to leave some other block from randomization we can simply omit it from the comments parser like this: 

            if (x === 1) {
                x = x * 2;
                return x;
            } if else (x === 0) { // # if1-0
                return 1;
            } if else (x === 2) { // # if1-0
                return 3;
            } else {
                return "x is too complex"
            };


### Object insertion

- in code: $rndObj_1; // # insO_uN3_N3

- in code: $rndObj_[ object index ]
- in comments: // # insO_[ object key type ][ number of keys ]

    - "$rndObj_" - fixed parser command. It will be replaced with random object
    - [ object index ] - index of given object so it can be called later in the code

    - "#" - separator type
    - [ object key type ] - used to insert key values. It can be: 

        N: for random number value
        uN: for random used variable of number type
        uA: random used variable of array type
        uS: random used variable of string type
        uO: random used variable of object type
        uF: random used variable of function type

    - [ number of keys] - used to determine maximum number of keys of given type in object. Minimum is one.

example:

            var b = $rndObj_1; // # insO_uN3_N2

Here. We are creating random object with used 1-3 keys with values of used variables of number type and 1-2 keys with number values. Keys are outputed in format:

- $rnd_ºK[ key type ][ object index]

Output of one key from above example: 
    
        $rnd_ºKN1: 4

Keys created in this fashion can later be called in code using inline syntax mentioned below.


## Custom code:

### Replace code with custom function:

- [ code ] // ~ c--[ replacing code ]--[ disapear ]-[ new code ]--

    - "~": separator type
    - "c--": fixed mark
    - [ code to be replaced ]: exact copy of code we want replaced
    - --[ dissapear ]: it can be "y" or "n" and determines whether old code can be replaced 
    - -[ new code ]--: new custom code to be placed here

example:

            var x = 5; // ~ c--5--y-Math.sqrt(25)--

In this example. Instead of 5 there can be "Math.sqrt(25)".

# Inline Syntax

- $ - prefix is used to get most done in inline syntax and make code valid for editors

- º - sign is used to separate commands

- _ - sign is used to separate commands

## Variable name and type:

### Single variable names:

- $[ a-z ]

    - $ - command prefix
    - [ a-z ] - letters from "a" to "z" used to tie parser to keep randomly assign name to this variable

example:

            var $a = 5;
            var c = $a + $a;

In this example variable $a will be assigned random name and its value will be kept throught rest of the code. Other variable names will remain unchanged. Possible output can be:

            var ipsum = 5;
            var c = ipsum + ipsum;

### Variable type:

- [ variable name ]_º[ variable type ]
    - [ variable name ]: name of the variable. Example: $a
    - "_º" - fixed command separator
    - [ variable type ]: this tells parser to keep this variable in a pool of its type so it could later be called. Types are: 
        - "O" - object
        - "N" - number
        - "S" - string
        - "A" - array
        - "F" - function

example: 

            var $a_ºN = 5;
            var $b_ºN = 10;

Here, parser will make number type array of variables $a and $b. They can later be called with $used syntax.

### Random variable:

- $rnd_º[ variable type ]

    - $rnd - fixed prefix
    - [ variable type ] - single upper case letter. It singles type of used variable in the code above from which random variable name will be pulled. Types are:
        - "O" - object
        - "N" - number
        - "S" - string
        - "A" - array
        - "F" - function
        - "K" - object key 

$rnd can be used insted of letters for greater randomization while writting the code. Same variable name will never appear twice in code while using this method. Variables defined in this fashion can only be called through $used syntax.

example: 

            var $rnd_ºS = 'ipsum';
            var $rnd_ºS = 'lorem';
            var $rnd = $used_ºS + " " + $used_ºS;

In this example variables are type string and can only be called through $used_ºS syntax.

## Variable calls:

### Calling random variables with $used:

- $used_º[ variable type ]

    - "$used_º" - fixed prefix
    - [ variable type ] - single upper case letter. It singles type of used variable in the code above from which random variable name will be pulled. Types are:
        - "O" - object
        - "N" - number
        - "S" - string
        - "A" - array
        - "F" - function
        - "K" - object key

example: 

            var $a_ºA = [1, 2];
            var $b_ºA = [3, 4];
            var $c = $used_ºA + $used_ºA;

Here, in place of $used_ºA can appear either first or second variable above. One of the possible outputs can be:

            var $a_ºA = [1, 2];
            var $b_ºA = [3, 4];
            var $c = $a + $a;

### $used with object keys:

If we want to pull random keys from object we need to define object in the following way:

- [ variable name ]_ºO[ object index ]

    - [ variable name ] - name of the object variable
    - "_ºO" - fixed parser command
    - [ object index ] - index of object

And we need ot define keys as follows:

- [ object key name]_ºK[ key type ]

    - [ object key name] - name of object key
    - "_ºK" - fixed parser command
    - [ key type ] - type of object key. Single upper case letter. It can be: 
        - "O" - object
        - "N" - number
        - "S" - string
        - "A" - array
        - "F" - function


example: 

        var $f_ºO1 = {
            $c_ºKN1: $num,
            $d_ºKN1: $num,
            $e_ºKN1: $num
        };
        var $a = $used_ºO1.N;

Here, we variable $a will receive value of random key from object $f.

## Inline insertions:

### Insert random number value:

- $num

    - $num - fixed command: Inserts random number in its place.

example: 

            var $a = $num;

In this example, variable $a will be given random whole intiger value.

### Insert random number with border values:

- $[ first value ]_[ second value ]

    - $ - fixed parser command.
    - [ first value ] - positive or negative intiger. If there is no second number parser will provide random number from 0 to this value.
    - _ - fixed parser command: used only if we want to add second border top value
    - [ second value ] - positive or negative intiger. Used as a top border value. It is included.

example: 

            var $a = $num;

In this example, variable $a will be given random whole intiger value.

### Insert random array:

- [ array commands separated by comma ]
    - $num[ amount of number elements ]: It tells parser to insert two random numbers in the array. $num2 will insert two random number elements to the array.
    - $used_º[ type ]x[ amount of elements]: It works same as $used command. It will randomly pick used variables of that type. "x" followed by number will tell parser how many random elements to put inside array. Same element can appear more times.

example: 

            var $a_ºN = 1;
            var $b_ºN = 2;
            var $c_ºA = ['lorem', $used_ºNx4];

Here, output of array $c will have 5 elements. First one will be 'lorem' and others will be either $a or $b.

### Insert random string:

- $str
    - $str - fixed parser command. All instances of this string will be replaced with "foo", "bar", "baz" and so forth randomly. No same string value will appear unless all of names have been used. 

example: 


            var $a_ºS = $str;
            var $b_ºS = $str;
            var $c_ºS = $str;
            console.log($used_ºS);

In this example all variables will randomly be assigned strings. Console log will pick one of them randomly as they have all been classified as string above. 
