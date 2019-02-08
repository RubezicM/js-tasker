const { variableNames, dataTypes } = require("./main-object");


let str = `
var $a_λN = $num;
  var $b_λN = $num;
  var $c_λN = $num;
  console.log($used_λN);
`

inlineSyntax(str);

function inlineSyntax(str) {

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

  let index = random(0, variableNames.length - 1);
  let task = new Challenge(variableNames[index]);
  task.usableVarNames = task.getKeyNames(task.varNames);

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  ////////////////////// constructor end /////////////////////////

  ///////////////// methods ///////////////////////////////

  function replaceVarNames(match, p1, p2, offset, string) {
    let key, type, nameVar, infoVar;
    key = p1;
    type = p2;
    (nameVar = task.varNames[key]),
      (infoVar = storeVarInfo(nameVar, type, key));
    checkAndAddToUsedKeys(infoVar);
    if (p1 === "g" || p2 === "$g") {
      console.log(match, offset)
    }


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
    }
  }

  function declareRandomVars(match, p1, p2, offset, string) {
    let nameVar,
      rnd = random(0, task.usableVarNames.length - 1),
      infoVar;
    if (p2 == undefined) {
      let type = p1;
      nameVar = task.usableVarNames[rnd];
      infoVar = storeVarInfo(nameVar, type);
    } else {
      nameVar = task.usableVarNames[rnd];
      infoVar = storeVarInfo(nameVar);
    }
    checkAndAddToUsedKeys(infoVar);
    return nameVar;
  }

  ///////////////////////////// methods /////////////////////////////////


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
  /**
   * Storing variable info inside an global object 
   *
   */
  function storeVarInfo(name, type, key) {
    let typeArray = [];
    if (key == undefined) {
      let keys = Object.keys(task.varNames);
      for (let i = 0; i < keys.length; i++) {
        if (task.varNames[keys[i]] == name) {
          key = keys[i][0];
        }
      }
    }
    if (type != undefined && type.length > 1) {
      let tmpArr = type.split("");
      for (let i = 0; i < tmpArr.length; i++) {
        typeArray.push(dataTypes[tmpArr[i]]);
      }
    } else if (type != undefined && type.length == 1) {
      typeArray = dataTypes[type];
    } else {
      typeArray = "random";
    }
    return {
      key,
      name,
      type: typeArray
    };
  }
  function checkAndAddToUsedKeys(obj) {
    let found = task.usedVarNames.some(function (el) {
      return el.key === obj.key;
    });
    if (!found) {
      task.usedVarNames.push(obj);
      task.usableVarNames.splice(task.usableVarNames.indexOf(obj["name"]), 1);
    }
  }

  function getProperty(arr, key) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].key == key) {
        return arr[i].name;
      }
    }
  }



  function getUsedVar(arr, key) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].key == key) {
        return arr[i];
      }
    }
  }

  /**
   * This method checks the array for objects that has the type we are 
   * lookingfor..
   * [arr] = array of objects, [type] = "number,string,object,array.."
   */
  function getSpecificVarTypes(arr, type) {
    let tmp = [];
    arr.forEach(function (entry) {
      if (entry.type == type) {
        tmp.push(entry);
      }
    });
    return tmp;
  }

  //////////////////////////////////////////////////////

  // assigment 
  let jScript = str;
  //console.log("skripta", jScript);

  /////////// VAR NAME DISTRIBUTION ////////////
  /**
 * Command : [$]+[$key] 
 * -
 * example : var $a = $b; // var ipsum = lorem;
 *  
 * Variables that are initiated in this way, get paired with variable name in global variable object and stay locked until the parser is done with it's. That means, that all usages of the command [$]+["key"] get's picked up by our parser as a signal to replace the names of said keys to variable names. We can reference them by their keys ([$[key]]) at any given time in our program.
 * 
 * Complete reusability. The [[$][key]] command can be used to declare/redeclare almost every data type (except objects). Also, it is valid when used in logs.
 * 
 * Basic commands: 
 * var [$a] // var [lorem]
 * 
 * var [$b] // var [ipsum]
 * 
 * [$a] + [$b] // [lorem] + [ipsum] 


 * Command : [$]+[$key]_[λ]+[data-type]
 * -
 * example : var $a_λN = $num; // var lorem = 23;
 * 
 * This is used for configuration purposes, we want to be able to differentiate used variables by their data type. Depending on the key used, we match that key with the value in the global object of data-types. Later on, if we need specific data-type in our program, we just reference it by its key.
 */

  jScript = jScript.replace(/\$\b(\w)\b/g, replaceVarNames);

  jScript = jScript.replace(/\$\b(\w{1})_λ(\w+)\b/g, replaceVarNames);

  jScript = jScript.replace(
    /\$rnd_λ(\w+)|\$(rnd_V)/g,
    declareRandomVars
  );

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

  // Assigning random variable names to all kinds of data-types. Usually, these types of variables do not go to log function, but can be used to manipulate outcomes of such. We have limited capacity at referencing them but it can be done.
  /* Keywords :
 *$rnd_λ[specific-data-type] === choosing random variable name that is not used and assigning it a specific value/data type (string,number,boolean,object..)

 *$rnd_V === getting a random "JUNK" variable, which won't be reused, it's job is mostly to confuse. It can be of any data type,doesnt matter. While it can be used to manipulate data, it's reusability value is low.
*/

  jScript = jScript.replace(
    /\$used_λ(\w+)|\$(used_V)/g,
    (match, p1, p2, offset, string) => {
      let nameVar,
        tmpArr,
        rnd = random(0, task.usableVarNames.length - 1);
      if (p2 == undefined) {
        let type = p1;
        console.log(task.usedVarNames, type);
        tmpArr = getSpecificVarTypes(task.usedVarNames, type);
      } else {
        tmpArr = task.usedVarNames;
      }
      nameVar = tmpArr[rnd]["name"];
      return nameVar;
    }
  );

  // Redeclaring already used variables. We choose random USED variable, and we declare it's new value. We can reference the variables we used by it's KEY or by it's DATA-TYPE. Program chooses whether to add the "var" keyword or not, it's completely random.

  jScript = jScript.replace(/\$rdc_λ(.)|\$rdc_/g, redeclareVars);

  /*
Keywords:
     ---  $rdc_$[specific-used-varname] --- We change the value of "$rdc_" to be with either var or no var. Variable re-assigning is done with the method "replaceVarNames".

     ---- $rdc_λ[specific-used-data-type] --- similary, if we don't want to be that specific which variable we want to redeclare, we can use the data type referencer, and use random used variable of a given data-type.
*/

  // Logging the result. We ask the user to guess the values of variables or calulations given in this log call. Any data-type can be part of this call. We can target specific values to be printed, or completely random. This below is targeted.
  /**
   * Keywords:
   *
   * $log_$[specific-variable]
   *
   */
  // jScript = jScript.replace(/\$log_\$(.)/g, (match, p1, offset, string) => {
  //   var nameVar = getProperty(task.usedVarNames, p1);
  //   if (nameVar != undefined) {
  //     return nameVar;
  //   }
  // });

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

  //prikaz rezultata i paterna za korisnika
  //console.log("preradjena", jScriptOriginal);
  //console.log(finalFunction);
  console.log(jScriptOriginal);
  console.log('result:', finalFunction());

  return {
    function: jScriptOriginal,
    result: finalFunction()
  };
}

// Proba
// var result = sendInlineChanges();
// console.log(result);

module.exports = { inlineSyntax };
