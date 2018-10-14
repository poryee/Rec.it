// array to hold item clicked
var testcase_items = new Array();
var active = false;
var empty = true;
var tab_id = null;
// persistent channel not communicate back to content script
var bg_port = null;

// persistent connection with contentscript
chrome.runtime.onConnect.addListener((port) => {
	console.log("background listening");
	bg_port = port;
	bg_port.onMessage.addListener((msg) => {
		
		// only message passing
		if(msg.action == "get_status"){
			console.log("keep alive");
			bg_port.postMessage({action:"status", "active": active, "empty": empty});
		}
		
	});
});

// set status and update contentscript using port
start = (() => {
	// set status
	active = true;
	bg_port.postMessage({action:"start"});
});


pause = (() => {
	// set status
	active = false;
	bg_port.postMessage({action:"pause"});
});



// temp listener from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.popupmsg){
		case "start":
			// update contentscript through persistent connection
			start();
			// respond with status
			sendResponse({"active": active, "empty": empty});
			break;
			
		case "pause":
			pause();
			// respond with status
			sendResponse({"active": active, "empty": empty});
			break;
				
		case "stop":
			stop();
			break;
		case "get_status":
			sendResponse({"active": active, "empty": empty});
			break;
	}    
});

