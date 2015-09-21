function SpaghettiBrain() {
    var characters = []; 
    var thoughts = [];

    this.think = function() {
        var item = parseInt(Math.random() * characters.length);
        var thought = characters[item];

        (existsThought(thought)?
            thought = 'Uhm... I already said that : ' + thought : 
            addThought(thought)) 
        return thought; 
    };

    this.talk = function() {
        console.log('Hi hero, i think that: ' + this.think());
    };

    this.SpaghettiName = function(amount) { 
        characters = generateSpaghettiName(amount); 
        return characters.join(); 
    }

    function generateSpaghettiName(amount) {
        var name = []; 
        for (var i = 0; i < amount; i++)
            name.push(
                String.fromCharCode( 97 + 
                    parseInt( Math.round(Math.random() * 25)) 
                )
            ); 
        return name; 
    } 

    function addThought(th) { thoughts.push(th) }; 
    function existsThought(th) { return (thoughts.indexOf(th)>-1) }; 
}

var brain = new SpaghettiBrain();
var name = brain.SpaghettiName(30); 
for (var i = 0; i < 100; i++) {
    brain.talk();
}
