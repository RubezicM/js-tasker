const {
  variableNames,
  dataTypes
} = require("./main-object");
const _ = require('lodash');

function inlineSyntax(str) {

  let variableNamesLocal = _.cloneDeep(variableNames);
  let index = _.random(0, variableNamesLocal.length - 1);

  let randomizeKeys = (arr) => {
    let vals = _.shuffle(arr);
    let keys = Object.keys(arr);
    let tmpObj = {};
    for (let i = 0; i < vals.length; i++) {
      tmpObj[keys[i]] = vals[i];
    }
    return tmpObj;
  }


  // Shuffled object with variable names
  let variableNamesForTask = randomizeKeys(variableNamesLocal[index]);
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


  let task = new Challenge(variableNamesForTask);
  task.usableVarNames = task.getKeyNames(task.varNames);
  ///////////////// methods ///////////////////////////////

  let usedVarTags = [];

  function replaceVarNames(match, p1, p2, offset, string) {
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
    let key, type, nameVar, infoVar;
    key = p1;
    type = p2;
    nameVar = task.varNames[key];
    infoVar = storeVarInfo(nameVar, type, key);
    checkAndAddToUsedKeys(infoVar);
    return nameVar;
  };

  function redeclareVars(match, p1, p2, offset, string) {
    if (match === "$var_") {
      return _.random(0, 1) === 1 ? "var " : "";
    } else {
      let typeOfVar = dataTypes[p1];
      let arrayOfType = getSpecificVarTypes(task.usedVarNames, typeOfVar);
      let rnd = _.random(0, arrayOfType.length - 1);
      let nameVar = arrayOfType[rnd].name;
      return _.random(0, 1) === 1 ? "var " + nameVar : nameVar;
    };
  };

  function declareRandomVars(match, p1, p2, offset, string) {
    let nameVar,
      rnd = _.random(0, task.usableVarNames.length - 1),
      infoVar;
    // console.log("p1",p1,"p2",p2);
    if (p2 === undefined) {
      let type = p1;
      nameVar = task.usableVarNames[rnd];
      // console.log('NAMEVAR',nameVar)
      infoVar = storeVarInfo(nameVar, type);
      // console.log("INFOVAR",infoVar)
    } else {
      nameVar = task.usableVarNames[rnd];
      infoVar = storeVarInfo(nameVar);
    }
    checkAndAddToUsedKeys(infoVar);
    return nameVar;
  };

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
    if (type !== undefined && type.length > 1) {
      let tmpArr = type.split("");
      for (let i = 0; i < tmpArr.length; i++) {
        typeArray.push(dataTypes[tmpArr[i]]);
      }
    } else if (type !== undefined && type.length === 1) {
      typeArray = dataTypes[type];
    } else {
      typeArray = "random";
    };

    return {
      key,
      name,
      type: typeArray
    };
  };

  function checkAndAddToUsedKeys(obj) {
    // console.log("obj",obj);
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
      O: "object",
      N: "number",
      S: "string",
      A: "array",
      F: "function",
      B: "boolean",
      K: "object_key",
      P: "parametar"
    };


    let tmp = [];
    arr.forEach(function (entry) {
      if (entry.type === names[type]) {
        tmp.push(entry);
      };
    });
    return tmp;
  };

  /////////////////////////////  assigment  /////////////////////////

  let jScript = str;

  jScript = jScript.replace(/\$\b(\w)\b/g, replaceVarNames);

  jScript = jScript.replace(/\$\b(\w{1})_º(\w+)\b/g, replaceVarNames);

  jScript = jScript.replace(/\$rnd_º(\w+)|\$(rnd_V)/g, declareRandomVars);

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
  // [broj random stringova, broj random brojeva, broj random iskoriscenih promenljivi odredjenog tipa*]
  //  jScript = jScript.replace(
  //   /\[?\$\w+º(\w{1})_(\w+)\]?/g,
  //   (match, p1, p2, offset, string) => {
  //     //let strNames = ["foo","bar","tar","bet","ket","krk","kme"];
  //     console.log(p1,p2)
  //     let numberOfData = p2,
  //         tmpArr;
  //     // if(p1 === "N"){
  //     //   let tmpStr = '';
  //     //   for(let i = 0;i < numberOfData;i++){
  //     //     let el = _.random(0,20);
  //     //     if(i === 0){
  //     //       tmpStr += el;
  //     //     } else {
  //     //       tmpStr += "," + el;
  //     //     }
  //     //   }
  //     //   return tmpStr;
  //     // }
  //   }
  // );
  jScript = jScript.replace(
    /\[(.+)\]/g,
    (match, p1, p2, offset, string) => {
      //let strNames = ["foo","bar","tar","bet","ket","krk","kme"];
      console.log(p1)
      let tasks = p1.split(',');
      let typeOfVar,
          numberOfData,
          rtrnStr = "[",
          condition,
          tmpArr,
          el;
      for (let i = 0; i < tasks.length; i++) {
        
        for (let y = 0; y < tasks[i].length; y++) {
          let singleTask = tasks[i].split("_");
          typeOfVar = singleTask[1].substring(1);
          numberOfData = singleTask[2][singleTask[2].length - 1];
          condition = singleTask[2].substr(0, singleTask[2].length-1);
        }

        for (let k = 0; k < numberOfData; k++) {
          console.log("tasks",tasks[i],"i",i)
          
            if(condition == "used"){
              console.log("k",k)
              tmpArr = getSpecificVarTypes(task.usedVarNames, typeOfVar);
              let rnd = _.random(0, tmpArr.length - 1);
              nameVar = tmpArr[rnd]["name"];
              
              if(k === 0){
                rtrnStr += nameVar;
                
              } else {
                rtrnStr = rtrnStr + "," + nameVar;
              }
            } else if(condition == "new"){
              if(typeOfVar == "N"){
                el = _.random(0,20);
              }
                  if(i === 0){
                    rtrnStr += el;
                  } else {
                    rtrnStr += "," + el;
                  }
            }
        }
      }
      rtrnStr += "]"
      return rtrnStr;
    }
  );
  // jScript = jScript.replace(
  //   /\[\$used_º(\w+)_(.)\]/g,
  //   (match, p1, p2, p3, offset, string) => {
  //     //console.log(p1,p2,p3)
  //     let typeOfVar = p1,
  //       tmpArr,
  //       tmpStr = "[";
  //     tmpArr = getSpecificVarTypes(task.usedVarNames, typeOfVar);
  //     for (var i = 0; i < tmpArr.length; i++) {
  //       if (i === 0) {
  //         tmpStr += tmpArr[i].name;
  //       } else {
  //         tmpStr += "," + tmpArr[i].name;
  //       }
  //     }
  //     tmpStr += "]";
  //     return tmpStr;
  //   }
  // );
  // To-do / Ubacivanje unikatnih iskoriscenih
  jScript = jScript.replace(
    /\$used_º(\w+)|\$(used_V)/g,
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



  jScript = jScript.replace(/\$var_º(.)|\$var_/g, redeclareVars);

  jScript = jScript.replace(/\$(num+)/g, (match, p1, offset, string) => {
    return _.random(0, 10);
    // Todo - build an global array filled with random numbers.
    // Add chance for negative values
  });
  console.log(task)
  // obradjeni patern za prikaz korisniku
  let jScriptOriginal = jScript;
  // console.log("task",task)
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
};

module.exports = {
  inlineSyntax
};