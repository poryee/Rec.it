//-----------------------------------------------
// Rec.it chrome extension javascript
// ----------------------------------------------
function RecProxy() {
    this.active = null;
}

// if start send message to background.js to save state start
RecProxy.prototype.start = function(url) {
	chrome.tabs.getSelected(null, function(tab) {
	    chrome.runtime.sendMessage({action: "start", recorded_tab: tab.id, start_url: url});
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
//----------------------------------------------

function RecUI() {
	this.recorder = new RecProxy();
	chrome.runtime.sendMessage({action: "get_status"}, function(response) {
	    if (response.active) {
	    	ui.set_started();
	    } else {
	    	if (!response.empty) {
	            ui.set_stopped();
	        }
	        chrome.tabs.getSelected(null, function(tab) {
                  document.forms[0].elements["url"].value = tab.url;
            });
	    }
	});
  
}

RecUI.prototype.start = function() {
    var url = document.forms[0].elements["url"].value;
    if (url == "") {
        return false;
    }
    if ( (url.indexOf("http://") == -1) && (url.indexOf("https://")) ) {
        url = "http://" + url;
    }
    ui.set_started()
    ui.recorder.start(url);
  
    return false;
}

RecUI.prototype.set_started = function() {
  var e = document.getElementById("stop");
  e.style.display = '';
  e.onclick = ui.stop;
  e = document.getElementById("start");
  e.style.display = 'none';
  e = document.getElementById("export");
  e.style.display = 'none';
}

RecUI.prototype.stop = function() {
  ui.set_stopped();
	ui.recorder.stop();
	return false;
}

RecUI.prototype.set_stopped = function() {
	var e = document.getElementById("stop");
	e.style.display = 'none';
	e = document.getElementById("start");
	e.style.display = '';
	e = document.getElementById("export");
	e.style.display = '';
}

RecUI.prototype.export = function(options) {
  chrome.tabs.create({url: "./recit.html"});
}

var ui;

// bind events to ui elements
window.onload = function(){
    document.querySelector('#start').onclick=function() {ui.start(); return false;};
	document.querySelector('#pause').onclick=function() {ui.pause(); return false;};
    document.querySelector('#stop').onclick=function() {ui.stop(); return false;};
    document.querySelector('#export').onclick=function() {ui.export(); return false;};
    ui = new RecUI();
}