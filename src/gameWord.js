/**
    main object of the script, controls the game status and players
    @property {interval} gameWord.timmer   -  emits an integer each second, starting 0
    @property {player}   gameWord.player  - keeps the 2 player data, used to interact with changing properties of player
*/

import {  interval } from 'rxjs';
import _button_texts from './button.texts';

var gameWord = {
    states: ["idle", "challenge", "accepted"],
    current_state: "idle",
    players: [],
    rounds: 0,
    timmer: new interval(1000),
    timmerSubscriber: null,
    _button_texts: _button_texts,
    addPlayer : function(player) {
        this["players"].push(player);
    },
    game_assets: [{
        name: "rock",
        wins: "scissors"
    },
    {
        name: "scissors",
        wins: "paper"
    },
    {
        name: "paper",
        wins: "rock"
    }]
};

export default gameWord;