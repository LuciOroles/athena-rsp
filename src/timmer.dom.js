const timmerDom = function (argument) {
	return ` <div class="round">Round #<span id="round_nr">0</span></div>
                    <div class='green-column'>
                        <div class="timer-wrapper" id="timerx">
                        	<div class="beeper">...</div>
                            <div class="seconds" id="seconds_nr">
                                0
                            </div>
                        </div>
                    </div>
                </div>`
}

export default timmerDom;