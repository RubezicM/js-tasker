const global = require('./global');
const _ = require('lodash');

////// temp arrays /////

const objects = [
    `{
        x: "ff"
    }`
    /*
    `{
        s: "ppppp",
        t: {
            f: "s"
        },
        k: "asdasd"
    };`,
    */
];

const arrays = [
    `[1, 2, 3]`,
    `["a", "b", "c"]`
];

/////////////// global variables ////////////////////////

const mathOperators = ["+", "-", "*"];

/////////// row/block funkcije /////////////////////

function noteBlocks(mainArr) {
    mainArr = global.cloneObject(mainArr);
    let blocksArray = [];
    for (let i = 0; i < mainArr.length; i++) {
        if (mainArr[i].rows) {
            let match = mainArr[i].rows.match(/b([0-9]+)-([0-9]+)/);
            if (match) {
                if (blocksArray[parseInt(match[2])] === undefined) {
                    blocksArray[parseInt(match[2])] = [];
                }
                blocksArray[parseInt(match[2])].push({
                    index: i,
                    height: parseInt(match[1]),
                    type: parseInt(match[2]),
                    code: global.codeBlock(i, parseInt(match[1]), mainArr)
                });
            };
        };
    };
    return blocksArray;
};

function randomizeBlocks(mainArr) {
    mainArr = global.cloneObject(mainArr);
    let blocksArray = noteBlocks(mainArr);
    let randomBlocks = noteBlocks(mainArr);
    for (let i = 0; i < randomBlocks.length; i++) {
        randomBlocks[i] = global.shuffleArray(randomBlocks[i]);
    };
    for (let i = 0; i < mainArr.length; i++) {
        if (mainArr[i].rows) {
            let match = mainArr[i].rows.match(/b([0-9]+)-([0-9]+)/);
            if (match) {
                mainArr.splice(i, blocksArray[match[2]][0].height + 1, ...randomBlocks[match[2]][0].code);
                blocksArray[match[2]].shift();
                randomBlocks[match[2]].shift();
            };
        };
    };
    return mainArr;
};

/////////// if blok funkcije /////////////////////

function noteIfs(mainArr) {
    mainArr = global.cloneObject(mainArr);
    let blocksArray = [];
    for (let i = 0; i < mainArr.length; i++) {
        if (mainArr[i].rows) {
            let match = mainArr[i].rows.match(/if([0-9]+)-([0-9]+)/);
            if (match) {
                if (blocksArray[parseInt(match[2])] === undefined) {
                    blocksArray[parseInt(match[2])] = [];
                };
                let block = global.ifCodeBlock(i, parseInt(match[1]), mainArr);
                blocksArray[parseInt(match[2])].push({
                    index: i,
                    height: parseInt(match[1]),
                    type: parseInt(match[2]),
                    code: block.arr,
                    ifElse: block.ifElse
                });
            };
        };
    };
    return blocksArray;
};

function randomizeIfs(mainArr) {
    mainArr = global.cloneObject(mainArr);
    let blocksArray = noteIfs(mainArr);
    let randomBlocks = noteIfs(mainArr);
    for (let i = 0; i < randomBlocks.length; i++) {
        randomBlocks[i] = global.shuffleArray(randomBlocks[i]);
    };
    for (let i = 0; i < randomBlocks.length; i++) {
        for (let j = 0; j < randomBlocks[i].length; j++) {
            randomBlocks[i][j].code[0].code = blocksArray[i][j].ifElse + randomBlocks[i][j].code[0].code;
        };
    };
    for (let i = 0; i < mainArr.length; i++) {
        if (mainArr[i].rows) {
            let match = mainArr[i].rows.match(/if([0-9]+)-([0-9]+)/);
            if (match) {
                mainArr.splice(i, blocksArray[match[2]][0].height + 1, ...randomBlocks[match[2]][0].code);
                blocksArray[match[2]].shift();
                randomBlocks[match[2]].shift();
            };
        };
    };
    return mainArr;
};

////////////// insert random objects ///////////////////////////////

function insertObjects(mainArr) {
    for (let i = 0; i < mainArr.length; i++) {
        if (mainArr[i].rows) {
            let match = mainArr[i].rows.match(/insO_(\S*)/);
            if (match === null) {
                continue;
            };
            let objIndex = mainArr[i].code.match(/rndObj_([0-9])/)[1];
            // console.log(objIndex);
            if (match) {
                let matchArr = match[1].split('_');
                matchArr = matchArr.map((element) => {
                    let type = element.match(/u?[A-Z]/)[0];
                    let number = element.match(/[0-9]/)[0];
                    return ({
                        number,
                        type
                    });
                });
                let newObject = constructObject(matchArr, objIndex);
                let indent = mainArr[i].code.match(/^ */);
                newObject = global.indentCode(newObject, indent[0]);


                mainArr[i].code = mainArr[i].code.replace(`$rndObj_${objIndex};`, '{');
                mainArr.splice(i + 1, 0, ...newObject);
                let jScript = '';
                mainArr.forEach(element => {
                    jScript += element.code + "\n";
                });
            };
        };
    };
    return mainArr;
};

function constructObject(matchArr, objIndex) {
    let keys = {
        N: '$num',
        uN: '$used_ºN',
        uA: '$used_ºA',
        uS: '$used_ºS'
    };

    let mainString = '';
    for (let i = 0; i < matchArr.length; ++i) {
        let count = _.random(1, matchArr[i].number);
        for (let j = 0; j < count; ++j) {
            let keyType = matchArr[i].type.match(/[A-Z]/)[0];
            // console.log(keyType);
            // let string = `    $rnd_ºK${objIndex}${keyType}: `;
            let string = `    $rnd_ºK: `;
            string += keys[matchArr[i].type] + ',';
            mainString += (count - 1 === j && i === matchArr.length - 1) ? `${string}` : `${string}\n`;
        };
    };
    mainString = global.makeCodeArray(mainString);
    mainString = _.shuffle(mainString);
    // console.log(mainString);
    mainString[mainString.length - 1].code = mainString[mainString.length - 1].code.replace(',', '');
    mainString.push({ code: '};', rows: null, inline: null, rows: null, custom: null });
    return mainString;
}

/////////// returns randomization //////////////////////

function randomizeReturns(mainArr) {
    for (let i = 0; i < mainArr.length; i++) {
        if (mainArr[i].rows) {
            let match = mainArr[i].rows.match(/ret([0-9]+)-([A-Z])/);
            if (match) {
                let returnBlock = {
                    height: parseInt(match[1]),
                    type: match[2]
                };
                mainArr = applyReturnRandomization(returnBlock, mainArr, i);
            };
        };
    };
    return mainArr;
};

function applyReturnRandomization(returnBlock, mainArr, i) {
    let options = pullWholeBlock(returnBlock.type);
    if (returnBlock.type === "X") {
        options.push("original");
    };
    let codeBlock = global.makeCodeArray(options[global.random(0, options.length - 1)]);
    if (codeBlock[0].code === "original") {
        return mainArr;
    };
    codeBlock[0].code = (codeBlock.length === 1) ? `return ${codeBlock[0].code};` : `return ${codeBlock[0].code}`;
    codeBlock[codeBlock.length - 1].code += ";";
    let indent = mainArr[i].code.match(/^ */);
    codeBlock = global.indentCode(codeBlock, indent[0]);
    mainArr.splice(i, returnBlock.height + 1, ...codeBlock);
    return mainArr;
};

function pullWholeBlock(type) {
    if (type === "O") {
        return global.cloneObject(objects);
    } else if (type === "A") {
        return global.cloneObject(arrays);
    } else if (type === "F") {
        return global.cloneObject(functions);
    };
};

////////////////////////// row funkcije ////////////////////////

function randomizeRows(mainArr) {
    mainArr = global.cloneObject(mainArr);
    let arr = [];
    let randomArr = [];
    for (let i = 0; i < mainArr.length; i++) {
        if (mainArr[i].rows) {
            let match = mainArr[i].rows.match(/r([0-9]+)/);
            if (match) {
                if (arr[parseInt(match[1])] === undefined) {
                    arr[parseInt(match[1])] = [];
                };
                arr[match[1]].push({
                    index: i,
                    row: mainArr[i]
                });
            };
        };
    };
    arr.forEach(element => {
        randomArr.push(global.shuffleArray(element));
    });
    for (let i = 0; i < randomArr.length; i++) {
        for (let j = 0; j < randomArr[i].length; j++) {
            mainArr[arr[i][j].index] = randomArr[i][j].row;
        };
    };
    return mainArr;
};

////////////////////// var randomization ///////////////////////////

function randomizeVars(mainArr) {
    mainArr = global.cloneObject(mainArr);
    for (let i = 0; i < mainArr.length; i++) {
        if (mainArr[i].inline) {
            let match = mainArr[i].inline.match(/var/);
            if (match) {
                mainArr[i].code = mainArr[i].code.replace(/([^\s])/, (match, p1, offset, string) => {
                    return (global.random(0, 1) === 1) ? p1 : "var " + p1
                });
            };
        };
    };
    return mainArr;
};

function randomizeMathOperators(mainArr) {
    mainArr = global.cloneObject(mainArr);
    for (let i = 0; i < mainArr.length; i++) {
        if (mainArr[i].inline) {
            let match = mainArr[i].inline.match(/\+([0-9]+)/);
            if (match) {
                match = match[1].split("");
                match = match.map(element => parseInt(element));
                if (match) {
                    for (let j = 0; j < Math.max(...match) + 1; j++) {
                        if (match.indexOf(j) !== -1) {
                            mainArr[i].code = mainArr[i].code.replace(/\+/, (match, p1, offset, string) => {
                                return mathOperators[global.random(0, mathOperators.length - 1)];
                            });
                        } else {
                            mainArr[i].code = mainArr[i].code.replace(/\+/, "??");
                        };
                    };
                    mainArr[i].code = mainArr[i].code.replace(/\?\?/g, "+");
                };
            };
        };
    };
    return mainArr;
};

/////////////////////// add custom inline function //////////////////////////

function addCustomInline(mainArr) {
    mainArr = global.cloneObject(mainArr);
    for (let i = 0; i < mainArr.length; i++) {
        if (mainArr[i].custom) {
            let match = mainArr[i].custom.match(/c--(.+)--([a-z])-(.+)--/);
            if (match) {
                let code = match[1];
                let fade = match[2];
                let customCode = match[3];
                if (fade === "y" && global.random(0, 1) === 1) {
                    return mainArr
                } else {
                    let reg = new RegExp(code);
                    mainArr[i].code = mainArr[i].code.replace(reg, customCode);
                };
            };
        };
    };
    return mainArr;
};


/////////////////////// randomize arrays //////////////////////////

function shuffleArrayElements(mainArr) {
    mainArr = global.cloneObject(mainArr);
    for (let i = 0; i < mainArr.length; i++) {
        if (mainArr[i].inline && mainArr[i].inline.match(/\[\]/)) {
            mainArr[i].code = mainArr[i].code.replace(/\[(.*)\]/g, (match, p1, offset, string) => {
                let arr = p1.split(" ,");
                global.shuffle(arr);
                arr = arr.map(element => element.trim());
                return "[" + arr.join() + "]";
            });
        };
    };
    return mainArr;
};

module.exports = {
    randomizeBlocks,
    randomizeIfs,
    randomizeMathOperators,
    randomizeReturns,
    randomizeRows,
    randomizeVars,
    randomizeReturns,
    shuffleArrayElements,
    addCustomInline,
    insertObjects
};




























