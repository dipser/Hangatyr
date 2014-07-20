/**
 * Window-Menu:
 *
 * Hangatyr.app
 * +- Hangatyr
 * +- Window
 * 
 */


var gui = window.require("nw.gui");
//gui.Window.get().menu = new gui.Menu({ type: 'menubar' }); // Standardmenu


var menu = new gui.Menu();

// Get the current window
var win = gui.Window.get();

// Create a menubar for window menu
var menubar = new gui.Menu({ type: 'menubar' });

// Create a menuitem
var datei = new gui.Menu();
datei.append(new gui.MenuItem({
	label: 'Lade Konfiguration...',
	click: function() {
		// Aktion
		var element = document.createElement('div');
		element.appendChild(document.createTextNode('Inhalt'));
		document.body.appendChild(element);
	}
}));

// You can have submenu!
menubar.append(new gui.MenuItem({ label: 'Datei', submenu: datei }));

// Assign the menubar to window menu
win.menu = menubar;


