// have state to start listening based on background

// only content script can listen to event clicks


var recording = false;

var port = chrome.runtime.connect({name:"contentscript"});
// persistent connection with background
port.onMessage.addListener((msg,sender) => {
	// to run specific action when activated by background	
	switch(msg.action){
		case "start":
			console.log("Received start command from background");
			console.log("Starting Event Listener");
			eventStart();
			break;
			
		case "pause":
			alert("Pause");
			eventPause();
			break;
		
			
		case "stop":
		    console.log("Received stop command from background");
        	console.log("Stop Event Listener");
        	eventStop();
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
	recording = true;
	window.addEventListener("click", getClickedEvent);
	window.addEventListener("keydown", getKeyEvent);
		
});


eventPause = (() => {
	//alert("pause");

		
});

eventStop = (() => {
	recording = false;
    window.removeEventListener("click", getClickedEvent);
    window.removeEventListener("keydown", getKeyEvent);


});

eventListener = (() => {
	
	alert("you clicked?");
});


//Event Handler
function getClickedEvent(clickEvt){
    clickEvt.stopPropagation();
    console.log("Event Tag Name " + clickEvt.target.tagName);
    console.log("Event Type = " + clickEvt.type);
    console.log("Event Object = " + clickEvt.target);
    //Handle ComboBox
    if(clickEvt.target.tagName == "SELECT"){
         console.log("Combo Box Value  = " + clickEvt.target.value);
         var clickAction = [clickEvt.target, clickEvt.type,clickEvt.target.value];
    }
    else{
        var clickAction = [clickEvt.target, clickEvt.type];
   }
   console.log("Object Send to background "  + clickAction);
   chrome.runtime.sendMessage({action: "append", obj: clickAction});
}

function getKeyEvent(keyEvt){

    console.log("Event Type = " + keyEvt.type);
    console.log("Event Object = " + keyEvt.target);
    console.log("Event Key Code = " + keyEvt.keyCode);

    var keyAction = [keyEvt.target, keyEvt.type, keyEvt.keyCode];
    console.log("Object Send to background "  + keyAction);
    chrome.runtime.sendMessage({action: "append", obj: keyAction});
}

