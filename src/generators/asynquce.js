import ASQ from 'asynquence';
// import 'asynquence-contrib';
// import * as ASQC from 'asynquence-contrib/plugin.runner';

function fakeAjax(url, cb) {
    var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
    console.log(text);
}

function getFile(file) {
    return ASQ(function(done){
        fakeAjax(file, done);
    });
}



export default function () {
    
    return null;
    // ASQ().runner(function *loadFiles(){
    //     var p1 = getFile("file1"),
    //      p2 = getFile("file2"),
    //      p3 = getFile("file3");

    //      output( yield p1);
    //      output( yield p2);
    //      output( yield p3);
    // })


    ASQ(
        //step1
        function (done) {
            setTimeout(function(){
                    done('step1')
            }, 100 )
        },
        //step2
        function(done, greetings) {
            setTimeout(function(){
                done(greetings + " world");
            }, 100)
        }
    ).then(function(done, msg){
        setTimeout(function() {
            done(msg.toUpperCase())
        }, 100)
    }).then(function(done, msg){
        console.log(msg);
    });

    
}
