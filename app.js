function SpaghettiBrain(text) {
    this.characters = text.split('');
    var brain = this;
    var thoughts = [];

    this.think = function() {
        var item = parseInt(Math.random() * this.characters.length, 10);
        var thought = brain.characters[item];

        var exists = false;
        for (var j = 0; j < thoughts.length; j++) {
            if (thoughts[j] === thought) {
                exists = true;
            }
        }

        if (exists) {
            return 'Uhm... I already said that : ' + thought;
        } else {
            thoughts.push(thought);
            return thought;
        }
    };

    this.talk = function() {
        console.log('Hi hero, i think that: ' + this.think());
    };
}

function spaghettiName(amount) {

    var things = [];
    var results = [];

    for (var i = 0; i < amount; i++) {
        things.push({
            i: i,
            value: Math.random() * i
        });
    }

    for (var i = 0; i < amount; i++) {
        if (things[i].value > amount / 2) {
            results.push(things[i]);
        }
    }


    function doSomeWork(value, i, cb) {
        var a = Math.pow(value, 3);
        a = a + i;
        a = a / amount;

        return cb(a, i);
    }

    function callback(value, i) {
        return value * things[i].value;
    }

    var theFinalResult = '';

    for (var i = 0; i < results.length; i++) {
        theFinalResult += doSomeWork(results[i].value, i, callback);
    }

    var numbers = theFinalResult.split('');
    var myName = '';

    numbers.forEach(function(number) {
        myName += String.fromCharCode(97 + number);
    });

    return myName;
}

var name = spaghettiName(30);
var brain = new SpaghettiBrain(name);

for (var i = 0; i < 100; i++) {
    brain.talk();
}

