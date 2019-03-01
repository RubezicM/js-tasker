let consoleBox = document.getElementById('code');

let string = `
var rubor = [ "bar",  "qux", "henk",  8];

    rubor.reverse();

    var cons = {
      natum: function () {
        return rubor.push(this.dolor[0])
      },
      dolor: rubor[3],
      semper: function () {
          this.sit++;
          return this.sit - this.dolor;
      },
      sit: 4,
    };

    cons.natum();

    return (cons.dolor);

    cons.natum();
*`;

consoleBox.innerHTML = '';

writeCode(string);

function writeCode(string) {
    for (let i = 0; i < string.length; i++) {

        setTimeout(() => {
            addCharacter(string[i]);
        }, i * 50);
    };

    function addCharacter(character) {
        if (character === ';') {
            character = ';<br>';
        };
        if (character === '*') {
            setTimeout(() => {
                consoleBox.innerHTML = '';
                writeCode(string);
            }, 1500);
        } else {
            consoleBox.innerHTML += character;
        };
    };
};