
let variableNames = [
  {
    a: "lorem",
    b: "ipsum",
    c: "dolor",
    d: "sit",
    e: "amet",
    f: "consequentum",
    g: "rubor",
    h: "calor",
    i: "bar"
  },
  {
    a: "alfa",
    b: "beta",
    c: "gama",
    d: "delta",
    e: "jota",
    f: "teta",
    g: "zeta",
    h: "sigma",
    i: "omega"
  }
];
let dataTypes = {
  O: "object",
  K: "object_key",
  N: "number",
  S: "string",
  A: "array",
  F: "function",
  B: "boolean"
};

// Constructors

// let Challenge = function(varNames) {
//   this.varNames = varNames;
//   this.usedVarNames = [];
// };

// Challenge.prototype.getKeyNames = function(keysArr) {
//   let keyNames = Object.keys(keysArr);
//   return getObjKeyValuesInArray(keysArr, keyNames);
// };
// function getObjKeyValuesInArray(obj, keys) {
//   var arr = [];
//   for (var i = 0; i < keys.length; i++) {
//     arr.push(obj[keys[i]]);
//   }
//   return arr;
// }

// let index = random(0, variableNames.length - 1);
// var task = new Challenge(variableNames[index]);
// task.usableVarNames = task.getKeyNames(task.varNames);

// function random(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// console.log('radi');


module.exports = {
  // task,
  dataTypes,
  variableNames
};
