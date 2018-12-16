var gameWord =
    function() {

    	var  players: [] , 
    	game_states = 
    	 ["no_players",
    	  "players_ready",
    	  "challenge", 
    	  "accepted", 
    	  "playing",
    	  "stopped" ],
    	game_status = {
    		state: game_states[0],
            games: {
                played: 0,
                total: 9
            },
            score : [0,0],
            round : {
            	number: 0,
            	remaining_seconds:20
            }
    	};



    	function resetScore (score /*expected array of 2*/ ) {
    		score = [0,0];
    	}

        return {
        	events: {
        		player_connected : function( player ) {
        			if (players.length<2) {
        				players.push(player);
        			}
        			if (players.length===2) {
        				game_status.state = game_states[1];
        				resetScore(game_status.score);
        			}
        		},
        		player_disconnected: function(player) {
        			var indexOfPlayer = players.indexOf(player);
        			if (indexOfPlayer>-1) {
        				players.splice(indexOfPlayer,1);
        			}
        			resetScore(game_status.score);
        			game_status.statuus= game_states[0];
        		},
        		startRoundRequest: function(player) {

        		},
        		stopRound: function() {

        		}
        	}
        }
    };


module.exports = gameWord;