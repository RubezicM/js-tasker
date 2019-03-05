const global = require('./global');
const rMethods = require('./randomize-methods');

function commentsSyntax(assignment) {
    let mainArray;

    let result = "";
    function logResult(...params) {
        result += params.join(" ") + "\n";
    }

    let jScript = assignment;

    mainArray = global.makeCodeArray(jScript);


    ///////////  blok randomization //////////////////////

    mainArray = rMethods.randomizeBlocks(mainArray);

    mainArray = rMethods.randomizeIfs(mainArray);

    mainArray = rMethods.randomizeReturns(mainArray);

    mainArray = rMethods.insertObjects(mainArray);

    mainArray = rMethods.randomizeRows(mainArray);

    /////////// inline randomization //////////////////////

    mainArray = rMethods.randomizeVars(mainArray);

    mainArray = rMethods.randomizeQuotes(mainArray);

    mainArray = rMethods.randomizeFunctionCalls(mainArray);

    mainArray = rMethods.randomizeMathOperators(mainArray);

    mainArray = rMethods.addCustomInline(mainArray);

    mainArray = rMethods.shuffleArrayElements(mainArray);

    /////////// pattern compile /////////////////////

    jScript = "";
    mainArray.forEach(element => {
        jScript += element.code + "\n";
    });

    let jScriptOriginal = jScript;
    jScript = 'let result = "";\n' + jScript;

    jScript = jScript.replace(/console.log/g, "logResult");
    jScript += `function logResult(...params) {
                result += params.join(" ") + '\\n';
            }
            return result;`;

    console.log(jScriptOriginal);

    return {
        function: jScriptOriginal
    };
};

module.exports = { commentsSyntax };




















