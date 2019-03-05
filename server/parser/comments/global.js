function makeCodeArray(string) {
    let array = string.split(/$\n/gm);
    let custom;
    array = array.map(element => {
        if (element.match("~")) {
            custom = element.split(/~/)[1].trim();
            element = element.split(/~/)[0];
        } else {
            custom = null;
        };
        let arr = element.split(/\/\/|#/);
        arr[1] = arr[1] === undefined ? null : arr[1].trim();
        arr[2] = arr[2] === undefined ? null : arr[2].trim();
        return {
            code: arr[0],
            inline: arr[1],
            rows: arr[2],
            custom
        };
    });
    return array;
};

function makeCodeArrayTrim(string) {
    let array = string.split(/$\n/gm);
    let custom;
    array = array.map(element => {
        if (element.match("~")) {
            custom = element.split(/~/)[1].trim();
            element = element.split(/~/)[0];
        } else {
            custom = null;
        };
        let arr = element.split(/\/\/|#/);
        arr[1] = arr[1] === undefined ? null : arr[1].trim();
        arr[2] = arr[2] === undefined ? null : arr[2].trim();
        return {
            code: arr[0].trim(),
            inline: arr[1],
            rows: arr[2],
            custom
        };
    });
    return array;
};

function indentCode(codeBlock, indent) {
    for (let i = 0; i < codeBlock.length; i++) {
        codeBlock[i].code = indent + codeBlock[i].code;
    };
    return codeBlock;
};

function objectProperties(obj) {
    return Object.keys(obj);
};

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
};

function shuffleArray(originalArray) {
    let array = originalArray.slice();
    let randomArray = [];
    while (array.length !== 0) {
        randomArray.push(array.splice(random(0, array.length - 1), 1)[0]);
    };
    return randomArray;
};

function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj))
};

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

/////////// row/block functions /////////////////////

function codeBlock(index, length, mainArr) {
    let arr = [];
    for (let i = index; i <= index + length; i++) {
        arr.push(cloneObject(mainArr[i]));
    };
    return arr;
};

function ifCodeBlock(index, length, mainArr) {
    let arr = [];
    for (let i = index; i <= index + length; i++) {
        arr.push(cloneObject(mainArr[i]));
    }
    let condition = arr[0].code.match(/[^(]+/g)[0];
    arr[0].code = arr[0].code.match(/\(.+/g)[0];
    return {
        arr: arr,
        ifElse: condition
    };
};

module.exports = {
    ifCodeBlock,
    codeBlock,
    shuffle,
    shuffleArray,
    cloneObject,
    shuffleArray,
    random,
    indentCode,
    objectProperties,
    makeCodeArray,
    makeCodeArrayTrim
};





















