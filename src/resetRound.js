/**
 * cleans up and restes the state of the round
 * @param {function_name} disableEnableButtons 
 * @param {function_name} buttonReset 
 * @param  message  notifier mesage, containg the players
 * @param  gameWord master state object
 */
const resetRound = function function_name(disableEnableButtons,buttonReset, message, gameWord) {

	      			disableEnableButtons(message.player.buttons.assets, true);
                    disableEnableButtons(message.other.buttons.assets, true);
                    gameWord.rounds++;
                    document.getElementById("round_nr").innerHTML = gameWord.rounds;
                    /*important: unsubscribe from the interval event on reset*/
                    gameWord.timmerSubscriber.unsubscribe();
                    document.getElementById("seconds_nr").innerHTML = "0";
                    gameWord.current_state = "idle"
                    buttonReset(message.player.buttons.game, gameWord._button_texts.start);
                    buttonReset(message.other.buttons.game, gameWord._button_texts.start);
                    gameWord.controllAnswers = [];

}

export default resetRound;