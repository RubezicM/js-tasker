const { variableNames, dataTypes } = require("./main-object");
const _ = require("lodash");

function inlineSyntax(str) {
  let variableNamesLocal = _.cloneDeep(variableNames);
  let index = _.random(0, variableNamesLocal.length - 1);

  let randomizeKeys = arr => {
    let vals = _.shuffle(arr);
    let keys = Object.keys(arr);
    let tmpObj = {};
    for (let i = 0; i < vals.length; i++) {
      tmpObj[keys[i]] = vals[i];
    }
    return tmpObj;
  };

  // Shuffled object with variable names
  let variableNamesForTask = randomizeKeys(variableNamesLocal[index]);
  /////////////// constructor //////////////////////////

  let Challenge = function(varNames) {
    this.varNames = varNames;
    this.usedVarNames = [];
  };

  Challenge.prototype.getKeyNames = function(keysArr) {
    let keyNames = Object.keys(keysArr);
    return getObjKeyValuesInArray(keysArr, keyNames);
  };

  function getObjKeyValuesInArray(obj, keys) {
    let arr = [];
    for (let i = 0; i < keys.length; i++) {
      arr.push(obj[keys[i]]);
    }
    return arr;
  }

  let task = new Challenge(variableNamesForTask);
  task.usableVarNames = task.getKeyNames(task.varNames);
  ///////////////// methods ///////////////////////////////

  let usedVarTags = [];

  function replaceVarNames(match, p1, p2, p3, offset, string) {
    //console.log("matches",p1,p2,p3,match)
    // let key, nameVar;
    // let type = p2;

    // let varObject = usedVarTags.filter((element) => element.key === p1)[0];

    // if (!varObject) {
    //   key = p1;
    //   let objectKeys = Object.keys(task.varNames);
    //   let randomKey = objectKeys[_.random(0, objectKeys.length - 1)];

    //   nameVar = task.varNames[randomKey];
    //   usedVarTags.push({ key, nameVar });
    //   delete task.varNames[randomKey];

    //   let infoVar = storeVarInfo(nameVar, type, key);
    //   checkAndAddToUsedKeys(infoVar);
    // } else {
    //   key = varObject.key;
    //   nameVar = varObject.nameVar;
    // };

    // return nameVar;
    let key, type, nameVar, infoVar, member;
    key = p1;
    type = p2;
    member = p3;
    nameVar = task.varNames[key];
    infoVar = storeVarInfo(nameVar, type, key, member);
    //console.log(infoVar)
    checkAndAddToUsedKeys(infoVar);
    return nameVar;
  }

  function redeclareVars(match, p1, p2, offset, string) {
    if (match === "$var_") {
      return _.random(0, 1) === 1 ? "var " : "";
    } else {
      let typeOfVar = dataTypes[p1];
      let arrayOfType = getSpecificVarTypes(task.usedVarNames, typeOfVar);
      let rnd = _.random(0, arrayOfType.length - 1);
      let nameVar = arrayOfType[rnd].name;
      return _.random(0, 1) === 1 ? "var " + nameVar : nameVar;
    }
  }

  function declareRandomVars(match, p1, p2, offset, string) {
    let nameVar,
      rnd = _.random(0, task.usableVarNames.length - 1),
      infoVar;
    let type = p1;
    nameVar = task.usableVarNames[rnd];
    infoVar = storeVarInfo(nameVar, type);
    checkAndAddToUsedKeys(infoVar);
    return nameVar;
  }

  //////////////////////// Storing variable info inside an global object ///////////////////////////

  function storeVarInfo(name, type, key, member = "not an object") {
    let typeArray = [];
    if (key === undefined) {
      let keys = Object.keys(task.varNames);
      for (let i = 0; i < keys.length; i++) {
        if (task.varNames[keys[i]] === name) {
          key = keys[i][0];
        }
      }
    }
    if (type !== undefined && type.length > 1) {
      let tmpArr = type.split("");
      for (let i = 0; i < tmpArr.length; i++) {
        typeArray.push(dataTypes[tmpArr[i]]);
      }
    } else if (type !== undefined && type.length === 1) {
      typeArray = dataTypes[type];
    } else {
      typeArray = "random";
    }

    return {
      key,
      name,
      type: typeArray,
      member
    };
  }

  function checkAndAddToUsedKeys(obj) {
    let found = task.usedVarNames.some(function(el) {
      return el.key === obj.key;
    });
    if (!found) {
      task.usedVarNames.push(obj);
      task.usableVarNames.splice(task.usableVarNames.indexOf(obj["name"]), 1);
    }
  }

  function getUsedVar(arr, key) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].key === key) {
        return arr[i];
      }
    }
  }

  function getSpecificVarTypes(arr, type) {
    let names = {
      O: "object",
      N: "number",
      S: "string",
      A: "array",
      F: "function",
      B: "boolean",
      K: "object_key",
      P: "parametar"
    };
    let tmpObjKeys = [];
    for (let i = 0; i < type.length; i++) {
      tmpObjKeys.push(names[type[i]]);
    }
    let tmp = [];
    arr.forEach(function(entry) {
      if (entry.type == tmpObjKeys) {
        tmp.push(entry);
      }
    });
    return tmp;
  }

  /////////////////////////////  assigment  /////////////////////////

  let jScript = str;

  jScript = jScript.replace(/\$\b(\w)\b/g, replaceVarNames);

  jScript = jScript.replace(
    /\$\b([a-zA-Z]{1})_º([a-zA-Z]+)_*º*(\d)*\b/g,
    replaceVarNames
  );

  jScript = jScript.replace(/\$rnd_º([a-zA-Z]+)/g, declareRandomVars);

  jScript = jScript.replace(/\[(.+)\]/g, (match, p1, p2, offset, string) => {
    let tasks = p1.split(",");
    let typeOfVar,
      numberOfData,
      rtrnStr = "[",
      condition,
      tmpArr,
      el;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].includes("$arr")) {
        for (let y = 0; y < tasks[i].length; y++) {
          let singleTask = tasks[i].split("_");
          typeOfVar = singleTask[1].substring(1);
          numberOfData = singleTask[2][singleTask[2].length - 1];
          condition = singleTask[2].substr(0, singleTask[2].length - 1);
        }

        for (let k = 0; k < numberOfData; k++) {
          if (condition == "used") {
            tmpArr = getSpecificVarTypes(task.usedVarNames, typeOfVar);
            let rnd = _.random(0, tmpArr.length - 1);
            nameVar = tmpArr[rnd]["name"];

            if (k === 0) {
              rtrnStr += nameVar;
            } else {
              rtrnStr = rtrnStr + "," + nameVar;
            }
          } else if (condition == "new") {
            if (typeOfVar == "N") {
              el = _.random(0, 20);
            }
            if (k === 0) {
              rtrnStr += el;
            } else {
              rtrnStr += "," + el;
            }
          }
        }
      } else {
        if (i === 0) {
          rtrnStr += tasks[i];
        } else {
          rtrnStr = rtrnStr + "," + tasks[i];
        }
      }
    }
    rtrnStr += "]";
    return rtrnStr;
  });

  jScript = jScript.replace(
    /\$used_º([a-zA-Z])([0-9])*/g,
    (match, p1, p2, offset, string) => {
      let nameVar, tmpArr, type,tmp;
      type = p1;
      tmpArr = getSpecificVarTypes(task.usedVarNames, type);
      rnd = _.random(0, tmpArr.length - 1);
      if (p2 === undefined) {
        nameVar = tmpArr[rnd]["name"];
        return nameVar;
      } else {
        nameVar = [];
        for(var i=0;i < p2;i++){
          rnd = _.random(0, tmpArr.length - 1);
          nameVar.push(tmpArr[rnd]["name"]);
          tmpArr.splice(rnd,1);
        }
        return nameVar.join(',');
      }
    }
  );

  jScript = jScript.replace(/\$(var )/g, (match, p1,p2, offset, string) => {
    let chance = _.random(0,1);
    return chance === 1 ? "var " : "";
    
    // Todo - build an global array filled with random numbers.
    // Add chance for negative values
  });

  jScript = jScript.replace(/\$(num+)([0-9])*/g, (match, p1,p2, offset, string) => {
    console.log(p1,p2)
    let nameVar;
    if(p2 === undefined){
      return _.random(0, 15);
    } else {
      nameVar = [];
      for(var i=0;i < p2;i++){
        nameVar.push(_.random(0,15));
      }
      return nameVar.join(",");
    }
    
    // Todo - build an global array filled with random numbers.
    // Add chance for negative values
  });
  jScript = jScript.replace(/\$(str+)([0-9])*/g, (match, p1,p2, offset, string) => {
    let strings = ["foo","bar","kme","lala","blah","prc"];
    console.log(match)
    let nameVar;
    if(p2 === undefined){
      console.log(strings[_.random(0, strings.length - 1)])
      return strings[_.random(0, strings.length - 1)];
    } else {
      nameVar = [];
      for(var i=0;i < p2;i++){
        let rnd = _.random(0,strings.length - 1);
        let rndStr = strings[rnd];
        nameVar.push(rndStr);
        strings.splice(rnd,1);
      }
      return nameVar.join(",");
    }
    
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

module.exports = {
  inlineSyntax
};
