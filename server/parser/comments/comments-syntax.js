const global = require('./global');
const rMethods = require('./randomize-methods');

// globalne promenljive
function commentsSyntax(assignment) {
    let mainArray;


    // funkcija za cuvanje rezultata
    let result = "";
    function logResult(...params) {
        result += params.join(" ") + "\n";
    }

    // dodela paterna
    let jScript = assignment;

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
        function: jScriptOriginal
        // result: finalFunction()
    }
};

module.exports = { commentsSyntax };




















