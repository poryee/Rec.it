//-----------------------------------------------
// Rec.it chrome extension javascript
// ----------------------------------------------
function RecProxy() {
    this.active = null;
}
});


// if start send message to background.js to save state start
RecProxy.prototype.start = function(url) {
	chrome.tabs.getSelected(null, function(tab) {
	    chrome.runtime.sendMessage({action: "start", recorded_tab: tab.id, start_url: url});
	});
}

RecProxy.prototype.pause = function() {
    chrome.runtime.sendMessage({action: "pause"}, function(response){
		if(response.pause){
			// if there is item append in list
			if(!response.empty){
				return true;
			}
		}
	});
}

RecProxy.prototype.stop = function() {
    chrome.runtime.sendMessage({action: "stop"});
}

RecProxy.prototype.open = function(url, callback) {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, {action: "open", 'url': url}, callback);
    });
}

//-----------------------------------------------
// Rec.it
// prototype attribute allow us to append new attribute function into constructor
// rewrite in ES6
//----------------------------------------------

class RecIT{
		
	constructor(){
		// listen message
		
		this.recorder = new RecProxy();
		chrome.runtime.sendMessage({action: "get_status"}, function(response) {
			if (response.active) {
				// if active show pause only
				var e = document.getElementById("pause");
				e.style.display = '';
				e = document.getElementById("start");
				e.style.display = 'none';
				e = document.getElementById("export");
				e.style.display = 'none';
						
			} else {
				if (!response.empty) {
					// if not active and not empty
					// show stop and start
					var e = document.getElementById("stop");
					e.style.display = '';
					e = document.getElementById("start");
					e.style.display = '';
					e = document.getElementById("export");
					e.style.display = 'none';
				}
					chrome.tabs.getSelected(null, function(tab) {
				});
			}
		});
		
	}
	
	start(){
	
		// set css toggle start and pause
		var e = document.getElementById("pause");
		e.style.display = '';
		e = document.getElementById("start");
		e.style.display = 'none';
		// pass message
		this.recorder.start();
	
	}
	
	pause(){
		// set css toggle pause and start
		var e = document.getElementById("pause");
		e.style.display = 'none';
		// show start
		e = document.getElementById("start");
		e.style.display = '';

		// pass message at the same time if already has recording show stop option
		if(this.recorder.pause()){
			e = document.getElementById("stop");
			e.style.display = '';
		};
	}

	
	
	
	stop(){
		// set css on stop you can choose to export or start again
		var e = document.getElementById("stop");
		e.style.display = 'none';
		e = document.getElementById("start");
		e.style.display = '';
		e = document.getElementById("export");
		e.style.display = '';
		// pass message
		this.recorder.stop();
	}


	export(){
		chrome.tabs.create({url: "./recit.html"});
	}
}



var ui;

// bind events to ui elements
window.onload = function(){
    ui = new RecIT();
	document.querySelector('#start').onclick=function() {ui.start(); return false;};
	document.querySelector('#pause').onclick=function() {ui.pause(); return false;};
    document.querySelector('#stop').onclick=function() {ui.stop(); return false;};
    document.querySelector('#export').onclick=function() {ui.export(); return false;};
    
}