* Comments syntax

    - [ code ] // [ inline randomization ] # [ block/row randomization ] ~ [ custom code ] 
    - Example:

                    var rubor = 5 + 3; // var # r0 ~ c--66-n-Math.sqrt(9)--

    - Separators separate syntax on several parts which are then used to parse the code
    - everythin before "//" is code moved forward to inline randomization parser
    - everything in between "#" and some other separator is part of block/row randomization parser
    - everything in between "~" and some other separator is custom parser randomization
    - multiple same type randomization are separated by empty space
        example: var x = "awesome code"; // # r0 b1-1

* Inline comments randomization:

    - var randomization
        - [ code ] // [ var ]
            - "//": randomization separator
            - "var": fixed mark

        example:

                    var x = 5 + 3; // var
            
        var u kodu ce se ili pojaviti ili ne svaki put kada stoji "var" u inline bloku

    
    - Math operators randomization:
        - [ code ] // +[ operator appearance index ]
            - "//": randomization separator
            - "+": fixed mark
            - [ operator appearance index ]: containts integers which mark operator appearance in current line of code

        example:

                    var x = 5 + 1 + 2 + 5 + 7; // +03
            
        this example will randomize first plus and last plus as marked below:

                    var x = 5 "random operator" 1 + 2 + 5 "random operator" 7; // +03


* Row/block randomization:

    - Row position randomization
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
    

    - Zamena pozicija blokova:
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


    - if/else block randomization:
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


* Custom code:

    - Replace code with custom function:
        - [ code ] // ~ c--[ replacing code ]--[ disapear ]-[ new code ]--

            - "~": separator type
            - "c--": fixed mark
            - [ code to be replaced ]: exact copy of code we want replaced
            - --[ dissapear ]: it can be "y" or "n" and determines whether old code can be replaced 
            - -[ new code ]--: new custom code to be placed here

        example:

                    var x = 5; // ~ c--5--y-Math.sqrt(25)--

        In this example. Instead of 5 there can be "Math.sqrt(25)".