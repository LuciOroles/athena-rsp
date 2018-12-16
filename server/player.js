var player = function (name){
    //name
    //assets list
    //state, current state of the player, idle, play, end
    //play
    this.name=name;

   return { 
    current_play: 0,
    plays: [], //array of assets
    play: function ( asset ) {
    		this.plays.push(asset);
    		this.current_play = this.plays.length-1;
    	}
	}
};

module.exports = player;