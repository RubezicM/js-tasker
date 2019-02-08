const { variableNames, dataTypes } = require("./main-object");
const _ = require('lodash');

// let str = `
// var $a_λN = $num;
//   var $b_λN = $num;
//   var $c_λN = $num;
//   console.log($used_λN);
// `
// inlineSyntax(str);


function inlineSyntax(str) {

  let variableNamesLocal = _.cloneDeep(variableNames);

  /////////////// constructor //////////////////////////

  let Challenge = function (varNames) {
    this.varNames = varNames;
    this.usedVarNames = [];
  };

  Challenge.prototype.getKeyNames = function (keysArr) {
    let keyNames = Object.keys(keysArr);
    return getObjKeyValuesInArray(keysArr, keyNames);
  };

  function getObjKeyValuesInArray(obj, keys) {
    let arr = [];
    for (let i = 0; i < keys.length; i++) {
      arr.push(obj[keys[i]]);
    }
    return arr;
  };

  let index = random(0, variableNamesLocal.length - 1);
  let task = new Challenge(variableNamesLocal[index]);
  task.usableVarNames = task.getKeyNames(task.varNames);

  ///////////////// methods ///////////////////////////////

  let usedVarTags = [];

  function replaceVarNames(match, p1, p2, offset, string) {
    let key, nameVar;
    let type = p2;

    let varObject = usedVarTags.filter((element) => element.key === p1)[0];

    if (!varObject) {
      key = p1;
      let objectKeys = Object.keys(task.varNames);
      let randomKey = objectKeys[_.random(0, objectKeys.length - 1)];

      nameVar = task.varNames[randomKey];
      usedVarTags.push({ key, nameVar });
      delete task.varNames[randomKey];

      let infoVar = storeVarInfo(nameVar, type, key);
      checkAndAddToUsedKeys(infoVar);
      if (p1 === "g" || p2 === "$g") {
        //////// ??
      };
    } else {
      key = varObject.key;
      nameVar = varObject.nameVar;
    };

    return nameVar;
  }

  function redeclareVars(match, p1, p2, offset, string) {
    if (match === "$rdc_") {
      return random(0, 1) === 1 ? "var " : "";
    } else {
      let typeOfVar = dataTypes[p1];
      let arrayOfType = getSpecificVarTypes(task.usedVarNames, typeOfVar);
      let rnd = random(0, arrayOfType.length - 1);
      let nameVar = arrayOfType[rnd].name;
      return random(0, 1) === 1 ? "var " + nameVar : nameVar;
    };
  };

  function declareRandomVars(match, p1, p2, offset, string) {
    let nameVar,
      rnd = random(0, task.usableVarNames.length - 1),
      infoVar;
    if (p2 === undefined) {
      let type = p1;
      nameVar = task.usableVarNames[rnd];
      infoVar = storeVarInfo(nameVar, type);
    } else {
      nameVar = task.usableVarNames[rnd];
      infoVar = storeVarInfo(nameVar);
    }
    checkAndAddToUsedKeys(infoVar);
    return nameVar;
  };


  ////////////////////// helpers /////////////////////////////

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getObjKeyValuesInArray(obj, keys) {
    let arr = [];
    for (let i = 0; i < keys.length; i++) {
      arr.push(obj[keys[i]]);
    }
    return arr;
  }

  //////////////////////// Storing variable info inside an global object ///////////////////////////

  function storeVarInfo(name, type, key) {
    let typeArray = [];
    if (key === undefined) {
      let keys = Object.keys(task.varNames);
      for (let i = 0; i < keys.length; i++) {
        if (task.varNames[keys[i]] === name) {
          key = keys[i][0];
        }
      }
    }
    if (type != undefined && type.length > 1) {
      let tmpArr = type.split("");
      for (let i = 0; i < tmpArr.length; i++) {
        typeArray.push(dataTypes[tmpArr[i]]);
      }
    } else if (type != undefined && type.length === 1) {
      typeArray = dataTypes[type];
    } else {
      typeArray = "random";
    }
    return {
      key,
      name,
      type: typeArray
    };
  };

  function checkAndAddToUsedKeys(obj) {
    let found = task.usedVarNames.some(function (el) {
      return el.key === obj.key;
    });
    if (!found) {
      task.usedVarNames.push(obj);
      task.usableVarNames.splice(task.usableVarNames.indexOf(obj["name"]), 1);
    };
  };

  function getUsedVar(arr, key) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].key === key) {
        return arr[i];
      };
    };
  };

  function getSpecificVarTypes(arr, type) {
    let names = {
      N: 'number',
      A: 'array',
      O: 'object'
    };

    
    let tmp = [];
    arr.forEach(function (entry) {
      if (entry.type === names[type]) {
        tmp.push(entry);
      };
    });
    return tmp;
  };

  //////////////////////////////////////////////////////

  // assigment 
  let jScript = str;

  jScript = jScript.replace(/\$\b(\w)\b/g, replaceVarNames);

  jScript = jScript.replace(/\$\b(\w{1})_λ(\w+)\b/g, replaceVarNames);

  jScript = jScript.replace(/\$rnd_λ(\w+)|\$(rnd_V)/g, declareRandomVars);

  jScript = jScript.replace(
    /\$\b(\w{1})\b|\b\.\$(\w{1})\b/g,
    (match, p1, p2, offset, string) => {
      let key = p1 === undefined ? p2 : p1;
      let nameVar;
      let objVar = getUsedVar(task.usedVarNames, key);
      if (objVar.type.indexOf("function") >= 0) {
        nameVar = objVar.name + "()";
      } else {
        nameVar = objVar.name;
      }
      return p2 === undefined ? nameVar : "." + nameVar;
    }
  );

  jScript = jScript.replace(
    /\$used_λ(\w+)|\$(used_V)/g,
    (match, p1, p2, offset, string) => {
      let nameVar, tmpArr;
      if (p2 == undefined) {
        let type = p1;
        tmpArr = getSpecificVarTypes(task.usedVarNames, type);
      } else {
        tmpArr = task.usedVarNames;
      };
      rnd = _.random(0, tmpArr.length - 1);
      nameVar = tmpArr[rnd]["name"];
      return nameVar;
    }
  );

  jScript = jScript.replace(/\$rdc_λ(.)|\$rdc_/g, redeclareVars);

  jScript = jScript.replace(/\$(num+)/g, (match, p1, offset, string) => {
    return random(0, 15);
    // Todo - build an global array filled with random numbers.
    // Add chance for negative values
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

  let finalFunction = new Function(jScript);

  // console.log('function:', jScriptOriginal);
  // console.log('result:', finalFunction());

  return {
    function: jScriptOriginal,
    result: finalFunction()
  };
}

module.exports = { inlineSyntax };
