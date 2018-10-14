// have state to start listening based on background

// only content script can listen to event clicks



var port = chrome.runtime.connect({name:"contentscript"});
// persistent connection with background
port.onMessage.addListener((msg,sender) => {
	// to run specific action when activated by background	
	switch(msg.action){
		case "start":
			console.log("received start command from background");
			console.log("Hey im starting to listen for event!");
			eventStart();
			break;
			
		case "pause":
			alert("Pause");
			eventPause();
			break;
		
			
		case "stop":
			break;
			
		case "open":
			break;
			
		case "status":

			if(msg.active){
				// keep active
				eventStart();	
			}
			break;
			
	
	}
});

// poll for current state in background
port.postMessage({action: "get_status"});


eventStart = (() => {
	
	window.addEventListener("click", eventListener);
		
});


eventPause = (() => {
	//alert("pause");
	window.removeEventListener("click", eventListener);
	
		
});



eventListener = (() => {
	
	alert("you clicked?");
});
