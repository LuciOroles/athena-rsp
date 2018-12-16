import {fromEvent, race} from 'rxjs'

// take a str, the button label and return a element
/**
 *
 * @param {string} buttonName
 * @param {string} buttonClass
 * @returns {Element}
 */
const makeButton = (buttonName, buttonClass) => {
  const buttonLabel = `${buttonName}`;

  const button = document.createElement("button");
  	button.classList.add(buttonClass);
  button.innerText = buttonLabel;

  return button;
};

/** creates the 3 possible game buttons */

const makePlayable = function (_class_name) {
	const button = document.createElement("button");
		  button.type = "button"
		  button.classList.add(_class_name);
		 return button;
}


 const buttonReset = function (_button, _text) {
    _button.disabled = false;
    _button.innerHTML = _text;
}



const disableEnableButtons= function (buttonArray, _predicate) {
    for (let i = 0; i < buttonArray.length; i++) {
        buttonArray[i].disabled = _predicate;
    }
}
/**
 * 
 * @param {*} makeButton - function that creates the DOM button
 * @param {*} buttonText - the text of the button will change in accordance to game state
 * @param {*} buttonClass 
 * @param {*} ply1 - the player that is associated to the button
 * @param {*} ply2 - the other player
 * @param {*} notifier - rxjs subject that will push notifications on click
 */
const  makeActionButton = function  (makeButton, buttonText, buttonClass, ply1, ply2, notifier) {
    const p1 = makeButton(buttonText, buttonClass);
            p1.action_subject = fromEvent(p1, 'click');
            p1.action_subject.subscribe((e) => {
                notifier.next({
                    player: ply1,
                    other: ply2
                })
            });
        ply1.buttons.game = p1;
}


function addRaceWatchForBtns(player) {
    player.acted = race(player.actions);
    let receSubscriber = player.acted.subscribe((v) => {
        receSubscriber.unsubscribe();
    });
}

function removeRaceWatchForBtns(player) {
    player.acted = null;
}

export {	makeButton,	makePlayable, disableEnableButtons, buttonReset, makeActionButton, addRaceWatchForBtns, removeRaceWatchForBtns	};
