console.log("event listener started");
// have state to start listening based on background
// to run when activated by background


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "start") {
        //recorder.start();
		// so only start listener when play	
		start();
		
		// respond
        sendResponse({});
    }
    if (request.action == "stop") {
        //recorder.stop();
        sendResponse({});
    }
    if (request.action == "open") {
        //recorder.open(request.url);
        sendResponse({});
    }
    if (request.action == "addComment") {
        //recorder.addComment(request.text);
        sendResponse({});
    }
});

start = function(){
	alert("yeah event started!");
	window.addEventListener("click", ()=>{
			
				alert("you clicked?");
	});
}

//get current status from background
chrome.runtime.sendMessage({action: "get_status"}, function(response) {
	// get the ball rolling
    if (response.active) {
        start();
    }
});

alert("yeah event qwe!");
	