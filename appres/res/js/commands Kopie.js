/**
 * Aliases:
 *
 * Beispiel:
 * #---[Sublime Text]---#
 * alias sublime='open -a "Sublime Text"'
 * #---[Sublime Text]---#
 *
 * Reihenfolge der Aufrufe:
 * -> /etc/profile
 * -> ~/.bash_profile -alternativ-> ~/.bash_login -alternativ-> ~/.profile
 *
 */


exports.data = {

	// Sublime Text
	"Sublime Text" : {
		"title" : "Sublime Text",
		"description" : "Sublime Text per Kurznotation hinzufügen.",
		"alias" : ["sublimetext", "sublime", "subl", "sbl", "st"],
		"cmd" : "alias <alias>='open -a \"Sublime Text\"'"
	},
	"List S" : {
		"title" : "ls",
		"description" : "Dateien und Verzeichnisse mit Format auflisten.",
		"cmd" : "alias ls='ls -aFhlG'"
	},
	"-" : {
		"title" : "-",
		"description" : "",
		"cmd" : "alias ..='cd ..'"
	},
	"-" : {
		"title" : "-",
		"description" : "",
		"cmd" : "alias cd..='cd ..'"
	},
	"-" : {
		"title" : "-",
		"description" : "",
		"cmd" : "alias ....='cd ../..'"
	},
	"-" : {
		"title" : "-",
		"description" : "",
		"cmd" : "alias mkd='mkdir -p'"
	},
	"-" : {
		"title" : "-",
		"description" : "",
		"cmd" : "''"
	},
	
	
};
