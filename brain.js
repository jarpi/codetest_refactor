function SpaghettiBrain(text) {
    var characters = text.split('');
    var thoughts = [];

    this.think = function() {
        
        var item = parseInt(Math.random() * characters.length, 10);
        var thought = characters[item];

        (existsThought(thought)?
            thought = 'Uhm... I already said that : ' + thought : 
            addThought(thought)) 
        return thought; 
    };

    this.talk = function() {
        console.log('Hi hero, i think that: ' + this.think());
    };

    function addThought(th) { thoughts.push(th) }; 
    function existsThought(th) { return (thoughts.indexOf(th)>-1) }; 
}

function SpaghettiName(amount) {
    var results = [];
    for (var i = 0; i < amount; i++) {
        results.push( Math.floor(Math.random() * 25) );
    }

    var myName = results.reduce(
        function(p,c) {
            return p+= String.fromCharCode( 97 + parseInt(c,10) );
        }
        ,'');
    return myName;
}

var name = SpaghettiName(30);
var brain = new SpaghettiBrain(name);
console.dir(brain); 
for (var i = 0; i < name.length; i++) {
    brain.talk();
}
