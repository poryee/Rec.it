//-----------------------------------------------
// Rec.it chrome extension javascript
// ----------------------------------------------

//-----------------------------------------------
// Rec.it
// prototype attribute allow us to append new attribute function into constructor
// rewrite in ES6
//----------------------------------------------

class RecIT{
		
	constructor(){
		
		chrome.runtime.sendMessage({popupmsg: "get_status"}, function(response) {
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
		//this.recorder.start();
		
		chrome.runtime.sendMessage({popupmsg: "start"}, ((response) => {
			//alert("is active: " + response.active + ", is empty: " + response.empty);
		
		}));
	
	}
	
	
	pause(){
	
		var e = document.getElementById("pause");
		e.style.display = 'none';
		// show start
		e = document.getElementById("start");
		e.style.display = '';

		// pass message at the same time if already has recording show stop option
		chrome.runtime.sendMessage({popupmsg: "pause"}, ((response) => {
			// if not empty
			if(!response.empty){
				// display stop option
				e = document.getElementById("stop");
				e.style.display = '';
			}
				
		}));

	}
	
}



var ui;

// bind events to ui elements
window.onload = (()=>{
    ui = new RecIT();
	document.querySelector('#start').onclick=(() => {ui.start(); return false;});
	document.querySelector('#pause').onclick=(() => {ui.pause(); return false;});
    //document.querySelector('#stop').onclick=(() => {ui.stop(); return false;});
    //document.querySelector('#export').onclick=(() => {ui.export(); return false;});
    
});