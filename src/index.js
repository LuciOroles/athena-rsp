import { makeButton, makePlayable, disableEnableButtons, buttonReset, makeActionButton, addRaceWatchForBtns, removeRaceWatchForBtns } from "./button";
import columns from './columns.css';
import {  fromEvent, Subject, combineLatest } from 'rxjs';
import _button_texts from './button.texts';
import { map } from 'rxjs/operators';
import referee from './referee';
import resetRound from './resetRound';
import bordGenerator from './bordGenerator';
import timmerDom from './timmer.dom';
import player from './player';
import gameWord from './gameWord';

const playground = document.getElementById("playground");


var _other = {
    action_button_class: "act-btn",
    wait_for : 9
};

/**
 * @var notifier - subject that is publishing events related to play/challenge states
 */
var notifier = new Subject();
var ply1 = player('player 1'),
    ply2 = player('player 2');

makeActionButton (makeButton, _button_texts.start, _other.action_button_class, ply1, ply2, notifier);
makeActionButton (makeButton, _button_texts.start, _other.action_button_class, ply2, ply1, notifier);
gameWord.addPlayer(ply1)
gameWord.addPlayer(ply2);


/**
 * @method subscribe handles click events on the action buttons, check if the game is ready to be played, players have accepted, 
 * it also handles timer, that controls the round, it will reset the round in 9 seconds regarldess number of answers
 */
notifier.subscribe((message) => {
    if (message) {
        if (gameWord) {
            /** initial state of the game is idle, it will move to challenge when any of the players pushes the button */
            if (gameWord.current_state === "idle") {
                gameWord.current_state = gameWord.states[1]; // to challage state
                message.player.possible_actions = [];
                message.player.buttons.game.disabled = true;
                //change message to other player:
                message.other.buttons.game.innerHTML = _button_texts.ready;
                return;
            }
            /** if this condition is passed the  game is `on` the 3 assets buttons will be available for 9 seconds*/
            if (gameWord.current_state === "challenge") {
                gameWord.current_state = gameWord.states[2]; // the challenger accepted
                message.player.buttons.game.disabled = true;
                message.player.possible_actions = [];
                message.player.buttons.game.innerHTML = _button_texts.go;
                message.other.buttons.game.innerHTML = _button_texts.go;
                disableEnableButtons(message.player.buttons.assets, false);
                disableEnableButtons(message.other.buttons.assets, false);
                addRaceWatchForBtns(message.player);
                addRaceWatchForBtns(message.other);
                gameWord.controllAnswers = combineLatest(message.player.acted, message.other.acted);
                /**
                 * the 3 controls per players are wrapped insde a  rxjs/race  observable
                 * when both of the group are clicked: rxjs/all is triggered, the subscriber below, this will change the score, and reset round
                 */
                let allSub = gameWord.controllAnswers.subscribe((allAnswers) => {
                    let winer_nr = referee(...allAnswers);
                    if (!isNaN(winer_nr) && winer_nr !== null) {
                        gameWord.players[winer_nr].score++;
                        gameWord.players[winer_nr].scoreElement.innerHTML = gameWord.players[winer_nr].score;
                    }
                    allSub.unsubscribe();
                    //stoping counter and reseting the state
                     resetRound(disableEnableButtons, buttonReset, message, gameWord);
                });
                /** @method  timmerSubscriber watch over the counter, if it's reach it resets
                 * @method gameWord.timmer it's a interval rxjs observable that emmits each second
                */
                gameWord.timmerSubscriber = gameWord.timmer.subscribe((count) => {
                    if (count == _other.wait_for) {
                        resetRound(disableEnableButtons, buttonReset, message, gameWord);
                    } else {
                        document.getElementById("seconds_nr").innerHTML = _other.wait_for -count;
                    }
                })
                return;
            }
        }
    }
})


/**
 * @var bord  is the DOM element/component of the application
 * @var p_board  is a DOM element that has the structure for a player/buttons/score/name
 * @var h2 observrable will emit the player and it's play(assets) of the 3
 */
let bord = bordGenerator('bord-wrapper', 'row', 1, 'column', 3);
for (let p = 0; p < gameWord.players.length; p++) {
    let p_board = bordGenerator('empty', 'bord-player', 1, ['player-action', 'player', 'player-score', 'blue-column'], 4);
    for (let i = 0; i < gameWord.game_assets.length; i++) {
        let _temp = makePlayable(gameWord.game_assets[i].name),
            _temp_wrapper = document.createElement('div');
        _temp_wrapper.classList.add('buttons-wrapper');
        gameWord.players[p].buttons.assets.push(_temp);
        let handler = fromEvent(_temp, 'click');
        let h2 = handler.pipe(map(event => { return { play: gameWord.game_assets[i], player: p } }));
        gameWord.players[p].actions.push(h2);
        _temp_wrapper.appendChild(_temp)
        p_board.logic.rows[0].cols[3].appendChild(_temp_wrapper);
    } //end game assets;
    p_board.logic.rows[0].cols[0].appendChild(gameWord.players[p].buttons.game);
    p_board.logic.rows[0].cols[1].innerHTML = gameWord.players[p].name;
    p_board.logic.rows[0].cols[2].innerHTML = gameWord.players[p].score;
    gameWord.players[p].scoreElement = p_board.logic.rows[0].cols[2];
    gameWord.players[p].dom = p_board;
    //initial state of the buttons is set to disabled; they could be hidden and animated as enhancement 
    disableEnableButtons(gameWord.players[p].buttons.assets, true);
    if (p === 0) bord.logic.rows[0].cols[0].appendChild(p_board.dom) 
    if (p === 1) bord.logic.rows[0].cols[2].appendChild(p_board.dom)
}
    bord.logic.rows[0].cols[1].innerHTML = timmerDom(); //dummy html to show the timer, a more elegant structure might be created :)  
    playground.appendChild(bord.dom);
