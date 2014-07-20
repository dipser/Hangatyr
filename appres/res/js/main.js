var gui = require("nw.gui");
var sys = require('sys')
var exec = require('child_process').exec;
var child;

//console.log(window.navigator.language); //=> de

global.window = window;
global.document = document;
global.$ = $;

// Standard Menu
//var m = require('./res/js/windowmenu');//  $.getScript()

// Befehle
var COMMANDS = require('./res/js/commands').data;




// jQuery Ready
$(function() {

	//if (value instanceof Array) {}
  
	//process.versions['node-webkit'];
	//process.platform
	//process.arch
	//process.version
	//process.versions
	//os.type()
	$('#system').html(
		//'Mac OS X ' + '10.8.5'
	);

	// Beim ersten Start Standard-Werte speichern
	//mkdir ~/Library/Application\ Support/Hangatyr/
	//cd ~/Library/Application\ Support/Hangatyr/
	//echo -e "Hi\nabcd" >> standard.json


	// Init GUI
	$.each(COMMANDS, function (k, v) { // k=id; v=object
		var html  = '<div class="row '+ k +'">';
			html += '  <div class="col head">';
			html += '    <h3 class="title">'+ v.view.title +'</h3>'
			html += '  </div>'
			html += '  <div class="col text">'+ v.view.description +'</div>';
			html += '  <div class="col form">'+ JSON2HTML(v.view.form, k) +'</div>'
			html += '</div>';
		$('#commands').append(html);
		// Setup event handler
		JSON2OnClickEvent(k, v);
		// Get and set Value
		if (!!v.view.set && !!v.read) {
			var cmdread = replaceArgs(v.read, k, v);
			//console.log(cmdread);
			exec(cmdread, function (error, stdout2, stderr) {
				v.view.set($('#'+k), stdout2);
			});
		}
	});


	


	// GUI preset
	//presetValues();

	/*$('#FinderShowAllFiles').on('click', function () {
		val = $(this).prop('checked');
		//val = val ? "YES": "NO";
		execute('FinderShowAllFiles', [val]);
	});*/


	//localStorage.love = "luyao";
	//sessionStorage.life = "";
	//console.log(localStorage.love);


	// Alles fertig. Fenster anzeigen.
	//gui.Window.get().showDevTools()
	//gui.Window.get().show();

	/*gui.App.on('open', function(cmdline) {
		console.log('command line: ' + cmdline);
	});*/

});




//#######################################################################################################


function JSON2HTML(json, id) {
	var html = '';
	for (var i in json) {
		var elem = json[i];
		if (!!elem.button) {
			button = elem.button;
			button.name = button.name=='this' ? id : button.name;
			button.id = button.id=='this' ? id : button.id;
			html += '<input type="button" name="'+ button.name +'" id="'+ button.id +'" value="'+ button.value +'" />';
		}
		else if (!!elem.select) {
			select = elem.select;
			select.name = select.name=='this' ? id : select.name;
			select.id = select.id=='this' ? id : select.id;
			html += '<select name="'+ select.name +'" id="'+ select.id +'">';
			for (var o in select.options) {
				html += '<option value="'+ o +'">'+ select.options[o] +'</option>';
			}
			html += '</select>';
		}
		else if (!!elem.checkbox) {
			checkbox = elem.checkbox;
			checkbox.name = checkbox.name=='this' ? id : checkbox.name;
			checkbox.id = checkbox.id=='this' ? id : checkbox.id;
			html += '<input type="checkbox" name="'+ checkbox.name +'" id="'+ checkbox.id +'" />';
		}
	}
	return html;
}


function JSON2OnClickEvent(k, v) { // k=id; v=object
	//"action" : "defaults write <domain> <key> -<type> <%value> && killall Finder",
	//"%value" : function (self) { return $(self).prop('checked') ? "true" : "false"; }

	$(document).on('click', '#'+k, function (e) {
		//e.preventDefault();
		var action = replaceArgs(v.view.action, k, v);
		execute(action, k);
	});
}


/**
 *
 */
function replaceArgs(str, k, v) { // str=string, k=id; v=object
	//"action" : "defaults write <domain> <key> -<type> <%value> && killall Finder",
	//"%value" : function (self) { return $(self).prop('checked') ? "true" : "false"; }

	// Erkenne vars
	var vars = str.match(/<(.+?)>/g);
	for (var i in vars) {
		vars[i] = vars[i].split('<').join('').split('>').join('');
	}
	//console.log(vars);
    //var vars = ['domain', 'key', 'type', '%value'];

    var action = str;
    for (var i in vars) {
    	arg = '';
    	if (vars[i] == 'domain') { arg = v.domain; }
    	if (vars[i] == 'key') { arg = v.key; }
    	if (vars[i] == 'type') { arg = v.type; }
    	if (vars[i] == 'value') { arg = v.value; }
    	if (vars[i][0] == '%') { arg = v.view[vars[i]]($('#'+k)); }
    	action = action.split('<'+ vars[i] +'>').join(arg);
     	//console.log(vars[i] + ' :: ' + arg);
    }
	//console.log(action);
	return action;
}


/**
 * Ausführen eines Terminal-Befehls
 *
 */
function execute(cmd, id) {

	// execute example `pwd`
	console.log(cmd);
	child = exec(cmd, function (error, stdout1, stderr) {

		if (!!COMMANDS[id].view.set && !!COMMANDS[id].read) {
			var cmdread = replaceArgs(COMMANDS[id].read, id, COMMANDS[id]);
			console.log(cmdread);
			exec(cmdread, function (error, stdout2, stderr) {
				COMMANDS[id].view.set($('#'+id, stdout2));
			});
		}

		//if (error !== null) { console.log('exec error: ' + error); }
	});
}


/**
 * Konfigurationen einlesen
 */
function readConfigurations() {
 	for (var i in COMMANDS) {

 	}
 }


/**
 * Vereinheitlicht den übergebenen Wert zu true, false oder belässt den Standardwert bestehen
 *
 * @param val Ein nicht vereinheitlichter Wert
 * @param type Typ zur Vereinheitlichung (bool,int,float)
 * @return Vereinheitlichter Boolean-Wert (true / false), sonst Originalwert
 */
function castValue(val, type) {
	var type = type || 'bool';

	vallc = $.trim(val).toLowerCase();

	if (type == 'bool' && (vallc == 1 || vallc == true || vallc == 'true' || vallc == 'yes')) {
		return true;
	}
	if (type == 'bool' && (vallc == 0 || vallc == false || vallc == 'false' || vallc == 'no')) {
		return false;
	}

	return val;
}
global.castValue = castValue;




/**
 * Software in /Applications und ~/Applications erkennen
 */
function detectSoftware() {

}


/**
 * Werte lesen und in der Ansicht setzen
 */
function presetValues() {

}
