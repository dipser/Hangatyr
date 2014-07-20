/**
 * Commands:
 *
 * defaults (read | read-type | write) <domain> <key> <value>
 *
 * Liste: "defaults domains"
 * Alle Einstellungen: "defaults read <domain>"
 * Read Type: "defaults read-type <domain> <key>
 * Read:  "defaults read com.apple.finder AppleShowAllFiles"
 * Write: "defaults write com.apple.finder AppleShowAllFiles -bool true && killall Finder"
 * Revert to the default setting: defaults delete com.apple.finder
 *
 * <domain> = com.apple.finder
 * <key> = AppleShowAllFiles
 * <value>:
 *     <value_rep>
 *     -string <string_value>
 *     -data <hex_digits>
 *     -int[eger] <integer_value>
 *     -float  <floating-point_value>
 *     -bool[ean] (true | false | yes | no)
 *     -date <date_rep>
 *     -array <value1> <value2> ...
 *     -array-add <value1> <value2> ...
 *     -dict <key1> <value1> <key2> <value2> ...
 *     -dict-add <key1> <value1> ...
 *
 */

exports.log = function() {
	console.log("commands loaded")
}

exports.data = {



	//Grab 	File type for screen captures
	//defaults write com.apple.screencapture type -string 

	// Show X-ray for folders with custom icons
	// 10.6
	//defaults write com.apple.finder DisableXRayForFoldersWithCustomIcons -boolean-neg 
	// Finder
	"FinderShowAllFiles" : {
		// defaults write com.apple.finder AppleShowAllFiles -bool true && killall Finder
		"read" : "defaults read <domain> <key>",
		"os" : ["10.8"],
		"domain" : "com.apple.finder",
		"key" : "AppleShowAllFiles",
		"type" : "bool",
		"view" : {
			"title" : "Alle Dateien zeigen",
			"description" : "Dateien beginnend mit einem Punkt werden standardmäßig ausgeblendet.",
			"form" : [{"checkbox":{"name":"this", "id":"this", "onclick":"action"}}],
			"action" : "defaults write <domain> <key> -<type> <%value> && killall Finder",
			"%value" : function (self) { return $(self).prop('checked') ? "true" : "false"; },
			"set" : function (self, val) { $(self).prop('checked', castValue(val, 'bool')); }
		}
	},
	"FinderCreateDesktop" : {
		"read" : "defaults read <domain> <key>",
		"os" : ["10.8"],
		"domain" : "com.apple.finder",
		"key" : "CreateDesktop",
		"type" : "bool",
		"view" : {
			"title" : "Desktop erstellen",
			"description" : "Desktop wird erstellt mit eingeblendeten Dateien. Ausblenden des Desktops ist nützlich für Präsentationen.",
			"form" : [{"checkbox":{"name":"this", "id":"this", "onclick":"action"}}],
			"action" : "defaults write <domain> <key> -<type> <%value> && killall Finder",
			"%value" : function (self) { return $(self).prop('checked') ? "true" : "false"; },
			"set" : function (self, val) { $(self).prop('checked', val); }
		}
	},
	// Dock
	"DockAddSpacerTile" : {
		// defaults write com.apple.dock persistent-apps -array-add '{tile-data={}; tile-type="spacer-tile";}' && killall Dock
		"read" : false, // Nicht lesbar
		"os" : ["10.8"],
		"domain" : "com.apple.dock",
		"key" : "persistent-apps",
		"type" : "array-add", // 
		"value" : "'{tile-data={}; tile-type=\"spacer-tile\";}'",
		"view" : {
			"title" : "Abstandshalter",
			"description" : "Fügt im Dock ein transparentes Feld ein und kann zur Einteilung des Docks genutzt werden.",
			"form" : [{"button":{"name":"this", "id":"this", "value":"Hinzufügen", "onclick":"action"}}],
			"action" : "defaults write <domain> <key> -<type> <value> && killall Dock"
		}
	},
	// Dock
	"DockAddRecentTile" : {
		"read" : false,
		"os" : ["10.8"],
		// defaults write com.apple.dock persistent-others -array-add '{ "tile-data" = { "list-type" = 1; }; "tile-type" = "recents-tile"; }'; killall Dock 
		"domain" : "com.apple.dock",
		"key" : ["persistent-apps", "persistent-others"],
		"type" : ["array-add"],
		"value" : "'{ \"tile-data\" = { \"list-type\" = 1; }; \"tile-type\" = \"recents-tile\"; }'",
		"view" : {
			"title" : "Zuletzt benutzte Programme",
			"description" : "Hinzufügen eines Ordners, dass die zuletzt benutzten Programme anzeigt.",
			"form" : [
				{"select":{"name":"DockAddRecentTile-key", "id":"DockAddRecentTile-key", "options":{"persistent-apps":"Bei Applikationen", "persistent-others":"Bei Ordnern"}}},
				{"button":{"name":"this", "id":"this", "value":"Hinzufügen", "onclick":"action"}}
			],
			"action" : "defaults write <domain> <%key> -<type> <value> && killall Dock",
			"%key" : function () { return $('#DockAddRecentTile-key').val(); }
		}
	},
	// QuickLook
	// 10.7 10.8
	// defaults write com.apple.finder QLEnableTextSelection -boolean true && killall Finder
	"FinderQLEnableTextSelection" : {
		"read" : "defaults read <domain> <key>",
		"os" : ["10.7", "10.8"],
		"domain" : "com.apple.finder",
		"key" : "QLEnableTextSelection",
		"type" : "bool",
		"view" : {
			"title" : "QuickLook Text selektieren",
			"description" : "Macht Text in QuickLook selektierbar und damit auch kopierbar.",
			"form" : [{"checkbox":{"name":"this", "id":"this", "onclick":"action"}}],
			"action" : "defaults write <domain> <key> -<type> <%value> && killall Finder",
			"%value" : function (self) { return $(self).prop('checked') ? "true" : "false"; },
			"set" : function (self, val) { $(self).prop('checked', castValue(val, 'bool')); }
		}
	},
	// Every App
	// GlobalDocumentSaveNewDocumentsToCloud
	// defaults write /Library/Preferences/.GlobalPreferences NSDocumentSaveNewDocumentsToCloud -boolean 
	"EveryAppGlobalDocumentSaveNewDocumentsToCloud" : {
		"read" : "defaults read <domain> <key>",
		"os" : [],
		"domain" : "/Library/Preferences/.GlobalPreferences",
		"key" : "NSDocumentSaveNewDocumentsToCloud",
		"type" : "boolean",
		"view" : {
			"title" : "Cloudspeicherung von Dokumenten",
			"description" : "Dokumente standardmäßig in die Cloud speichern?",
			"form" : [{"checkbox":{"name":"this", "id":"this", "onclick":"action"}}],
			"action" : "defaults write <domain> <key> -<type> <%value> && killall Finder",
			"%value" : function (self) { return $(self).prop('checked') ? "true" : "false"; },
			"set" : function (self, val) { $(self).prop('checked', castValue(val, 'bool')); }
		}
	},
	// Every App 
	// Expand save dialogs by default
	// defaults write -g NSNavPanelExpandedStateForSaveMode -boolean 
	"EveryAppNavPanelExpandedStateForSaveMode" : {
		"read" : "defaults read <domain> <key>",
		"os" : [],
		"domain" : "-g",
		"key" : "NSNavPanelExpandedStateForSaveMode",
		"type" : "boolean",
		"view" : {
			"title" : "Erweiterter Speichern Dialog",
			"description" : "Den Speichern Dialog automatisch erweitern oder geschlossen lassen.<div class=\"note\">Restart erforderlich?</div>",
			"form" : [{"checkbox":{"name":"this", "id":"this", "onclick":"action"}}],
			"action" : "defaults write <domain> <key> -<type> <%value>",
			"%value" : function (self) { return $(self).prop('checked') ? "true" : "false"; },
			"set" : function (self, val) { $(self).prop('checked', castValue(val, 'bool')); }
		}
	},
	//chflags nohidden ~/Library/
	//chflags hidden ~/Library/
	"LibraryHidden" : {
		"read" : "ls -ldO ~/Library/ | awk '{ if($5==\"hidden\") { print $5 } else { print \"nohidden\" } }'",
		"os" : ["10.8"],
		"view" : {
			"title" : "~/Library anzeigen",
			"description" : "Anzeigen des Benutzer-Library Verzeichnis.",
			"form" : [{"checkbox":{"name":"this", "id":"this", "onclick":"action"}}],
			"action" : "chflags <%key> ~/Library",
			"%key" : function (self) { return $(self).prop('checked') ? "nohidden" : "hidden"; },
			"set" : function (self, val) { $(self).prop('checked', (val=="nohidden") ); }
		}
	},

	//Enable Trackpad Tap to Click at Login Screen
	// 10.5
	//defaults write /Library/Preferences/.GlobalPreferences com.apple.mouse.tapBehaviour -integer 
	/*"EveryAppTapBehaviour" : {
		"read" : "defaults read <domain> <key>",
		"os" : ["10.5"],
		"domain" : "/Library/Preferences/.GlobalPreferences",
		"key" : "com.apple.mouse.tapBehaviour",
		"type" : "integer",
		"view" : {
			"title" : "",
			"description" : "",
			"form" : [{"checkbox":{"name":"this", "id":"this", "onclick":"action"}}],
			"action" : "defaults write <domain> <key> -<type> <%value>",
			"%value" : function (self) { return $(self).prop('checked') ? "true" : "false"; },
			"set" : function (self, val) { $(self).prop('checked', castValue(val, 'bool')); }
		}
	},*/
};



//# Trackpad: enable tap to click for this user and for the login screen
//defaults write com.apple.driver.AppleBluetoothMultitouch.trackpad Clicking -bool true
//defaults -currentHost write NSGlobalDomain com.apple.mouse.tapBehavior -int 1
//defaults write NSGlobalDomain com.apple.mouse.tapBehavior -int 1

/*


# Save screenshots to the desktop
defaults write com.apple.screencapture location -string "$HOME/Desktop"

# Save screenshots in PNG format (other options: BMP, GIF, JPG, PDF, TIFF)
defaults write com.apple.screencapture type -string "png"

# Disable shadow in screenshots
defaults write com.apple.screencapture disable-shadow -bool true

# Enable subpixel font rendering on non-Apple LCDs
defaults write NSGlobalDomain AppleFontSmoothing -int 2

# Enable HiDPI display modes (requires restart)
sudo defaults write /Library/Preferences/com.apple.windowserver DisplayResolutionEnabled -bool true

# Finder: show all filename extensions
defaults write NSGlobalDomain AppleShowAllExtensions -bool true

# Finder: show status bar
defaults write com.apple.finder ShowStatusBar -bool true

# Finder: show path bar
defaults write com.apple.finder ShowPathbar -bool true

# Display full POSIX path as Finder window title
defaults write com.apple.finder _FXShowPosixPathInTitle -bool true

# When performing a search, search the current folder by default
defaults write com.apple.finder FXDefaultSearchScope -string "SCcf"

# Disable the warning when changing a file extension
defaults write com.apple.finder FXEnableExtensionChangeWarning -bool false


# Avoid creating .DS_Store files on network volumes
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true


# Use list view in all Finder windows by default
# Four-letter codes for the other view modes: `icnv`, `clmv`, `Flwv`
defaults write com.apple.finder FXPreferredViewStyle -string "Nlsv"


# Set Safari’s home page to `about:blank` for faster loading
defaults write com.apple.Safari HomePage -string "about:blank"


# Enable Safari’s debug menu
defaults write com.apple.Safari IncludeInternalDebugMenu -bool true



# Only use UTF-8 in Terminal.app
defaults write com.apple.terminal StringEncodings -array 4



# Use plain text mode for new TextEdit documents
defaults write com.apple.TextEdit RichText -int 0
# Open and save files as UTF-8 in TextEdit
defaults write com.apple.TextEdit PlainTextEncoding -int 4
defaults write com.apple.TextEdit PlainTextEncodingForWrite -int 4

*/


//sudo softwareupdate -l
//sudo softwareupdate -i -a
