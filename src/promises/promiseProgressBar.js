import * as Promise from 'bluebird';
// console.log('eco');
import progressBar2 from './progressBar2';
import streamNumbers from './streamNumbers';

var noop = function () {
    return this;
}

function UserCanceledError() {
    this.name = 'UserCanceledError';
    this.message= 'User canceled dialog';
}

UserCanceledError.prototype = Object.create(Error.prototype);

function Dialog() {
    this.setCallbacks(noop, noop);
}

Dialog.prototype.setCallbacks= function (okCallback, cancelCallback) {
    this._okCallback = okCallback;
    this._cancelCallback= cancelCallback;

    return this;
}

Dialog.prototype.waitForUser= function () {
    var    _this= this;

    return new Promise(function(resolve, reject){
        _this.setCallbacks(resolve, reject);
    });
}


Dialog.prototype.cancel= function() {
    this._cancelCallback(new UserCanceledError());
}

Dialog.prototype.show= noop;
Dialog.prototype.hide= noop;

function ProgressDialog() {
    Dialog.call(this);
    this.el = document.getElementById('progress-dialog');
    this.messageEl = this.el.querySelector('.message');
    this.progressBar = this.el.querySelector('.progress-bar>div');
    this.cancelButton = this.el.querySelector('button.cancel');
    this.attachDomEvents();
}

ProgressDialog.prototype = Object.create(Dialog.prototype);
ProgressDialog.prototype.attachDomEvents = function() {
    var _this = this;
    this.cancelButton.addEventListener('click', function() {
        _this.cancel();
    })
}

ProgressDialog.prototype.show = function(message) {
    this.messageEl.innerHTML= '' + message;
    this.el.className = '';
    return this;
}

ProgressDialog.prototype.hide = function () {
    this.el.className = 'hidden';
    return this;
}

ProgressDialog.prototype.setProgress = function(percent) {
    this.progressBar.style.width= percent+'%';
}
/**
 *test
 *
 * @param {*} progressCallback
 * @returns
 */
function dealyPromise(progressCallback) {
    
    var step = 10;
    return new Promise(function(resolve, reject){
        var progress=0-step;

        function nextTick() {
            if (process >=100) {
                resolve('done')
            }
            else {
                progress+=step;
                progressCallback(progress);
                setTimeout(nextTick, 500);
            }
        }
        nextTick();
    });
}




document.addEventListener('DOMContentLoaded', function(){

    progressBar2();
    var button = document.getElementById('action'),
    output = document.getElementById('output'),
    prompt = new ProgressDialog();

    button.addEventListener('click', function(){
        var pendingProgress = true;
        var waitForPromise = dealyPromise(function(progress){
            if(pendingProgress) {
                prompt.setProgress(progress);
            }
        });
        button.disabled = true;
        prompt.show('Simultateing a file upload');

        Promise.race([waitForPromise, prompt.waitForUser()])
        .then(function(){
            output.innerHTML = 'Progress completed';
        })
        .catch(UserCanceledError, function() {
            output.innerHTML = 'Progress canceled by user';
        })
        .catch(function(e){
            console.log('Error',e)
        })
        .finally(function(){
            pendingProgress = false;
            button.disabled = false;
            prompt.hide();
        })
    })

    // -------------------------------
    var stopper = document.getElementById("stopper");
    var prg_container = document.getElementsByClassName("progress-wrapp")[0];


    
    
        function createPrgItem () {
            var prg_item = document.createElement("div");
                prg_item.classList.add("prg-item");
            return prg_item;
        }
        
    function stopIterator(evt) {
        console.log(evt, itv);
    }


    var cx =0;
    var  streamNumbersIt = streamNumbers();
    var itv =  streamNumbersIt.next();     
    var intervalCx =    setInterval(function(){
        console.log(cx++)
        itv =  streamNumbersIt.next();     
        prg_container.append(createPrgItem())
            if (itv.done) {
                clearInterval(intervalCx);
            }
        }, 1000);

    
    // var itv =  streamNumbersIt.next();     
    // stopper.addEventListener("click", stopIterator);
    // do {
    //     itv =  streamNumbersIt.next();     
    //     console.log(itv);
    // } while  (!itv.done)
        
    
})
