const global = require('./global');
const rMethods = require('./randomize-methods');

// globalne promenljive
function commentsSyntax() {
    let keys,
        selectedKeys,
        mainArray;

    // imena varijabli
    let variableNames = [
        {
            a: "alpha",
            b: "beta",
            c: "gama",
            d: "delta",
            e: "epsilon"
        },
        {
            a: "first",
            b: "second",
            c: "third",
            d: "fourth",
            e: "fifth"
        }
    ];

    // ^.*\/\/

    // paterni za za zadatke
    let jsPatterns = [
        {
            string: `
        var x, y;
        if (true) { // # if2-0
            var x = 1;
            var y = 2;
        } else if (false) { // # if3-0
            var x = 1;
            var y = 2;
            var z = 3;
        } else if (1) { // # if3-0
            var xxx = 1;
            var yyy = 2;
            var zzz = 3;
        } else {
            console.log("x");
        }
        `
        },
        {
            string: `
        var x, y;
        if (true) { // # if2-0 b13-0 ~ c--true--n-Math.sqrt(25)--
            var x = 1;
            var y = 2;
        } else if (false) { // # if3-0
            var x = 1;
            var y = 2;
            var z = 3;
        } else if (1) { // # if3-0
            var xxx = 1;
            var yyy = 2;
            var zzz = 3;
        } else {
            console.log("x");
        }
        if (true) { // # if2-1 b13-0 ~ c--true--n-Math.sqrt(25)--
            x = 1; // var # p0
            y = 2; // var # p0
        } else if (false) { // # if3-1
            var x = 1;
            var y = 2;
            var z = 3;
        } else if (1) { // # if3-1
            var xxx = 1;
            var yyy = 2;
            var zzz = 3;
        } else {
            console.log("y");
        }
        `
        },
        {
            string: `
        var niz=[2,9,15,23]; // []
        var niz2=[000,000,000,000]; // []
        var x = 000;
        var y = 000;
        console.log(niz);
        `
        },
        {
            string: `
    var a=5; // # r0
    var b=7;
    var c=9; // # r0
    console.log('ovo je 5','555'); // ~ c--555--n-Math.sqrt(25)--
        `
        },
        {
            string: `
    var a = 000;
    if (a < 0) { // # if1-0
        console.log("minus");
    } else if (a === 2) { // # if1-0
        console.log("second");
    } else {
        console.log("third");
    }
        `
        },
        {
            string: `
    var lorem = 7;
    var ipsum = 100;
    var dolor= (function() {
        lorem = 4;
        ipsum = 5;
        console.log("lorem", lorem, "ipsum", ipsum);
        var rubor=sit()[0]();
        console.log("lorem", lorem, "ipsum", ipsum);
        function sit() {
            lorem = 6; // var
            ipsum = 12;
            console.log("lorem", lorem, "ipsum", ipsum);
            return [function() { // # ret4-n-A
                var lorem = 9;
                var ipsum = 8;
                console.log("lorem", lorem, "ipsum", ipsum);
            }];
        }
    
        return sit();
    })();
        `,
            vars: ["a", "b", "c", "d", "e"]
        }
    ];

    // funkcija za cuvanje rezultata
    let result = "";
    function logResult(...params) {
        result += params.join(" ") + "\n";
    }

    // dodela paterna
    let jScript = jsPatterns[0].string;

    // pravljenje niza redova
    mainArray = global.makeCodeArray(jScript);


    ///////////  blok randomization //////////////////////

    mainArray = rMethods.randomizeBlocks(mainArray);

    mainArray = rMethods.randomizeIfs(mainArray);

    mainArray = rMethods.randomizeReturns(mainArray);

    mainArray = rMethods.randomizeRows(mainArray);


    /////////// inline randomization //////////////////////

    mainArray = rMethods.randomizeVars(mainArray);

    mainArray = rMethods.randomizeMathOperators(mainArray);

    mainArray = rMethods.addCustomInline(mainArray);

    mainArray = rMethods.shuffleArrayElements(mainArray);

    mainArray = rMethods.randomizeIntigers(mainArray);


    /////////// sklapanje patterna /////////////////////
    jScript = "";
    mainArray.forEach(element => {
        jScript += element.code + "\n";
    });

    // obradjeni patern za prikaz korisniku
    let jScriptOriginal = jScript;
    jScript = 'let result = "";\n' + jScript;

    // dodela return-a
    jScript = jScript.replace(/console.log/g, "logResult");
    jScript += `function logResult(...params) {
                result += params.join(" ") + '\\n';
            }
            return result;`;

    // kreiranje funkcije

    let finalFunction = new Function(jScript);

    //prikaz rezultata i paterna za korisnika
    // console.log(jScriptOriginal);
    // console.log(finalFunction());

    return {
        code: jScriptOriginal,
        result: finalFunction()
    }
};

module.exports = { commentsSyntax };




















