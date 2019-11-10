#target illustrator
#targetengine main

/***
  {
    "name" : "ScriptPanel_2",
    "note" : "Relative-path palette script.",
    "scriptVersion" : "1.2.7"
  }
***/

function ScriptPanel_2(title){

//==================================== NOTES =======================================//
/***
  {
		"scriptPanel_ignore" : true,
    "name" : "SP2-Notes",
    "note" : "This is the 'notes' portion of ScriptPanel 2, a section to show a 'readme' of instructions and helpful info in general."
  }
***/	

/*
<NOTES>

	<item title="About">
	<![CDATA[
------------------------------------------- ABOUT -------------------------------------------
Date: 12/1/2015
Author: Vasily Hall
Email: vasily.hall@gmail.com
LinkedIn: https://www.linkedin.com/in/vasily-hall-91216618
	]]>
	</item>

	<item title="Overview">
	<![CDATA[
--------------------------------- SCRIPT PANEL OVERVIEW -------------------------------------
The ScriptPanel_2 script panel is a floating palette for Adobe Illustrator which provides an interface to execute other .jsx scripts.
It works by showing .jsx scripts in the same folder as this script panel .jsx file, and also scripts inside level-1 nested folders.
The scripts relative to the script panel .jsx and level-1 nested folder scripts are grouped in the panel inside individual groups, or panels, or treeview nodes, depending on the view options.

The method by which other .jsx scripts are recognized is the directory of the actual script panel .jsx file.
This directory is obtained in one of 3 ways:
1) $.fileName, which is used when the script panel .jsx file is executed from the ESTK, or File > Scripts, and File > Scripts > Other Scripts
2) variable "startupLocation", which is meant to be set as a global variable from a startup script, which is a script that must be located in the application folder in a special "Startup Scripts" folder, which must be custom-added.
("/Applications/Adobe Illustrator CC 2015/Startup Scripts" on Mac)
The variable "startupLocation" should have the file path to the script panel .jsx file, and after execution should be set to null or all the script panels will default to this location.
3) variable "btScript_MyLocation", which is sent with every script that is executed from this script panel. This meant to provide a directory to the executing script to take place of $.fileName, because $.fileName is not available when a script is executed via BridgeTalk object, which is how a floating panel can execute anything in a target application.
With variable "btScript_MyLocation", it is possible to have a whole toolset of nested script panels, each for a separate set of .jsx scripts and level-1 folders of .jsx scripts.
Note: Due to the nature of $.fileName's quirks, the script panel script cannot be executed from double-click on its icon in the file system. :(
	]]>
	</item>

	<item title="Mini-Tab Icon">
	<![CDATA[
--------------------------------- SCRIPT PANEL TAB ICON -------------------------------------
The script panel has a minimized state as a "floating tab". This will either show a default icon which says "Script Panel 2", or a custom image.
The custom image will override the default icon.
Sometimes script files used by the script panel are added or deleted or modified for properties while the panel is active.
To refresh, make the panel into the mini-tab and hold Ctrl key while clicking the mini-tab's button. The script panel will update with latest file listing.
The maximized script panel has no close button to save space. Closing is accomplished from within the min-tab's close button which does exist.
However, holding down Alt key while clicking the minimize button will close the large panel, saving the extra step of minimizing it first.
A custom image must be a .png 24 file in the same folder as the script panel .jsx file, and it has to have the same name as the script panel .jsx file, except have .png as the file extension instead of .jsx.
The default dimensions for the image are 100 x 45 pixels.
	]]>
	</item>

	<item title="Script Embedded Descriptive Properties">
	<![CDATA[
---------------------------------- SCRIPT PROPERTIES ----------------------------------------
Embedded meta-information can be stored inside .jsx scripts as a JSON string, and is obtained by the script panel parsing the .jsx scripts as text to search for this data.
This is not required for the panel to work, though.

The syntax for embedded info is JSON-valid syntax like this:
/THREE_STARS_HERE
  {
    "name" : "SP2-Functions",
    "note" : "This is the 'functions' portion of ScriptPanel 2."
  }
THREE_STARS_HERE/
multi-line javascript comment with 3 beginning and 3 ending stars.

Each script can have these properties written into it:
name : will show the value here as the text of the script button
note : will show this value as a help tip when button is hovered over
image : if present, will be used as image in a script button. Must be a .png 24 file.
	Can be name of file inside same folder as this script, or be an absolute file path. The default dimensions for the image are 100 x 45 pixels.
  The following keywords can be used other than 'image': small, large, listItem, treeviewItem. By default, their values will reference a file path.
  When '_embedded' is used in the property name (ex: "image_embedded"), the value is read as image-text data.
  When '_drawn' is used in the property name (ex: "image_drawn"), the value is read as canvas instructions for the ScriptUI drawing functions.
  The drawing instructions must get URL-Encoded to be properly stored within the script metadata string.
scriptPanel_ignore : when set to true, will not show this script in a script panel.
sectionColor : an array of 3 numbers with range 0-1 which stand for RGB values. ([1,0,0] for red).
	The color specified here will color the folder group in which the script is located, so only really	one script needs to have this defined in order to colorize an entire section.
showSectionLabel : default panel behavior is to show the name of the parent folder of script buttons in a folder section.
	If this property is present and set to false, it will not show that name. Only one script needs to have this property set to false for this to happen.
	]]>
	</item>

	<item title="Saved Settings">
	<![CDATA[
----------------------------------- STORING SETTINGS ----------------------------------------
The ScriptPanel_2 script panel is versatile and highly-customizable with editable settings which can be saved and are read-in every time the panel is initialized.
The settings dialog is accessed by the button at the bottom which has the 3 lines on it, "hamburger" style.
The "Save Settings" button in this dialog will save the settings as a JSON file in a user's My Documents directory.
The file will be called "SCRIPTPANEL_SETTINGS.json".
To have multiple users have the same view, this file can be shared and pasted into everyone's My Documents folder.
Nested script panels can also have settings particular to them saved in this same file, so as to allow different settings for each individual script panel, root and nested.
Important: These settings are stored using the specified panel's .jsx file's names, excluding the .jsx extension.
Therefore it's important to name the panel .jsx files using unique names, so unique settings can be retrieved.
	]]>
	</item>

	<item title="Startup Script">
	<![CDATA[
------------------------------------ STARTUP SCRIPT -----------------------------------------
One of the most useful helpful things to do with the Script Panel .jsx file is to have it open up automatically when Illustrator is started.
To do so, use a "startup script" to launch it. A startup script is a .jsx file which lives in a specially-added folder called "Startup Scripts" in the Illustrator application folder.
An example of this folder is "/Applications/Adobe Illustrator CC 2015/Startup Scripts" on Mac.
Any .jsx file in this folder will play every time Illustrator is started up. However, it will also play every time any script is ran by Illustrator, which isn't good.
To make it ONLY play when Illustrator is *actually* started up, you've got to check if the $.engineName is "transient" or not.
Apparently, when Illustrator is running a .jsx script during regular operation, the engine name is "transient", but not when started up the first time.
Also, the variable "startupLocation" must be present in order to declare the file path to the script panel this first time.
It is global and is fetched by the script panel script outside its scope. Therefore it's important to reset it to null inside the startup script.
Additionally, on Windows, the panel was performing quirky: the Welcome screen would make it instantly disappear, and even if the Welcome screeen was set to "Never show again",
the panel would be hidden behind the application frame when Illustrator's UI was clicked on.
While simply minimizing Illustrator, and using the minimize/maximize buttons on the panel would fix the hiding behavior, it wasn't ideal.
To solve this, the startup script had to be modified to send the panel through bridgetalk, which fixed both the Welcome Screen and the app frame intrusion behavior.

Here is an example of a basic startup script which uses a file path typically seen on Macinthosh:

if($.engineName != 'transient' && $.engineName != ''){
  var startupLocation = "/Users/YourUserName/FolderWhereItIs/ScriptPanel.jsx";
  var scriptPanelFile = File(startupLocation);
  if(scriptPanelFile.exists){
    scriptPanelFile.open('r');
    var fileStr = scriptPanelFile.read();
    scriptPanelFile.close();
    eval(fileStr);
  } else {
    alert("Sorry, the ScriptPanel script file wasn't found at '" + startupLocation + "'");
  }
  startupLocation = null;
}

And here is the edited startup script which uses BridgeTalk:
*Note: it doesn't need the "startupLocation" variable necessarily named this name anymore, because it will turn into "btScript_MyLocation" during BridgeTalk send.

if($.engineName != 'transient' && $.engineName != ''){
  function runScriptFromFile(file){
    function bridgeTalkEncode( txt ) { 
      txt = encodeURIComponent( txt ); 
      txt = txt.replace( /\r/, "%0d" ); 
      txt = txt.replace( /\n/, "%0a" ); 
      txt = txt.replace( /\\/, "%5c" ); 
      txt = txt.replace(/'/g, "%27"); 
      return txt.replace(/"/g, "%22"); 
    };
    var sf = file;
    if(!(file instanceof File)){
      sf = File(file);
    }
    if(!sf.exists){
      alert("Sorry, it appears that this script file cannot be located at '"+decodeURI(sf.toString())+"'");
      return;
    }
    sf.open('r');
    var scriptString = sf.read();
    sf.close();
    // Thanks to: https://forums.adobe.com/thread/287506?tstart=0
    var pathToScript = "var btScript_MyLocation = \"" + (sf) + "\";";
    var script = "var scp ='" + bridgeTalkEncode("LOCATION\r"+scriptString) + "'";
    script += ";\nvar scpDecoded = \rdecodeURI( scp ).replace('LOCATION', '" + pathToScript + "');\n"; 
    script += "eval(scpDecoded);"; 
    var bt = new BridgeTalk();
    bt.target = 'illustrator-' + app.version.substr(0, 2);
    bt.body = script;
    bt.onError = function(errObj){
      alert(errObj.body);
    }
    bt.send();
  };
  var myMacPath = "/Users/You/FolderWhereItIs/ScriptPanel.jsx";
  var myPCPath = "C:\\\\Users\\You\\FolderWhereItIs\\ScriptPanel.jsx";
  var startupLocation = (Folder.fs == "Windows") ? myPCPath : myMacPath ;

  var scriptPanelFile = File(startupLocation);
  if(scriptPanelFile.exists){
    runScriptFromFile(scriptPanelFile);
  } else {
    alert("Sorry, the ScriptPanel script file wasn't found at '" + startupLocation + "'");
  }
  startupLocation = null;
}

	]]>
	</item>

</NOTES>
*/
function getNotes(){
	var fileString;
	PANELSCRIPT_LOCATION.open('r');
	fileString = PANELSCRIPT_LOCATION.read();
	PANELSCRIPT_LOCATION.close();
	try {
		var noteString = fileString.substring(fileString.indexOf("<NOTES"), fileString.lastIndexOf("notes>".toUpperCase()) + 6);
		if(noteString == "#targ"){
			throw new Error("Note string wasn't found, this script is possibly not compiled to embed the #include code blocks.");
		}
		var notesRoot = XML(noteString);
		var msg = "";
		for (var i = 0; i < notesRoot.children().length(); i++) {
			msg += (notesRoot.children()[i].toString().replace(/THREE_STARS_HERE/g, "***") + "\r");
		};
		quickView(msg, "ScriptPanel_2 " + SETTINGS.scriptVersion + " Usage Instructions");
	} catch(e) {
		alert("Notes for '" + decodeURI(PANELSCRIPT_LOCATION.toString()) + "' could not be read.\r" + e);
	}
};

//==================================================================================//

  var PANELSCRIPT_LOCATION = function(){
    var thisFile;
    if(typeof startupLocation != "undefined" && startupLocation != null){
      thisFile = File(startupLocation);
    } else {
      thisFile = File($.fileName);
      if(!thisFile.exists){
        thisFile = File(btScript_MyLocation);
      }
    }
    if(!thisFile.exists){
      alert("Sorry, a script file path for a ScriptPanel2 panel wasn't found!");
    }
    return thisFile;
  }();

//=================================== FUNCTIONS ====================================//
if(!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(what, i) {
    i = i || 0;
    var L = this.length;
    while (i < L) {
      if(this[i] === what) return i;
      ++i;
    }
    return -1;
  };
}

Array.prototype.remove = function() {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

/*-------------------------------------------------------------------------------------------------------------------------*/
"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(t){return 10>t?"0"+t:t}function quote(t){
  return escapable.lastIndex=0,escapable.test(t)?'"'+t.replace(escapable,function(t){var e=meta[t];
    return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}
  function str(t,e){var n,r,o,f,u,i=gap,p=e[t];switch(p&&"object"==typeof p&&"function"==typeof p.toJSON&&(p=p.toJSON(t)),
    "function"==typeof rep&&(p=rep.call(e,t,p)),typeof p){case"string":return quote(p);case"number":return isFinite(p)?String(p):"null";
  case"boolean":case"null":return String(p);case"object":if(!p)return"null";if(gap+=indent,u=[],"[object Array]"===Object.prototype.toString.apply(p)){
    for(f=p.length,n=0;f>n;n+=1)u[n]=str(n,p)||"null";return o=0===u.length?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+i+"]":"["+u.join(",")+"]",gap=i,o}
      if(rep&&"object"==typeof rep)for(f=rep.length,n=0;f>n;n+=1)"string"==typeof rep[n]&&(r=rep[n],o=str(r,p),o&&u.push(quote(r)+(gap?": ":":")+o));
    else for(r in p)Object.prototype.hasOwnProperty.call(p,r)&&(o=str(r,p),o&&u.push(quote(r)+(gap?": ":":")+o));return o=0===u.length?"{}":gap?"{\n"+gap+
    u.join(",\n"+gap)+"\n"+i+"}":"{"+u.join(",")+"}",gap=i,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){
      return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+
      f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){
        return this.valueOf()});var cx,escapable,gap,indent,meta,rep;"function"!=typeof JSON.stringify&&
    (escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      meta={"\b":"\\b","  ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,n){var r;
        if(gap="",indent="","number"==typeof n)for(r=0;n>r;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=e,
          e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),
    "function"!=typeof JSON.parse&&(cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      JSON.parse=function(text,reviver){function walk(t,e){var n,r,o=t[e];if(o&&"object"==typeof o)for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&
      (r=walk(o,n),void 0!==r?o[n]=r:delete o[n]);return reviver.call(t,e,o)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&
        (text=text.replace(cx,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),
        /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@")
          .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]")
          .replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;
      throw new SyntaxError("JSON.parse")})}();
/*-------------------------------------------------------------------------------------------------------------------------*/

function unCamelCaseSplit(str){
  var newStr =  str[0].toUpperCase() + str.split(/([A-Z][a-z]+)/g).join(" ").replace(/\s{2}/g," ").substr(1,);
  return newStr;
};

function transferProperties(injectee, syringe){
	for(var all in syringe){
		injectee[all] = syringe[all];
	}
};

function getRelativePath(){
  var thisFile = File(PANELSCRIPT_LOCATION);
  if(!thisFile.exists){
    alert("Sorry, a script file path for a ScriptPanel2 panel wasn't found!");
  }
  var thisFileName = decodeURI(thisFile.name);
  var thisParentFolder = Folder(thisFile.path);
  return thisParentFolder;
};

function getRelativeFolders(){
  var thisParentFolder = getRelativePath();
  return getFolderFolders(thisParentFolder);
};

function getRelativeScripts(){
  var thisParentFolder = getRelativePath();
  return getFolderScriptObjs(thisParentFolder);
};

function getFolderFolders(folderPath){
  return Folder(folderPath).getFiles(function(f){
    return f instanceof Folder && f.name.charAt(0) != "_" && f.name != "old";
  });
};

function getFolderScriptObjs(folderPath){
  var arr = [];

  var jsxFiles = Folder(folderPath).getFiles(function(f){
    return f instanceof File && (f.name.substr(f.name.lastIndexOf(".")) == ".jsx" || f.name.substr(f.name.lastIndexOf(".")) == ".js");
  });

  for(var i=0; i<jsxFiles.length; i++){
    var thisJsx = jsxFiles[i];
    var thisJsxName = decodeURI(thisJsx.name);

    if(thisJsxName != decodeURI(File(PANELSCRIPT_LOCATION).name)){
      var obj = {
        name : "",
        note : "",
        targetApp : "illustrator",
        fileName : thisJsxName,
        image : "",
        path : decodeURI(thisJsx.fsName)
      };
      thisJsx.open('r');
      var str = thisJsx.read();

      // may need to quote-proof in future
      var targetRx = /(#|\/\/@)target\s[a-z]+/;
      if(str.match(targetRx)){
        obj.targetApp = str.match(targetRx)[0].replace(/^(#|\/\/@)target /, "");
      }

      // property object follows this syntax:
      /***
        {
          "name" : "SP2-Functions",
          "note" : "This is the 'functions' portion of ScriptPanel 2."
        }
      ***/
      var rx = /(\/\*{3})([\s\S](?!\*{3}))+/g;
      var propText = str.match(rx);
      if(propText != null){
      	propText = propText[0];
	      try{
	        var propObj = JSON.parse(trimString(propText.replace(/\/?\*{3}\/?/g,"")));
          if(propObj.hasOwnProperty("scriptPanel_ignore") && propObj.scriptPanel_ignore == true){
            continue;
          }
	        transferProperties(obj, propObj);
	        if(!SETTINGS.getAllScripts){
	        	arr.push(obj);
	        }
	      } catch(e){
	        /* alert("Script properties for '" + thisJsxName + "' could not be read in."); */
	      };
	    }
      if(SETTINGS.getAllScripts){
      	arr.push(obj);
      }
      thisJsx.close();
    }
  }
  return arr;
};

function getSubFolderScriptObj(){
	var arr = [], thisFolder;
	var subFolders = getRelativeFolders();
  var folderName;
	for(var i=0; i<subFolders.length; i++){
		thisFolder = subFolders[i];
    folderName = decodeURI(thisFolder.name);
    if(folderName.charAt(0) == "_" || folderName == "old"){
      continue;
    }
		arr.push({name : decodeURI(thisFolder.name), scripts : getFolderScriptObjs(thisFolder)});
	}
	return arr;
};

function getByProp(prop, value){
  for (var i = 0; i < this.items.length; i++) {
    var thisItem = this.items[i];
    if(thisItem.hasOwnProperty(prop) && thisItem[prop] == value){
      return thisItem;
    }
  };
  return null;
};

function trimString(str){
  return str.replace(/^\s*/g,'').replace(/\s*$/g,'');
};

function trimToChars(str, amt){
  if(str.length > amt){
    return str.substr(0, amt) + "...";
  } else {
    return str;
  }
};

function runScriptFromFile(file){
  var sf = file;

  if(!(file instanceof File)){
    sf = File(file);
  }
  if(SETTINGS.confirmRun){
    var go = confirm("Run script '" + decodeURI(sf.name) + "' ?");
    if(!go){
      return;
    }
  }
  if(!sf.exists){
    alert("Sorry, it appears that this script file cannot be located at '"+decodeURI(sf.toString())+"'");
    return;
  }
  sf.open('r');
  var scriptString = sf.read();//.replace(/(#|\/\/@)target illustrator(-\d{1,2})?/g,'');
  sf.close();

  var firstFoundTargetDirective = null;
  var scriptStringLines = scriptString.split(/[\r\n]/g);
  var thisScriptLine;
  for (var i = 0; i < scriptStringLines.length; i++) {
    thisScriptLine = scriptStringLines[i];
    if(thisScriptLine.match(/^(#|\/\/@)target /)){
      if(firstFoundTargetDirective == null){
        firstFoundTargetDirective = thisScriptLine.replace(/^(#|\/\/@)target /, "").replace(/\s/g, "");
      }
      thisScriptLine.replace(/^(#|\/\/@)target\s[^\r\n]+/, "");
    }
  }

  /* Thanks to: https://forums.adobe.com/thread/287506?tstart=0 */
  var pathToScript = "var btScript_MyLocation = \"" + (sf) + "\";";
  var script = "LOCATION\r" + scriptString;

  script = "var scp ='" + bridgeTalkEncode(script) + "'";

  script += ";\nvar scpDecoded = \rdecodeURI( scp ).replace('LOCATION', '" + pathToScript + "');\n"; 
  script += "eval(scpDecoded);"; 
  var bt = new BridgeTalk();
  if (firstFoundTargetDirective != null) {
    if (firstFoundTargetDirective.indexOf("-") == - 1) {
      firstFoundTargetDirective += "-" + SESSION.AIVersion;
    }
    bt.target = firstFoundTargetDirective;
  } else {
    bt.target = 'illustrator-' + SESSION.AIVersion;
  }
  bt.body = script;

  bt.onError = function(errObj){
    alert("Error in " + decodeURI(sf.name) + ": " + errObj.body);
    BridgeTalk.bringToFront('illustrator');
  }
  bt.onResult = function(){
    /* BridgeTalk.bringToFront('illustrator'); // doesn't work on Mac? */
  }
  bt.send();
};

function asSourceString(func){
  var functionName = (func.name == "anonymous") ? "" : func.name;
  var startRx = new RegExp("^\\(function\\s*" + functionName + "\\(\\)\\{");
  var endRx = new RegExp("\\}\\)$");
  return func.toSource().toString().replace(startRx, "").replace(endRx, "");
};

function bridgeTalkEncode( txt ) { 
  txt = encodeURIComponent( txt ); 
  txt = txt.replace( /\r/, "%0d" ); 
  txt = txt.replace( /\n/, "%0a" ); 
  txt = txt.replace( /\\/, "%5c" ); 
  txt = txt.replace(/'/g, "%27"); 
  return txt.replace(/"/g, "%22"); 
};

function sendBTmsg(func, argsObj){
  var bt = new BridgeTalk;
  bt.target='illustrator-' + SESSION.AIVersion;
  var btMsg=asSourceString(func);

  if(argsObj != undefined){
    btMsg = "var scp ='" + bridgeTalkEncode(btMsg.replace("ARGS_OBJ", ("'" + argsObj.toSource() + "'"))) + "'";
    btMsg += ";\nvar scpDecoded = decodeURI( scp );\n"; 
    btMsg += "eval( scpDecoded );"; 
  }

  bt.body=btMsg;
  /*alert(btMsg);/**/
  bt.onError = function(e){
    alert("Error in " + func + ": " + errObj.body);
  };
  bt.onResult=function(result){

  }

  bt.send();
};

function writeSettingsFile(dest, newData){
  var writeData;
  var settingsFile = File(dest);
  newData[SETTINGS.currentScriptPanelName].windowLocations = {
    tinyWindowLocation: [SETTINGS.tinyWindowLocation[0], SETTINGS.tinyWindowLocation[1]],
    bigWindowLocation: [SETTINGS.bigWindowLocation[0], SETTINGS.bigWindowLocation[1]]
  };
  try{
    if(settingsFile.exists){
      settingsFile.open("r");
      writeData = JSON.parse(settingsFile.read());
      settingsFile.close();
      writeData[SETTINGS.currentScriptPanelName] = newData[SETTINGS.currentScriptPanelName];
      settingsFile.open("w");
      settingsFile.write(JSON.stringify(writeData));
      settingsFile.close();
    } else {
      settingsFile.open("w");
      writeData = {};
      writeData = newData;
      settingsFile.write(JSON.stringify(writeData));
      settingsFile.close();
    }
    alert("Settings file successfully saved in '" + decodeURI(dest) + "'");
  } catch(e) {
    alert(e);
  }
};

function loadFromSettingsFile(){
  var settingsFile = File(SETTINGS.settingsFileLocation);
  if(settingsFile.exists){
    var loadData;
    settingsFile.open('r');
    loadData = JSON.parse(settingsFile.read());
    settingsFile.close();
    for(var thing in loadData){

      if(thing == SETTINGS.currentScriptPanelName){
        if(loadData[SETTINGS.currentScriptPanelName].hasOwnProperty("initOptions")){
          for(var all in loadData[SETTINGS.currentScriptPanelName].initOptions){
            INITOPTIONS[all] = loadData[SETTINGS.currentScriptPanelName].initOptions[all];
          }
        }
        if(loadData[SETTINGS.currentScriptPanelName].hasOwnProperty("buttonSizes")){
          for(var all in loadData[SETTINGS.currentScriptPanelName].buttonSizes){
            BUTTONSIZES[all] = loadData[SETTINGS.currentScriptPanelName].buttonSizes[all];
          }
        }
        if(loadData[SETTINGS.currentScriptPanelName].hasOwnProperty("listboxSizes")){
          for(var all in loadData[SETTINGS.currentScriptPanelName].listboxSizes){
            LISTBOXSIZES[all] = loadData[SETTINGS.currentScriptPanelName].listboxSizes[all];
          }
        }
        if(loadData[SETTINGS.currentScriptPanelName].hasOwnProperty("windowLocations")){
          for(var all in loadData[SETTINGS.currentScriptPanelName].windowLocations){
            SETTINGS[all] = loadData[SETTINGS.currentScriptPanelName].windowLocations[all];
          }
        }
        if(loadData[SETTINGS.currentScriptPanelName].hasOwnProperty("panelOptions")){
          for(var all in loadData[SETTINGS.currentScriptPanelName].panelOptions){
            SETTINGS[all] = loadData[SETTINGS.currentScriptPanelName].panelOptions[all];
          }
        }
        if(loadData[SETTINGS.currentScriptPanelName].hasOwnProperty("treeviewOptions")){
          for(var all in loadData[SETTINGS.currentScriptPanelName].treeviewOptions){
            VIEWMODES.folderViewModes.treeview[all] = loadData[SETTINGS.currentScriptPanelName].treeviewOptions[all];
          }
        }
        if(loadData[SETTINGS.currentScriptPanelName].hasOwnProperty("imageDisplayModes")){
          for(var all in loadData[SETTINGS.currentScriptPanelName].imageDisplayModes){
            VIEWMODES.imageDisplayModes[all].showImage = loadData[SETTINGS.currentScriptPanelName].imageDisplayModes[all].showImage;
            VIEWMODES.imageDisplayModes[all].kind = loadData[SETTINGS.currentScriptPanelName].imageDisplayModes[all].kind;
          }
        }
        if(loadData[SETTINGS.currentScriptPanelName].hasOwnProperty("buttonImageSizes")){
          for(var all in loadData[SETTINGS.currentScriptPanelName].buttonImageSizes){
            BUTTONIMAGESIZES[all].width = loadData[SETTINGS.currentScriptPanelName].buttonImageSizes[all].width;
            BUTTONIMAGESIZES[all].height = loadData[SETTINGS.currentScriptPanelName].buttonImageSizes[all].height;
          }
        }
        VIEWMODES.init();
        break;
      }
    }
  }
};

function resetScriptPanelData(){
  SESSION.init();
};


//==================================================================================//

//==================================== OBJECTS =====================================//

function getObjectProperties(obj){
  var arr = new Array();
  for (var all in obj) {
    arr.push(all);
  };
  return arr;
};

var INITOPTIONS = {
  FoldersAs : "groups",
  ScriptsAs : "buttons",
  FolderOrientation : "vertical",
  FolderRevealMechanism : "radiobuttons",
  ScriptOrientation : "vertical",
  showFolderLabels : true,
  panelButtonSize : "large"
};

var PANELBUTTONSIZES = {
  large : {
    width : 30,
    height : 20
  },
  small : {
    width : 25,
    height : 4
  }
};

var VIEWMODES = {
  panelButtons : {
    size : [
      PANELBUTTONSIZES[INITOPTIONS.panelButtonSize].width,
      PANELBUTTONSIZES[INITOPTIONS.panelButtonSize].height
    ]
  },
  folderViewModes : {
    treeview : {
      type : "treeview",
      width : 200,
      height : 250
    },
    panels : {
      type : "panels",
      value : "panel",
      spacing : 2,
      margins : [2,4,2,2]
    },
    groups : {
      type : "groups",
      value : "group",
      spacing : 2,
      margins : [2,2,2,2]
    }
  },
  scriptViewModes : {
    buttons : {
      type : "buttons",
      setup : BUTTONSIZES
    },
    listbox : {
      type : "listbox",
      setup : LISTBOXSIZES
    },
    iconpanels : {
      type : "iconpanels",
      setup : ICONPANELSIZES
    }
  },
  imageDisplayModes : {
    buttons : {
      showImage : true,
      kind : "image",
      isSizeable : true
    },
    iconPanels : {
      showImage : true,
      kind : "small",
      isSizeable : true
    },
    listItem : {
      showImage : true,
      kind : "listItem",
      isSizeable : false
    },
    treeviewItem : {
      showImage : true,
      kind : "listItem",
      isSizeable : false
    }
  },
  revealMechanisms : {
    radiobuttons : {
      type : "radiobuttons"
    },
    dropdownlist : {
      type : "dropdownlist"
    }
  },
  folderOrientationOptions : {
    vertical : {
      type : "vertical",
      value : "column"
    },
    horizontal : {
      type : "horizontal",
      value : "row"
    },
    stacked : {
      type : "stacked",
      value : "stacked"
    }
  },
  scriptOrientationOptions : {
    vertical : {
      type : "vertical",
      value : "column"
    },
    horizontal : {
      type : "horizontal",
      value : "row"
    }
  },
  showMode : {
    FoldersAs : "",
    ScriptsAs : "",
    FolderOrientation : "",
    FolderRevealMechanism : "",
    ScriptOrientation : "",
    showFolderLabels : true
  },
  init : function(){
    this.showMode.FoldersAs = this.folderViewModes[INITOPTIONS.FoldersAs];
    this.panelButtons.size = [
      PANELBUTTONSIZES[INITOPTIONS.panelButtonSize].width,
      PANELBUTTONSIZES[INITOPTIONS.panelButtonSize].height
    ];
    if(INITOPTIONS.FoldersAs == "treeview"){
      this.showMode.ScriptsAs = "N/A";
      this.showMode.FolderOrientation = "N/A";
      this.showMode.FolderRevealMechanism = "N/A";
      this.showMode.ScriptOrientation = "N/A";
      this.showMode.showFolderLabels = INITOPTIONS.showFolderLabels;
    } else {
      this.showMode.ScriptsAs = this.scriptViewModes[INITOPTIONS.ScriptsAs];
      this.showMode.FolderOrientation = this.folderOrientationOptions[INITOPTIONS.FolderOrientation];
      this.showMode.FolderRevealMechanism = this.revealMechanisms[INITOPTIONS.FolderRevealMechanism];
      this.showMode.ScriptOrientation = this.scriptOrientationOptions[INITOPTIONS.ScriptOrientation];
      this.showMode.showFolderLabels = INITOPTIONS.showFolderLabels;
    }
  }
};

VIEWMODES.init();

var BUTTONSIZES = {
  maxWidth : 250,
  maxHeight : 100,
  minWidth : 50,
  minHeight : 15,
  width : 120,
  height : 24,
  characters : 17,
  minCharacters : 8,
  maxCharacters : 80,
  spacing : 2,
  columns : 2,
  rows : 2
};
// columms used only on scriptOrientationOptions.vertical orientation, rows used only on scriptOrientationOptions.horizontal orientation

var BUTTONIMAGESIZES = {
  image : {
    width : 120,
    height : 45,
    maxWidth : 250,
    minWidth : 15,
    maxHeight : 150,
    minHeight : 15
  },
  large : {
    width : 200,
    height : 60,
    maxWidth : 250,
    minWidth : 15,
    maxHeight : 150,
    minHeight : 15
  },
  small : {
    width : 40,
    height : 20,
    maxWidth : 250,
    minWidth : 15,
    maxHeight : 150,
    minHeight : 15
  },
  listItem : {
    width : "N/A",
    height : "N/A"
  },
  treeviewItem : {
    width : "N/A",
    height : "N/A"
  }
};

var LABELSIZES = {
  characters : 20
};

var ICONPANELSIZES = {
  width : 40,
  height : 25,
  characters : 10,
  spacing : 2,
  color : [0.3, 0.3, 0.3],
  columns : 3
};

var LISTBOXSIZES = {
  maxWidth : 300,
  maxHeight : 600,
  minWidth : 100,
  minHeight : 80,
  width : 140,
  height : 80,
  characters : 25,
  minCharacters : 8,
  maxCharacters : 100,
  showTextWithImage : true
};

var SETTINGS = {
  "scriptVersion" : "1.2.7",
  windowGraphics: true, /*must have IMAGE_RESOURCES with resource image*/
  syncLocations: true,
  tinyWindowLocation: [860, 350],
  bigWindowLocation: [860, 350],
  title : (title) ? title : decodeURI(PANELSCRIPT_LOCATION.name).replace(".jsx", ""),
  getAllScripts : true,
  confirmRun : true,
  settingsFileLocation : Folder.myDocuments + "/" + "SCRIPTPANEL_SETTINGS.json",
  currentScriptPanelName : decodeURI(PANELSCRIPT_LOCATION.name).replace(".jsx", "")
};

var SESSION = {
  os : $.os.match('Windows') ? 'Windows' : 'Mac',
  AIVersion : parseInt(app.version.split(/\./)[0]),
  "scriptVersion" : "1.2.7",
  dataFileMask : function(){
    return (this.os == 'Windows')? "*.txt;*.TXT;*.csv;*.CSV;" : function(f){
      return f instanceof Folder || (f instanceof File && decodeURI(f.name).match(/(\.txt|\.csv)$/i));
    };
  },
  imageTest : function(parent){
    var thisIcon;
    try{
      for (var all in ICONS) {
        thisIcon = ICONS[all];
        parent.add("iconbutton", undefined, thisIcon);
        return true;
      };
      return false;
    } catch(e) {
      return false;
    }
    return true;
  },
  init : function(){
    this.scriptFolders = {
      items : getRelativeFolders(),
      getByProp : getByProp
    };
    this.relativeScripts = {
      scripts : getRelativeScripts(),
      getByProp : getByProp
    };
    this.subFolderScripts = {
      items : getSubFolderScriptObj(),
      getByProp : getByProp
    };
  }
};
SESSION.init();

var IMAGE_RESOURCES = {
  default_icon : "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00d\x00\x00\x00-\b\x02\x00\x00\x00\u00D7\u00D7Y\u00A7\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x04{IDATx\u00DA\u00EC[\u00BBN+A\f\u00DD\u00BDP\u00D3 \x1A\u0094\u00BF \u009F\x11\u0089\x0F\u00A0O\u00C4g\u00D0\u0091\u0096\u008E\u00D4\u00A1NCKM\u0093tIG\x07\x12\x05\u00A2\u00A7\u00CB\u00B5b\u00C5\u00F2\u00B5=\u009E\u00C7nH\u00B2\u00BA.Pvw\x1E\u00DE3\u00F6\x19\u008F\u00BD\u00D4\u00EB\u00F5\u00BA\u00CA\u0097\u00C5b\x01\x7F'\u0093\t\u00DD\u00C1\u00DF\u00C3\u00E1\u0090\u00DF\u00C7K\u00DD\u00E6\u00F1\u00F1\u00B1:B\u00A9\u008B\u00C1\"D8d\u00F3\u00F9\u00FC\u00EA\u00EA\n\u00A1\u00EC\u00F7\u00FBbp\u00BC\x0F\x02m:\x0B\u0096\u00B0#\u008E\u008E\x164\x1C\u00E8r\u00A4\u00888r\u009Ab>>:B8\u00A6hh\x1D\x07k4\x1Ae\x01d\u00DAW\u00D5=Y+)~O\u00E88\u00DF\b\u00FCX\u00EFU@\u0087]\f[\u00E9i\u00CA0\u00FAg\u00D0\r\u00D3\u00EF\x0B)\\\u00EC](\u00F0G\u00BC9la\u00B90\x01\u009Dsb\u00A2-\u00CF\x11p\u00F3z+\u00A3\u008D\u00EC\u00DD\u00C3@mP#\u00A2|\u0081YiS\u00A2\u00EE\u00E8\u0083\u00BE\x1B\u00E2\u00CA\x0F\u00B7\x12b\u0083&>X`V\u00F8\u00EE~\u00C7J\u00B8O\nR\u00E6L\u009C\u00E9\u009C)Q'>\bv\u00D4\u00A3\u00A1\u00E0o\x1C\u0090\u00EE\u009B\u0097\u00BA\u00A3\x1E\u0090/\u00A7P2\x0F\u00ACt\u00B3\na\x14E\u00CA\x04Kl\b4 \x1F\x19\x1B\u00844\u00A4\u00EE\u00BC\u0081\x00\u00CB\u00E9\x18z\u00AA_\u00A4\u00CA\u00DD\x04i\u00B5\u00D3\u00DDSN\u00B9m\u00ACWXp3\u00BD\x06oFS\u0093}Em\u0084+L\u00BD\u00C4%\u0091\u00C3\u009CIS\u00B0\u00B2X,d\\\u0082\u00B0\u00C84\x1C\x1A\x15`E=]4 ,B6\u009E\u00E2\u0086\u00A7\u00ADl%0eb\u00A4\u008E\u00A7\x02:HC\u00C7\u00C9Fh\x04\u00B1fp\x13\u00B4\x14\u009BT\u00FAtN\u00A8\\2B\u0093\b+\u009D\u00AA\u009C \u0088/\u00A9\u00F9Tl)\u00D1\u00DD\u00D6tC\u0093p\u00B5e\u00F9#W\u00AD\u00C4\u00EE\u00E9xq\u00D7C^\bQ\u0089I4\u00A2\u0081@\u0084\u00F7\u00A2\u00F1M\u00FA\u00D3\u00DE\u008D$@\u008Cl:{e\u00B2o\u008B\u0087\u00A7\u0094\x13\u0082\u00BFs\u00D1j\u009Bk\x19]i\u00BE\f\u00A2\u008D\u00C9k|\u00FF\x11\rj\u009Dr\u00CA\n\u00E2M\u00E5\x1C:@\u00CE\x02=p\x16\u00D4I\u00B4\u00A7l\x07jOO\u00CD\u00F0\u00DA\x7FJm\u00F0\u00BD\u00C4Jh=q\u0090\u00A0\u00FE\u0089\u008B\u00BF\x0B\u00FE\u00FA\u00E5\u00A3us\u00C5*\u009FY\u00BA\u0081\u0097X\u00FE\u00E2\u00A4\u0088\x1D:\u00E0\u00D6\u00DE$\u00A5\x056\x7FP\u00B9v\u00C1GmRrsOl\u00B8\u0086\u0087)5\u00E0\u0082\u00CC'X\u008D\u00D2&e\u00F6\u0085\u00CCm\u008E|\u0098\u00B2Z\u00AD^__\u00BF\u00BF\u00BF\u00CF\u00CF\u00CF\u00AF\u00AF\u00AF/..l\u00CB\u00F2\u00C3\u00BC2+\u00E3\x1B\u00F6\x01\u00F2\u00BD\u0096\u00B7\u00B7\u00B7\u00F7\u00F7\u00F7\u009F\u009F\u009F\u0097\u0097\u0097\u0087\u0087\u0087\f\u0082o\u0082\u0097>\x1B\x1F\u00973.\u0097\u00CB\u00FB\u00FB{\x1B\u00AC\u00C4e\x0Fe\x1A\u00A2\u009B\u00E0\x11\x19\x17\nX\u00D6t:\u00B59+k\u00CF2\u00AB>t\u00BC\bq\x13\u00D2\u00DF\u00DEwF\u009E\u00BC\x0E)\u00F3\u00F1\u00F1\u00F1\u00F4\u00F4tss\u00D3\u00EB\u00F5\u00F2\u00EA\u0086\u00A1\r\x18\u00F1B\u0093I!odz\u00D4\u00CFL\u00B7\x17g\x11\n\x04\u00957\u00C1\u00FA\u00FA\u00FA\u009A\u00CDf\u0083\u00C1\u00C0D\u00AA0\u0080\x14\u00E7\u00DB\u00A4\u00D8w\x1B\u00A3\u0084\u00E2\u009D_\u00F3S\u009D\u00C5F\x01v\x07^\u0087\u00E3\u008E\x17:\u0094\u0085\u008Ex\u00D4J\u00EF\x0B\x06E-\u00E9\u0098\u0086\u00D6$\u0086\u00E2_Q\b\u00A3\x13\u008F\u00B4I:}\x05\u0093\u00E8\u0094\u00C1x<\u00E6\u0097\u00B7\u00B7\u00B7ggg-\u00C4\u008D\u009C\u00EC\x13\u00BB\u00EBD\u0092\u00CE\u008D\u0084r\u00F0:\u00A1l>\u00E5I\x18G\u00BD\u0090e%\u00FAG\u0095\u008B\u0094H\u00C6G=H$\u00F0D\x0ED'\u00E1\u00C4\u00FB\u00EB\u00BE\u00D4@\u00A3\u00ECd\u00F4[\x00+\u00DD\u00B2\u00CCzWJ\u00B1\u00DE\u00ACJ\u0084x\u00D3\u00C9g\u0099e4\u0091\u00BF\x1F21\u008D\u00AB\tX\u00A7<\u00FF\x1D%)M\x07\u00F0\u00D7\x19\u0081\u00B2W\u00FA)\x7F\x19\u00CEJ8\x0B\u00E2\u0082\u00E9\u00F9\u00E2\u00AC9\u00C54-\u009F\u00C8\u00FDBnh\u00B5y\u009D&d\u0089f\u009D*\u00B4\u00FD\u0091\u00E3\u0088\u00F4f\u00E8<\u00A0-\u00ABx7L\u00E5\u00AC(X\u00D1\u00C5\x11`9E\u00FCP\u008E\u00DC\u00A1p^\u0082vj\x7F\u00BA\u00F0'\u00CA_\u00FCf\u00A82\u0098R\u00F1\u008C\u0097\u00E1\u00B2\u00AAD\x0E\u00EB\u00FB(;\u00AB\"6J}iv\u00D7@7\u00891k\u0091T\u00C1\u00A2\x1E\u00FF\u00C811+\u008F@`\x14\u00E3\u00A4et\u00A6\\'\u00E0\u009D<\u00BAsiv\u008F~\u00DE\u00D3\u00E8\u00E4@\u00EB\u0090\u009Bb\u00E6\x16\u00BE\u00EE\u00A8\u00C4c\u00D4\u00AC\u00FCL\u0087\u0091\x029\u00D1nrww\u00F7\u00F9\u00F9\u00F9\u00FC\u00FC|yy\t?\u00D2?Q\u00EB\u00D8\u00E7\u00B6Z\u00EA\u00B6\x06\u00EA<R '-\u008E\u0085\u00C6\bR\u00FD\u0097\x1D}\u0081tL\u00D5\u009D\u00DF,\u00D8\u00E1\t\u00E6x\u00FFw\u00E7\u00AF\x00\x03\x00\u00D1\u00A4\u00DC\u00EC\u00A5/E\u0094\x00\x00\x00\x00IEND\u00AEB`\u0082",
  viewOptions : {
    large : '({total:5, '+
    'shape_4:{fillColor:[0.7, 0.63, 0.63], name:"", tag:"", strokeColor:null, pathPoints:[[30, 20], [0, 20], [0, 0], [30, 0]], ellipsePath:false, closed:true}, '+
    'shape_3:{fillColor:[1, 1, 1], name:"", tag:"", strokeColor:null, pathPoints:[[30, 0], [0, 0], [0, 10], [30, 10]], ellipsePath:false, closed:true}, '+
    'shape_2:{fillColor:null, name:"", tag:"", strokeColor:[0.33, 0.33, 0.33], pathPoints:[[6, 10], [24, 10]], ellipsePath:false, closed:false, strokeWidth:4}, '+
    'shape_1:{fillColor:null, name:"", tag:"", strokeColor:[0.33, 0.33, 0.33], pathPoints:[[6, 4], [24, 4]], ellipsePath:false, closed:false, strokeWidth:4}, '+
    'shape_0:{fillColor:null, name:"", tag:"", strokeColor:[0.33, 0.33, 0.33], pathPoints:[[6, 16], [24, 16]], ellipsePath:false, closed:false, strokeWidth:4}})',
    small : '({total:1, '+
    'shape_0:{fillColor:[0.7, 0.63, 0.63], name:"", tag:"", strokeColor:null, pathPoints:[[25, 0], [0, 0], [0, 4], [25, 4]], ellipsePath:false, closed:true}})'
  },
  minimize : {
    large : '({total:3, '+
    'shape_2:{fillColor:[1, 1, 0.63], name:"", tag:"", strokeColor:null, pathPoints:[[30, 20], [0, 20], [0, 0], [30, 0]], ellipsePath:false, closed:true}, '+
    'shape_1:{fillColor:[1, 0.82, 0.44], name:"", tag:"", strokeColor:null, pathPoints:[[30, 20], [0, 20], [0, 10], [30, 10]], ellipsePath:false, closed:true}, '+
    'shape_0:{fillColor:null, name:"", tag:"", strokeColor:[0.02, 0, 0.36], pathPoints:[[6, 10], [24, 10]], ellipsePath:false, closed:false, strokeWidth:4}})',
    small : '({total:1, '+
    'shape_0:{fillColor:[1, 0.82, 0.44], name:"", tag:"", strokeColor:null, pathPoints:[[25, 0], [0, 0], [0, 4], [25, 4]], ellipsePath:false, closed:true}})'
  },
  instructions : {
    large : '({total:4, '+
    'shape_3:{fillColor:[0.53, 0.82, 0.58], name:"", tag:"", strokeColor:null, pathPoints:[[30, 20], [0, 20], [0, 0], [30, 0]], ellipsePath:false, closed:true}, '+
    'shape_2:{fillColor:[0.59, 1, 0.71], name:"", tag:"", strokeColor:null, pathPoints:[[30, 0], [0, 0], [0, 10], [30, 10]], ellipsePath:false, closed:true}, '+
    'shape_1:{fillColor:null, name:"", tag:"", strokeColor:[0.13, 0.39, 0], pathPoints:[[10, 7], [12, 3], [18, 3], [20, 6], [20, 8], [15, 12], [15, 14]], ellipsePath:false, closed:false, strokeWidth:2}, '+
    'shape_0:{fillColor:[0.13, 0.39, 0], name:"", tag:"", strokeColor:null, pathPoints:[14, 16, 3, 3], ellipsePath:true, closed:true}})',
    small : '({total:1, '+
    'shape_0:{fillColor:[0.59, 1, 0.71], name:"", tag:"", strokeColor:null, pathPoints:[[25, 0], [0, 0], [0, 4], [25, 4]], ellipsePath:false, closed:true}})'
  }
};

IMAGE_RESOURCES.init = function () {
  var parentFolder = Folder(getRelativePath());
  var thisFoundPNG;
  if (parentFolder.exists) {
    var foundPNGs = parentFolder.getFiles("*.png");
    if (foundPNGs.length > 0) {
      for (var i = 0; i < foundPNGs.length; i++) {
        thisFoundPNG = foundPNGs[i];
        if (decodeURI(thisFoundPNG.name).replace(".png","") == decodeURI(PANELSCRIPT_LOCATION.name).replace(".jsx", "")) {
          this.found_icon = thisFoundPNG;
          break;
        }
      }
    }
  }
};
IMAGE_RESOURCES.init();

// loads saved settings from JSON file located in 'My Documents' folder named "SCRIPTPANEL_SETTINGS.json"
loadFromSettingsFile();




//==================================================================================//

//=================================== UI WINDOW ====================================//
/***
  {"name" : "SP2_UI", "note" : "note here."}
***/

/*------------------------------------------------------------- DRAWING ICONS --------------------------------------------------------*/

function drawFromObjString(objString, canvasArea){
  function round2(num){
    return Math.round(num * 100) / 100;
  };
  function drawPath(shp){
    var thisShp=shp;
    if(thisShp.ellipsePath!=true){
      var vectorPts=thisShp.pathPoints;
      canvas.newPath(); canvas.moveTo(thisShp.pathPoints[0][0],thisShp.pathPoints[0][1]);
      for(var j=0; j<vectorPts.length; j++){
        var thisAnchor=vectorPts[j];
        var x=thisAnchor[0], y=thisAnchor[1];
        canvas.lineTo(x,y);
      }
      if(thisShp.closed==true){
        canvas.closePath();
      }
    } else {
      var cirPts=thisShp.pathPoints;
      canvas.newPath();
      canvas.ellipsePath(round2(cirPts[0]), round2(cirPts[1]), round2(cirPts[2]), round2(cirPts[3]));
      canvas.closePath();
    }
    if(thisShp.fillColor!=null){
      var clr=thisShp.fillColor;
      var myBrush=canvas.newBrush(canvas.BrushType.SOLID_COLOR,clr);
      canvas.fillPath(myBrush);
    }
    if(thisShp.strokeColor!=null){
      var clr=thisShp.strokeColor;
      var myPen=canvas.newPen(canvas.PenType.SOLID_COLOR,[clr[0],clr[1],clr[2],1], thisShp.strokeWidth);
      canvas.strokePath(myPen);
    }
  };
  var obj=eval(objString.replace(/'\+\n*\r*'/g,'').replace(/(^'|';$)/g,''));
  var canvas=canvasArea.graphics;
  var counter=obj.total;
  var ctr;
  while(counter>=0){
    for(var all in obj){
      if(all.match(/\d{1,2}$/g) && all.match(/\d{1,2}$/g)==counter){
        var thisShp=obj[all];
        if(all.match('group')){
          ctr=obj[all].total;
          while(ctr>=0){
            for(var paths in obj[all]){
              if(paths.match(/\d{1,2}$/g) && paths.match(/\d{1,2}$/g)==ctr){
                drawPath(obj[all][paths]);
              }
            }
            ctr--;
          }
        } else {
          drawPath(thisShp);
        }
      }
    }
    counter-=1;
  }
};

function drawnIconButton(parent, resource){
  var btn = parent.add("button", undefined, "");
  btn.onDraw = function(){
    drawFromObjString(resource, this);
  }
  return btn;
};

/*---------------------------------------------------------------------------------------------------------------------------------*/

function quickView(msg, title){
  if(title == undefined){
    title = '';
  }
  var w = new Window('dialog', title);
  var e = w.add('edittext', undefined, msg, {multiline:true, readonly:true});
  e.size = [700,500];
  var okbtn = w.add('button', undefined, 'Ok');
  w.show();
};

DropDownList.prototype.selectWell = function(){
  //CC will let you select null
  this.addEventListener('change', function(){
    if(this.selection == null){
      this.selection = this.items[0];
    }
  });
};
var UIElements=[Window,Group,EditText,Panel];
for(var i=0; i<UIElements.length; i++){
  UIElements[i].prototype.setBg=function(rgb){
    this.graphics.backgroundColor=this.graphics.newBrush(this.graphics.BrushType.SOLID_COLOR,[rgb[0],rgb[1],rgb[2]]);
  }
};

EditText.prototype.numbersOnly = function(){
  this.addEventListener('changing', function(){
    var rx = /^-?\d*\.*\d*$/;
    if(!rx.test(this.text)){
      this.text = 0;
      this.setBg([1,0.8,0.8]);
    } else {
      this.setBg([1,1,1]);
    }
  });
};

function makeDropdownlist(parent, items){
  var dd = parent.add("dropdownlist", undefined, items);
  dd.selectWell();
  dd.selection = dd.items[0];
  return dd;
};

function constrainedSlider(parent, min, max, init){
  var g_slider = parent.add("group");

  var slider = g_slider.add("slider");
  slider.minvalue = min;
  slider.maxvalue = max;

  var disp_slider = g_slider.add("edittext", undefined, 0);
  disp_slider.characters = 5;
  if(init != undefined){
    disp_slider.text = slider.value = init;
  } else {
    disp_slider.text = slider.value = min;
  }

  disp_slider.onChange = function(){
    if(isNaN(this.text)){
      this.text = min;
    }
    this.text = Math.round(this.text);
    if((this.text * 1) > max){
      this.text = max;
      alert("Maximum value for this slider is: " + max);
    } else if((this.text * 1) < min){
      this.text = min;
      alert("Minimum value for this slider is: " + min);
    }
    slider.value = this.text;
  };

  disp_slider.onChanging = function(){
    if(isNaN(this.text)){
      this.text = min;
    }
    slider.value = this.text;
  };

  slider.onChange = slider.onChanging = function(){
    this.value = Math.round(this.value);
    disp_slider.text = this.value;
  };

  return slider;
};

function putSpacer(parent){
  var spacer = parent.add("group");
  spacer.size = [2, 2];
  spacer.margins = [0,0,0,0];
  return spacer;
};

function getSingleScriptProperty(scriptGroup, desiredProp, desiredValue){
  // scan all scripts in a group and see if any single one has a desired property with a desired value.
  var thisScriptObj;
  for (var i = 0; i < scriptGroup.length; i++) {
    thisScriptObj = scriptGroup[i];
    if(thisScriptObj.hasOwnProperty(desiredProp) && thisScriptObj[desiredProp] == desiredValue){
      return true;
    }
  };
  return false;
};

function setUpFolderScriptListbox(parent, scriptCollectionObj){
  var i = 0, sco = scriptCollectionObj, buttonText, g;
  // scriptCollectionObj is an array of script objects, which contain various properties for each .jsx script.
  var props = {};
  if(VIEWMODES.showMode.showFolderLabels && !getSingleScriptProperty(sco.scripts, "showSectionLabel", false)){
    props = {
      multiselect: false,
      numberOfColumns: 1,
      showHeaders: true,
      columnTitles: [parent.folderName]
    };
  } else {
    props = {
      multiselect: false
    };
  }
  var listBox = parent.add("listbox", undefined, [], props);
  listBox.size = [LISTBOXSIZES.width, LISTBOXSIZES.height];

  while(i < sco.scripts.length){
    var thisScript = sco.scripts[i];
    if(thisScript.hasOwnProperty("sectionColor")){
      try {
        parent.setBg(thisScript.sectionColor);
      } catch(e) {

      }
    }

    buttonText = thisScript.name || thisScript.fileName;
    buttonText = trimToChars(buttonText, LISTBOXSIZES.characters);

    var btn;
    var scriptImage = ""
    var scriptButtonImageProps = getScriptButtonImageProps(thisScript, "listItem");
    scriptImage = scriptButtonImageProps.scriptImage;

    btn = listBox.add("item");

    if(scriptImage != ""){
      btn.image = ScriptUI.newImage(scriptImage);
      if(LISTBOXSIZES.showTextWithImage){
        btn.text = buttonText;
      }
    } else {
      btn.text = buttonText;
    }
    btn.scriptObj = thisScript;

    if(thisScript.hasOwnProperty("note") && thisScript.note != ""){
      btn.helpTip = thisScript.note;
    }
    btn.path = thisScript.path;
    i++;
  }
  listBox.onDoubleClick = function(){
    if(this.selection != null && this.selection.hasOwnProperty("path")){
      runScriptFromFile(File(this.selection.path));
      deFocusPanel();
    }
  }
};

function getScriptButtonImageProps(scriptObj, imgDispModeProp){
  var scriptImage = "";
  var imgType = "";
  var imageProp = VIEWMODES.imageDisplayModes[imgDispModeProp].kind;
  var showImage = VIEWMODES.imageDisplayModes[imgDispModeProp].showImage;
  if(showImage){
    if(scriptObj.hasOwnProperty(imageProp) && scriptObj[imageProp] != ""){
      try {
        if(File(scriptObj[imageProp]).exists){
          scriptImage = File(scriptObj[imageProp]);
        } else if(File(File(scriptObj.path).parent + "/" + scriptObj[imageProp]).exists){
          scriptImage = File(File(scriptObj.path).parent + "/" + scriptObj[imageProp]);
        }
        imgType = "fileImage";
      } catch (e) {
        scriptImage = "";
      }
    }
    // embedded image overrides file image
    if(scriptObj.hasOwnProperty(imageProp + "_embedded") && scriptObj[imageProp + "_embedded"] != ""){
      try {
        ScriptUI.newImage(decodeURI(scriptObj[imageProp + "_embedded"]));
        scriptImage = decodeURI(scriptObj[imageProp + "_embedded"]);
        imgType = "embeddedImage";
      } catch(e) {
        scriptImage = "";
      }
    }
    // drawn image overrides file image and embedded image
    if(scriptObj.hasOwnProperty(imageProp + "_drawn") && scriptObj[imageProp + "_drawn"] != ""){
      try {
        scriptImage = decodeURI(scriptObj[imageProp + "_drawn"]);
        imgType = "drawnImage";
      } catch(e) {
        scriptImage = "";
      }
    }
  }
  return {
    scriptImage : scriptImage,
    imgButtonSize : [BUTTONIMAGESIZES[imageProp].width, BUTTONIMAGESIZES[imageProp].height],
    imgType : imgType
  };
};

function setUpFolderScriptButtons(parent, scriptCollectionObj){
  var i = 0, sco = scriptCollectionObj, buttonText, g;
  parent.spacing = BUTTONSIZES.spacing;
  // scriptCollectionObj is an array of script objects, which contain various properties for each .jsx script.
  while(i < sco.scripts.length){
    var thisScript = sco.scripts[i];
    if(thisScript.hasOwnProperty("sectionColor")){
      try {
        parent.setBg(thisScript.sectionColor);
      } catch(e) {

      }
    }

    if(VIEWMODES.showMode.ScriptOrientation.type == "vertical"){
      if(BUTTONSIZES.columns == 1){
        g = parent;
      } else {
        if(i % BUTTONSIZES.columns == 0){
          g = parent.add("group");
          g.margins = VIEWMODES.showMode.FoldersAs.margins;
          g.spacing = BUTTONSIZES.spacing;
        }
      }
    } else {
      if(BUTTONSIZES.rows == 1){
        g = parent;
      } else {
        if(i % BUTTONSIZES.rows == 0){
          g = parent.add("group");
          g.orientation = "column";
          g.margins = VIEWMODES.showMode.FoldersAs.margins;
          g.spacing = BUTTONSIZES.spacing;
        }
      }
    }

    buttonText = thisScript.name || thisScript.fileName;
    buttonText = trimToChars(buttonText, BUTTONSIZES.characters);

    var btn;
    var scriptImage = ""
    var imgButtonSize;
    var scriptButtonImageProps = getScriptButtonImageProps(thisScript, "buttons");
    scriptImage = scriptButtonImageProps.scriptImage;
    imgButtonSize = scriptButtonImageProps.imgButtonSize;

    if(isNaN(imgButtonSize[0]) || isNaN(imgButtonSize[1])){
      imgButtonSize = [BUTTONIMAGESIZES["image"].width, BUTTONIMAGESIZES["image"].height];
    }

    if(scriptImage != ""){
      if(scriptButtonImageProps.imgType == "drawnImage"){
        btn = g.add("button", undefined, buttonText);
        btn.onDraw = function(){
          try{
            drawFromObjString(scriptImage, this);
          } catch(e){

          }
        };
      } else {
        btn = g.add("iconbutton", undefined, ScriptUI.newImage(scriptImage));
      }
      btn.size = imgButtonSize;
    } else {
      btn = g.add("button", undefined, buttonText);
      btn.size = [BUTTONSIZES.width, BUTTONSIZES.height];
    }
    btn.scriptObj = thisScript;

    if(thisScript.hasOwnProperty("note") && thisScript.note != ""){
      btn.helpTip = thisScript.note;
    }
    btn.onClick = function(){
      // alert(this.scriptObj.fileName);
      var thisScript = this.scriptObj;
      var thisScriptPath = thisScript.path;
      if(ScriptUI.environment.keyboardState.altKey){
        scriptPropertiesDialog(thisScript);
      } else {
        runScriptFromFile(File(thisScriptPath));
        /* DE-FOCUS the script panel with brute force */
        deFocusPanel();
      }
    };
    i++;
  }
};

function deFocusPanel(){
  var dummyWin = new DummyWin();
  dummyWin.show();
  dummyWin.close();
};

function setUpAllFolderScriptButtons(parent){
  var relativeScriptFolderName = decodeURI(Folder(getRelativePath()).name);
  var g_main, lbl_main, panelLabel;
  var putFolderLabels = (VIEWMODES.showMode.showFolderLabels && VIEWMODES.showMode.ScriptsAs.type != "listbox");
  var putThisFolderLabel = !getSingleScriptProperty(SESSION.relativeScripts.scripts, "showSectionLabel", false);
  if(SESSION.relativeScripts.scripts.length > 0){
    if(VIEWMODES.showMode.FoldersAs.type == "panels"){
      panelLabel = (putFolderLabels && putThisFolderLabel) ? trimToChars(relativeScriptFolderName, LABELSIZES.characters) : "";
      g_main = parent.add(VIEWMODES.showMode.FoldersAs.value, undefined, panelLabel);
    } else {
      g_main = parent.add(VIEWMODES.showMode.FoldersAs.value);
      if(putFolderLabels){
        lbl_main = g_main.add("statictext", undefined, trimToChars(relativeScriptFolderName, LABELSIZES.characters));
      } else {
        g_main.helpTip = relativeScriptFolderName;
      }
    }
    
    g_main.orientation = VIEWMODES.showMode.ScriptOrientation.value;
    g_main.spacing = VIEWMODES.showMode.FoldersAs.spacing;
    g_main.margins = VIEWMODES.showMode.FoldersAs.margins;
    g_main.folderName = relativeScriptFolderName; // to pass into listboxes

    if(VIEWMODES.showMode.ScriptsAs.type == "listbox"){
      setUpFolderScriptListbox(g_main, SESSION.relativeScripts);
    } else {
      setUpFolderScriptButtons(g_main, SESSION.relativeScripts);
    }
  }

  var folderCollectionObj = SESSION.subFolderScripts;
  var currentGroupFolder, folderScriptName, currentFolder, currentFolderScript, lbl_group;
  for(var i = 0; i < folderCollectionObj.items.length; i++){
    currentFolder = folderCollectionObj.items[i];
    putThisFolderLabel = !getSingleScriptProperty(currentFolder.scripts, "showSectionLabel", false);
    var ln = currentFolder.scripts.length;
    if(ln > 0){
      if(VIEWMODES.showMode.FoldersAs.type == "panels"){
        panelLabel = (putFolderLabels && putThisFolderLabel) ? trimToChars(currentFolder.name, LABELSIZES.characters) : "";
        currentGroupFolder = parent.add(VIEWMODES.showMode.FoldersAs.value, undefined, panelLabel);
      } else if(VIEWMODES.showMode.FoldersAs.type == "groups"){
        currentGroupFolder = parent.add(VIEWMODES.showMode.FoldersAs.value);
        if(putFolderLabels && putThisFolderLabel){
          lbl_group = currentGroupFolder.add("statictext", undefined, trimToChars(currentFolder.name, LABELSIZES.characters));
        } else {
          currentGroupFolder.helpTip = currentFolder.name;
        }
      }

      currentGroupFolder.orientation = VIEWMODES.showMode.ScriptOrientation.value;
      currentGroupFolder.spacing = VIEWMODES.showMode.FoldersAs.spacing;
      currentGroupFolder.margins = VIEWMODES.showMode.FoldersAs.margins;
      currentGroupFolder.folderName = currentFolder.name; // to pass into listboxes

      if(VIEWMODES.showMode.ScriptsAs.type == "listbox"){
        setUpFolderScriptListbox(currentGroupFolder, currentFolder);
      } else {
        setUpFolderScriptButtons(currentGroupFolder, currentFolder);
      }
    }
  }
};

function setUpTreeView (parent, scriptCollectionObj, folderCollectionObj) {
  /* SESSION.subFolderScripts.items[0].scripts[0].fileName */
  var t = parent.add('treeview', undefined, []);
  t.size = [VIEWMODES.folderViewModes.treeview.width, VIEWMODES.folderViewModes.treeview.height];
  var currentFolder, currentScript, currentTreeFolder, currentTreeScript, treeScriptName;
  if (scriptCollectionObj.scripts.length > 0) {
    currentTreeFolder = t.add('node', decodeURI(getRelativePath().name));
    for (var i = 0; i < scriptCollectionObj.scripts.length; i++) {
      currentScript = scriptCollectionObj.scripts[i];
      treeScriptName = currentScript.name || currentScript.fileName;
      currentTreeScript = currentTreeFolder.add('item', treeScriptName);
      currentTreeScript.path = currentScript.path;
    }
  }
  for (var i = 0; i < folderCollectionObj.items.length; i++) {
    currentFolder = folderCollectionObj.items[i];
    var ln = currentFolder.scripts.length;
    if (ln > 0) {
      currentTreeFolder = t.add('node', currentFolder.name);
      for (var j = 0; j < ln; j++) {
        currentScript = currentFolder.scripts[j];
        treeScriptName = currentScript.name || currentScript.fileName;
        currentTreeScript = currentTreeFolder.add('item');

        var scriptImage = getScriptButtonImageProps(currentScript, "treeviewItem").scriptImage;

        if (scriptImage != "") {
          currentTreeScript.image = ScriptUI.newImage(scriptImage);
          if (LISTBOXSIZES.showTextWithImage) {
            currentTreeScript.text = treeScriptName;
          }
        } else {
          currentTreeScript.text = treeScriptName;
        }
        currentTreeScript.scriptObj = currentScript;

        if (currentScript.hasOwnProperty("note") && currentScript.note != "") {
          currentTreeScript.helpTip = currentScript.note;
        }

        currentTreeScript.path = currentScript.path;
      }
    }
  }
  t.onDoubleClick = function () {
    if (this.selection != null && this.selection.hasOwnProperty("path")) {
      runScriptFromFile(File(this.selection.path));
      deFocusPanel();
    }
  }
};


//------------------------------------------------------- DIALOGS AND PALETTES ------------------------------------------------------//


function DummyWin(){
  var title = "DummyWin";
  var w = new Window('window', title, undefined, {borderless: true, closeButton: false});
  w.spacing = 0;
  w.margins = [0,0,0,0];
  var loc = [-10, -10] ;
  w.location = loc;
  this.show = function(){w.show();}
  this.close = function(){w.close();}
};

function MiniTab(){
  var title = (SETTINGS.windowGraphics) ? '' : (SETTINGS.title) ;
  var w = new Window('palette', title, undefined, {borderless: false, closeButton: true});
  w.spacing = 0;
  w.margins = [0,0,0,0];
  var loc = (SETTINGS.syncLocations) ?  SETTINGS.bigWindowLocation : SETTINGS.tinyWindowLocation ;
  w.location = loc;
  var btn;

  if(SETTINGS.windowGraphics) {
    if(IMAGE_RESOURCES.hasOwnProperty("found_icon")){
      btn = w.add('iconbutton', undefined, IMAGE_RESOURCES.found_icon);
    } else {
      btn = w.add('iconbutton', undefined, IMAGE_RESOURCES.default_icon);
    }
    btn.size = [100, 45];
  } else {
    btn = w.add('button', undefined, '+');
    btn.size = [100, 42];
  }
  w.onShow = function(){
  };

  this.show = function(){w.show();}
  this.close = function(){w.close();}

  btn.addEventListener('mousedown' , function(){
    if(ScriptUI.environment.keyboardState.ctrlKey){
      resetScriptPanelData();
    }
    var loc = (SETTINGS.syncLocations) ? w.location : SETTINGS.bigWindowLocation ;
    SETTINGS.bigWindowLocation = loc;
    SETTINGS.tinyWindowLocation = w.location;
    var thisPaletteWindow = new paletteWindow();
    thisPaletteWindow.show();
    w.close();
  });
};

function paletteWindow(){
  var windowType = 'palette' ;
  var w = new Window(windowType, (SETTINGS.title), undefined, {closeButton: false, borderless : false});
  w.spacing = 2;
  w.margins= [2,2,2,2];
  w.location = SETTINGS.bigWindowLocation;
  var panelButtonSize = VIEWMODES.panelButtons.size;

  var g_btn = w.add("group");
  g_btn.margins = [2,2,2,4];
  var btn_min = drawnIconButton(g_btn, IMAGE_RESOURCES.minimize[INITOPTIONS.panelButtonSize]);
  btn_min.size = panelButtonSize;
  btn_min.helpTip = "minimize";
  btn_min.onClick = function(){
    var loc = (SETTINGS.syncLocations) ? [this.window.location[0], this.window.location[1]] : SETTINGS.tinyWindowLocation ;
    SETTINGS.tinyWindowLocation = loc;
    SETTINGS.bigWindowLocation = [this.window.location[0], this.window.location[1]];
    if(ScriptUI.environment.keyboardState.altKey){
      w.close();
    } else {
      var thisMiniTab = new MiniTab();
      thisMiniTab.show();
      deFocusPanel();
      w.close();
    }
  };

  var btn_viewOptions = drawnIconButton(g_btn, IMAGE_RESOURCES.viewOptions[INITOPTIONS.panelButtonSize]);
  btn_viewOptions.size = panelButtonSize;
  btn_viewOptions.helpTip = "Set view options for this script panel";
  btn_viewOptions.onClick = function(){
    // reset the panel according to new settings from the view options dialog
    SETTINGS.bigWindowLocation = w.location;
    var newUserViewOptions = viewOptionsDialog();
    if(newUserViewOptions != null){

      for(var all in newUserViewOptions[SETTINGS.currentScriptPanelName].initOptions){
        INITOPTIONS[all] = newUserViewOptions[SETTINGS.currentScriptPanelName].initOptions[all];
      }

      for(var all in newUserViewOptions[SETTINGS.currentScriptPanelName].buttonSizes){
        BUTTONSIZES[all] = newUserViewOptions[SETTINGS.currentScriptPanelName].buttonSizes[all];
      }

      for(var all in newUserViewOptions[SETTINGS.currentScriptPanelName].listboxSizes){
        LISTBOXSIZES[all] = newUserViewOptions[SETTINGS.currentScriptPanelName].listboxSizes[all];
      }

      for(var all in newUserViewOptions[SETTINGS.currentScriptPanelName].panelOptions){
        SETTINGS[all] = newUserViewOptions[SETTINGS.currentScriptPanelName].panelOptions[all];
      }

      for(var all in newUserViewOptions[SETTINGS.currentScriptPanelName].treeviewOptions){
        VIEWMODES.folderViewModes.treeview[all] = newUserViewOptions[SETTINGS.currentScriptPanelName].treeviewOptions[all];
      }

      for(var all in newUserViewOptions[SETTINGS.currentScriptPanelName].imageDisplayModes){
        VIEWMODES.imageDisplayModes[all].showImage = newUserViewOptions[SETTINGS.currentScriptPanelName].imageDisplayModes[all].showImage;
        VIEWMODES.imageDisplayModes[all].kind = newUserViewOptions[SETTINGS.currentScriptPanelName].imageDisplayModes[all].kind;
      };

      for(var all in newUserViewOptions[SETTINGS.currentScriptPanelName].buttonImageSizes){
        BUTTONIMAGESIZES[all].width = newUserViewOptions[SETTINGS.currentScriptPanelName].buttonImageSizes[all].width;
        BUTTONIMAGESIZES[all].height = newUserViewOptions[SETTINGS.currentScriptPanelName].buttonImageSizes[all].height;
      };

      VIEWMODES.init();
      var thisPaletteWindow = new paletteWindow();
      thisPaletteWindow.show();
      w.close();
    }
  };

  var btn_instructions = drawnIconButton(g_btn, IMAGE_RESOURCES.instructions[INITOPTIONS.panelButtonSize]);
  btn_instructions.size = panelButtonSize;
  btn_instructions.helpTip = "Instructions";
  btn_instructions.onClick = function(){
    getNotes();
  };

  // var spacer = putSpacer(w);
  
  var g0 = w.add('group');
  if(VIEWMODES.showMode.FoldersAs == VIEWMODES.folderViewModes.treeview){
    setUpTreeView(g0, SESSION.relativeScripts, SESSION.subFolderScripts);
  } else {
    var g0_1 = g0.add('group');
    g0_1.orientation = VIEWMODES.showMode.FolderOrientation.value;
    g0_1.spacing = VIEWMODES.showMode.FoldersAs.spacing;
    setUpAllFolderScriptButtons(g0_1);
  }
  
  w.onShow = function(){
  };
  this.show = function(){w.show();}
};

//==================================================================================//

//==================================== UI CONTD ====================================//

function getUIData(UIElements){
  var res = {};

  var data = {
    initOptions : {},
    buttonSizes : {},
    listboxSizes : {},
    panelOptions : {},
    treeviewOptions : {},
    imageDisplayModes : function(){
      var res = {};
      for(var all in UIElements.imageDisplayModes){
        res[all] = {};
      }
      return res;
    }(),
    buttonImageSizes : function(){
      var res = {};
      for(var all in UIElements.buttonImageSizes){
        res[all] = {};
      }
      return res;
    }()
  };

  for (var i = 0; i < UIElements.initOptions.length; i++) {
    if(UIElements.initOptions[i].type == "dropdownlist"){
      data.initOptions[UIElements.initOptions[i].key] = UIElements.initOptions[i].selection.text;
    } else if(UIElements.initOptions[i].type == "checkbox"){
      data.initOptions[UIElements.initOptions[i].key] = UIElements.initOptions[i].value;
    } else if(UIElements.initOptions[i].type == "radiobutton"){
      if(UIElements.initOptions[i].value === true){
        data.initOptions[UIElements.initOptions[i].key] = UIElements.initOptions[i].text.toLowerCase();
      }
    }
  };
  for (var i = 0; i < UIElements.buttonSizes.length; i++) {
    data.buttonSizes[UIElements.buttonSizes[i].key] = UIElements.buttonSizes[i].value * 1;
  };
  for (var i = 0; i < UIElements.listboxSizes.length; i++) {
    var val = UIElements.listboxSizes[i].value;
    data.listboxSizes[UIElements.listboxSizes[i].key] = (typeof val == "string" || typeof val == "number")? val * 1 : val;
  };
  for (var i = 0; i < UIElements.panelOptions.length; i++) {
    data.panelOptions[UIElements.panelOptions[i].key] = UIElements.panelOptions[i].value;
  };
  for (var i = 0; i < UIElements.treeviewOptions.length; i++) {
    data.treeviewOptions[UIElements.treeviewOptions[i].key] = UIElements.treeviewOptions[i].value * 1;
  };

  for(var all in UIElements.imageDisplayModes){
    data.imageDisplayModes[all].showImage = UIElements.imageDisplayModes[all].showImage.value;
    data.imageDisplayModes[all].kind = UIElements.imageDisplayModes[all].kind.selection.text;
  };

  for(var all in UIElements.buttonImageSizes){
    data.buttonImageSizes[all].width = UIElements.buttonImageSizes[all].width.value;
    data.buttonImageSizes[all].height = UIElements.buttonImageSizes[all].height.value;
  };

  res[SETTINGS.currentScriptPanelName] = data;

  return res;
};

function viewOptionsDialog(){
  var w = new Window("dialog", "Options for: " + SETTINGS.title);
  w.spacing = 4;
  var groupMargins = [4,4,4,4];

  var g_optsOpts = w.add("group");
  var r_pg1 = g_optsOpts.add("radiobutton", undefined, "Item Display");
  r_pg1.value = true;
  var r_pg2 = g_optsOpts.add("radiobutton", undefined, "Image Display");
  w.stackedGroups = {};

  r_pg1.onClick = r_pg2.onClick = function(){
    this.window.stackedGroups[this.text].visible = true;
    for (var all in this.window.stackedGroups) {
      if(all != this.text){
        this.window.stackedGroups[all].visible = false;
      }
    };
  };

  var g0s = w.add("group");
  g0s.orientation = "stacked";

  // ---------------------------------------------------------------------------------------------------------- stacked 1
  var g0s_1 = g0s.add("group");
  g0s_1.orientation = "column";
  w.stackedGroups["Item Display"] = g0s_1;

  var g0 = g0s_1.add("panel", undefined, "Folder Display");
  g0.size = [305, 100];
  g0.alignChildren = "right";
  g0.margins = groupMargins;
  g0.spacing = 2;

  var ch_showFolderLabels = g0.add("checkbox", undefined, "Show Folder Labels");
  ch_showFolderLabels.key = "showFolderLabels";
  ch_showFolderLabels.value = VIEWMODES.showMode.showFolderLabels;

  var g0_1 = g0.add("group");
  g0_1.margins = groupMargins;
  var lbl_folderDisplay = g0_1.add("statictext", undefined, "View Folders As:");
  var disp_folderDisplay = makeDropdownlist(g0_1, getObjectProperties(VIEWMODES.folderViewModes));
  if(VIEWMODES.showMode.FoldersAs != "N/A"){
    disp_folderDisplay.selection = disp_folderDisplay.find(VIEWMODES.showMode.FoldersAs.type);
  } else {
    disp_folderDisplay.selection = disp_folderDisplay.find("treeview");
  }
  disp_folderDisplay.key = "FoldersAs";
  disp_folderDisplay.onChange = function(){
    if(this.selection.text == "treeview"){
      g1_1.visible = false;
      g1_2.visible = true;
      g1_3.visible = false;
    } else {
      g1_1.visible = true;
      g1_2.visible = false;
      g1_3.visible = false;
      disp_scriptButtonDisplay.notify("onChange");
    }
  };

  var g0_2 = g0.add("group");
  g0_2.margins = groupMargins;
  var lbl_folderOrientation = g0_2.add("statictext", undefined, "Folder Orientation:");
  var disp_folderOrientation = makeDropdownlist(g0_2, getObjectProperties(VIEWMODES.folderOrientationOptions).remove("stacked"));
  // remove stacked - not yet implemented
  if(VIEWMODES.showMode.FolderOrientation != "N/A"){
    disp_folderOrientation.selection = disp_folderOrientation.find(VIEWMODES.showMode.FolderOrientation.type);
  }
  disp_folderOrientation.key = "FolderOrientation";
  disp_folderOrientation.enabled = true;

  var g1 = g0s_1.add("panel", undefined, "Script Display");
  g1.alignChildren = "left";
  g1.margins = groupMargins;
  g1.orientation = "stacked";
  g1.spacing = 2;
  var g1_1 = g1.add("group");
  g1_1.orientation = "column";
  g1_1.margins = groupMargins;
  g1_1.spacing = 2;
  g1_1.alignChildren = "right";
  var g0_3 = g1_1.add("group");
  g0_3.margins = groupMargins;
  g0_3.spacing = 2;
  var lbl_scriptButtonDisplay = g0_3.add("statictext", undefined, "Button Display:");
  var disp_scriptButtonDisplay = makeDropdownlist(g0_3, getObjectProperties(VIEWMODES.scriptViewModes).remove("iconpanels"));
  if(VIEWMODES.showMode.ScriptsAs != "N/A"){
    disp_scriptButtonDisplay.selection = disp_scriptButtonDisplay.find(VIEWMODES.showMode.ScriptsAs.type);
  }
  disp_scriptButtonDisplay.key = "ScriptsAs";
  disp_scriptButtonDisplay.enabled = true;
  disp_scriptButtonDisplay.onChange = function(){
    if(this.selection.text == "listbox"){
      g0_5.visible = false;
      g1_3.visible = true;
      disp_scriptButtonOrientation.enabled = false;
    } else {
      g0_5.visible = true;
      g1_3.visible = false;
      disp_scriptButtonOrientation.enabled = true;
      disp_scriptButtonOrientation.notify("onChange");
    }
  };

  var g0_4 = g1_1.add("group");
  g0_4.margins = groupMargins;
  var lbl_scriptButtonOrientation = g0_4.add("statictext", undefined, "Button Orientation:");
  var disp_scriptButtonOrientation = makeDropdownlist(g0_4, getObjectProperties(VIEWMODES.scriptOrientationOptions));
  if(VIEWMODES.showMode.ScriptOrientation != "N/A"){
    disp_scriptButtonOrientation.selection = disp_scriptButtonOrientation.find(VIEWMODES.showMode.ScriptOrientation.type);
  }
  disp_scriptButtonOrientation.key = "ScriptOrientation";
  disp_scriptButtonOrientation.enabled = true;
  disp_scriptButtonOrientation.onChange = function(){
    if(this.selection.text == "horizontal"){
      g0_5_4.visible = false;
      g0_5_5.visible = true;
    } else {
      g0_5_4.visible = true;
      g0_5_5.visible = false;
    }
  };

  var g1_3_g0_5_wrap = g1_1.add("group");
  g1_3_g0_5_wrap.orientation = "stacked";

  var g1_3 = g1_3_g0_5_wrap.add("group");
  g1_3.visible = false;
  var g0_7 = g1_3.add("panel", undefined, "Listbox Setup");
  g0_7.size = [280, 170];
  g0_7.spacing = 12;
  g0_7.alignChildren = "right";
  g0_7.margins = [4, 20, 6, 6];
  var g0_7_1 = g0_7.add("group");
  var lbl_listboxWidth = g0_7_1.add("statictext", undefined, "Width:");
  var disp_listboxWidth = constrainedSlider(g0_7_1, LISTBOXSIZES.minWidth, LISTBOXSIZES.maxWidth, LISTBOXSIZES.width);
  disp_listboxWidth.key = "width";

  var g0_7_2 = g0_7.add("group");
  var lbl_listboxHeight = g0_7_2.add("statictext", undefined, "Height:");
  var disp_listboxHeight = constrainedSlider(g0_7_2, LISTBOXSIZES.minHeight, LISTBOXSIZES.maxHeight, LISTBOXSIZES.height);
  disp_listboxHeight.key = "height";

  var g0_7_3 = g0_7.add("group");
  var lbl_listboxCharacters = g0_7_3.add("statictext", undefined, "Characters:");
  var disp_listboxCharacters = constrainedSlider(g0_7_3, LISTBOXSIZES.minCharacters, LISTBOXSIZES.maxCharacters, LISTBOXSIZES.characters);
  disp_listboxCharacters.key = "characters";

  var g0_7_4 = g0_7.add("group");
  var ch_showTextWithImage = g0_7_4.add("checkbox", undefined, "Show Label with Image?");
  ch_showTextWithImage.key = "showTextWithImage";
  ch_showTextWithImage.value = LISTBOXSIZES.showTextWithImage;
  ch_showTextWithImage.onClick = function(){
    ch_showTextWithImage_treeview.value = this.value;
  };

  var g0_5 = g1_3_g0_5_wrap.add("panel", undefined, "Button Setup");
  g0_5.margins = groupMargins;
  g0_5.alignChildren = "right";
  var g0_5_1 = g0_5.add("group");
  var lbl_buttonWidth = g0_5_1.add("statictext", undefined, "Button Width:");
  var disp_buttonWidth = constrainedSlider(g0_5_1, BUTTONSIZES.minWidth, BUTTONSIZES.maxWidth, BUTTONSIZES.width);
  disp_buttonWidth.key = "width";

  var g0_5_2 = g0_5.add("group");
  var lbl_buttonHeight = g0_5_2.add("statictext", undefined, "Button Height:");
  var disp_buttonHeight = constrainedSlider(g0_5_2, BUTTONSIZES.minHeight, BUTTONSIZES.maxHeight, BUTTONSIZES.height);
  disp_buttonHeight.key = "height";

  var g0_5_3 = g0_5.add("group");
  var lbl_buttonCharacters = g0_5_3.add("statictext", undefined, "Characters Shown:");
  var disp_buttonCharacters = constrainedSlider(g0_5_3, BUTTONSIZES.minCharacters, BUTTONSIZES.maxCharacters, BUTTONSIZES.characters);
  disp_buttonCharacters.key = "characters";

  var g0_5_45_wrap = g0_5.add("group");
  g0_5_45_wrap.orientation = "stacked";
  g0_5_45_wrap.alignChildren = "right";

  var g0_5_4 = g0_5_45_wrap.add("group");
  var lbl_buttonColumns = g0_5_4.add("statictext", undefined, "Button Columns:");
  var disp_buttonColumns = constrainedSlider(g0_5_4, 1, 5, BUTTONSIZES.columns);
  disp_buttonColumns.key = "columns";

  var g0_5_5 = g0_5_45_wrap.add("group");
  var lbl_buttonRows = g0_5_5.add("statictext", undefined, "Button Rows:");
  var disp_buttonRows = constrainedSlider(g0_5_5, 1, 5, BUTTONSIZES.rows);
  disp_buttonRows.key = "rows";

  var g1_2 = g1.add("group");
  g1_2.visible = false;
  var g0_6 = g1_2.add("panel", undefined, "Treeview Setup");
  g0_6.size = [295, 170];
  g0_6.spacing = 12;
  g0_6.alignChildren = "right";
  var g0_6_1 = g0_6.add("group");
  var lbl_treeviewWidth = g0_6_1.add("statictext", undefined, "Width:");
  var disp_treeviewWidth = constrainedSlider(g0_6_1, 100, 300, VIEWMODES.folderViewModes.treeview.width);
  disp_treeviewWidth.key = "width";

  var g0_6_2 = g0_6.add("group");
  var lbl_treeviewHeight = g0_6_2.add("statictext", undefined, " Height:");
  var disp_treeviewHeight = constrainedSlider(g0_6_2, 200, 800, VIEWMODES.folderViewModes.treeview.height);
  disp_treeviewHeight.key = "height";

  var g0_6_3 = g0_6.add("group");
  var ch_showTextWithImage_treeview = g0_6_3.add("checkbox", undefined, "Show Label with Image?");
  ch_showTextWithImage_treeview.value = LISTBOXSIZES.showTextWithImage;
  ch_showTextWithImage_treeview.onClick = function(){
    ch_showTextWithImage.value = this.value;
  };

// ---------------------------------------------------------------------------------------------------------- stacked 2

  var g0s_2 = g0s.add("group");
  g0s_2.orientation = "column";
  g0s_2.spacing = 4;

  w.stackedGroups["Image Display"] = g0s_2;
  w["imageDisplayModes"] = {};

  var g_imgDisp, g_imgDisp_1, ch_show, dd_kind, sep, lbl_kind, isSizeable, imgDispStack, imgDisp_dims, imgDisp_w, imgDisp_h,
    sl_w, sl_h, lbl_dims_w, lbl_dims_h, buttonImageSize, dd_imgSize;

  var imgDispStackElements = {};

  for (var all in VIEWMODES.imageDisplayModes){
    g_imgDisp_0 = g0s_2.add("panel", undefined, unCamelCaseSplit(all));
    g_imgDisp_0.orientation = "column";
    g_imgDisp_0.size = [300, 50];
    g_imgDisp = g_imgDisp_0.add('group');
    ch_show = g_imgDisp.add("checkbox", undefined, "Show Image");
    ch_show.value = VIEWMODES.imageDisplayModes[all].showImage;
    ch_show.key = all;
    ch_show.helpTip = "Choose to only show text for script-button display, or show an image if found (Otherwise still default to text)."
    sep = g_imgDisp.add("group");
    lbl_kind = g_imgDisp.add("statictext", undefined, "Kind:");
    dd_kind = makeDropdownlist(g_imgDisp, getObjectProperties(BUTTONIMAGESIZES));
    dd_kind.selection = dd_kind.find(VIEWMODES.imageDisplayModes[all].kind);
    dd_kind.key = all;
    lbl_kind.helpTip = dd_kind.helpTip = "Choose which image from embedded metadata to display for the '" + all + "' script-button display.\r" +
      "Such available properties are: " + getObjectProperties(BUTTONIMAGESIZES) + ".";

    dd_kind.onChange = function(){
      VIEWMODES.imageDisplayModes[this.key].kind = this.selection.text;
    };
    ch_show.onClick = function(){
      VIEWMODES.imageDisplayModes[this.key].showImage = this.value;
    }
    w["imageDisplayModes"][all] = {};
    w["imageDisplayModes"][all].ch_showImage = ch_show;
    w["imageDisplayModes"][all].disp_kind = dd_kind;
  }

  var g_imgDispSize = g0s_2.add("panel", undefined, "Image Display Sizing");
  g_imgDispSize.size = [ 300, 140];
  g_imgDispSize.margins = [2, 25, 2, 2];
  dd_imgSize = makeDropdownlist(g_imgDispSize, getObjectProperties(BUTTONIMAGESIZES));
  w["buttonImageSizes"] = {};

  // adjust options for sizing of script buttons of 'button' and 'icon panel' types for various image types
  imgDispStack = g_imgDispSize.add("group");
  imgDispStack.orientation = "stacked";

  for(var that in BUTTONIMAGESIZES){
    buttonImageSize = BUTTONIMAGESIZES[that];
    imgDisp_dims = imgDispStack.add("group");
    imgDisp_dims.orientation = "column";
    imgDisp_dims.alignChildren = "right";
    imgDisp_dims.key = that;
    w["buttonImageSizes"][that] = {};

    imgDisp_w = imgDisp_dims.add("group");
    imgDisp_h = imgDisp_dims.add("group");

    if(!isNaN(buttonImageSize.width) && !isNaN(buttonImageSize.height)){
      lbl_dims_w = imgDisp_w.add("statictext", undefined, "Width:");
      sl_w = constrainedSlider(imgDisp_w, buttonImageSize.minWidth, buttonImageSize.maxWidth, buttonImageSize.width);
      w["buttonImageSizes"][that].widthElem = sl_w;
      lbl_dims_h = imgDisp_h.add("statictext", undefined, "Height:");
      sl_h = constrainedSlider(imgDisp_h, buttonImageSize.minHeight, buttonImageSize.maxHeight, buttonImageSize.height);
      w["buttonImageSizes"][that].heightElem = sl_h;
    } else {
      lbl_dims_w = imgDisp_w.add("statictext", undefined, "Width: N/A");
      lbl_dims_h = imgDisp_h.add("statictext", undefined, "Height: N/A");
    }
    if(dd_imgSize.selection.text == that){
      imgDisp_dims.visible = true;
    } else {
      imgDisp_dims.visible = false;
    }
  }

  dd_imgSize.onChange = function(){
    var thisChild;
    for (var i = 0; i < imgDispStack.children.length; i++) {
      thisChild = imgDispStack.children[i];
      if(thisChild.key == this.selection.text){
        thisChild.visible = true;
      } else {
        thisChild.visible = false;
      }
    };
  };

// ---------------------------------------------------------------------------------------------------------- Panel Options

  var g2 = w.add("panel", undefined, "Panel Options");
  g2.margins = [4,12,6,4];
  g2.spacing = 4;
  g2.orientation = "column";
  var g2_1 = g2.add("group");
  var ch_confirmRun = g2_1.add("checkbox", undefined, "Confirm To Run");
  ch_confirmRun.key = "confirmRun";
  ch_confirmRun.value = SETTINGS.confirmRun;
  var sep = g2_1.add("panel");
  sep.size = [4, 24];
  var ch_syncLocations = g2_1.add("checkbox", undefined, "Minimize in same place");
  ch_syncLocations.key = "syncLocations";
  ch_syncLocations.value = SETTINGS.syncLocations;
  var g2_2 = g2.add("group");
  var lbl_panelButtonSizes = g2_2.add("statictext", undefined, "Panel Button Size");
  var r_panelButtonSmall =  g2_2.add("radiobutton", undefined, "Small");
  r_panelButtonSmall.key = "panelButtonSize";
  var r_panelButtonLarge =  g2_2.add("radiobutton", undefined, "Large");
  r_panelButtonLarge.key = "panelButtonSize";
  (INITOPTIONS.panelButtonSize == "large") ? r_panelButtonLarge.value = true : r_panelButtonSmall.value = true ;


  var UIElements = {
    initOptions : [
      disp_folderDisplay,
      disp_folderOrientation,
      disp_scriptButtonDisplay,
      disp_scriptButtonOrientation,
      ch_showFolderLabels,
      r_panelButtonSmall,
      r_panelButtonLarge
    ],
    buttonSizes : [
      disp_buttonWidth,
      disp_buttonHeight,
      disp_buttonCharacters,
      disp_buttonColumns,
      disp_buttonRows,
    ],
    listboxSizes : [
      disp_listboxHeight,
      disp_listboxWidth,
      disp_listboxCharacters,
      ch_showTextWithImage
    ],
    panelOptions : [
      ch_confirmRun,
      ch_syncLocations
    ],
    treeviewOptions : [
      disp_treeviewWidth,
      disp_treeviewHeight
    ],
    imageDisplayModes : function(){
      var res = {};
      for(var all in w["imageDisplayModes"]){
        res[all] = {
          showImage : w["imageDisplayModes"][all].ch_showImage,
          kind : w["imageDisplayModes"][all].disp_kind
        }
      }
      return res;
    }(),
    buttonImageSizes : function(){
      var res = {};
      for(var all in w["buttonImageSizes"]){
        if(w["buttonImageSizes"][all].hasOwnProperty("widthElem") && w["buttonImageSizes"][all].hasOwnProperty("heightElem")){
          res[all] = {
            width : w["buttonImageSizes"][all].widthElem,
            height : w["buttonImageSizes"][all].heightElem
          }
        }
      }
      return res;
    }()
  };
  w.UIElements = UIElements;

  var g_btn = w.add("group");
  var btn_save = g_btn.add("button", undefined, "Save Settings");

  var btn_ok = g_btn.add("button", undefined, "Ok");
  var btn_ccl = g_btn.add("button", undefined, "Cancel");

  btn_save.onClick = function(){
    writeSettingsFile(SETTINGS.settingsFileLocation, getUIData(this.window.UIElements));
  };

  w.onShow = function(){
    r_pg1.notify("onClick");
    disp_folderDisplay.notify("onChange");
    disp_scriptButtonOrientation.notify("onChange");
    disp_scriptButtonDisplay.notify("onChange");
  };

  if(w.show() == 2){
    return null;
  } else {
    return getUIData(w.UIElements);
  }
};

//==================================================================================//

//==================================== UI PART 3 ====================================//

function scriptPropertiesDialog(scriptObj){
	var usedName = scriptObj.name || scriptObj.fileName;
  var w = new Window("dialog", usedName + " properties");
  w.spacing = 4;
  var groupMargins = [4,4,4,4];
  w.margins = groupMargins;

  var g0 = w.add("group");
  g0.margins = groupMargins;
  g0.size = [400, 30];
  g0.orientation = "column";
  g0.alignChildren = "middle";
  var g0_1 = g0.add("group");
  g0_1.margins = groupMargins;
  var lbl_name = g0_1.add("statictext", undefined, scriptObj.name, {justify : "center"});

  if(scriptObj.hasOwnProperty('note') && scriptObj.note != ""){
	  var g1 = w.add("panel", undefined, "Notes");
	  g1.size = [400, 200];
	  g1.alignChildren = "fill";
	  var disp_notes = g1.add("edittext", undefined, scriptObj.note, {multiline : true});
	  disp_notes.size = [382, 172];
	}

  var g_btn = w.add("group");
  var btn_ok = g_btn.add("button", undefined, "Ok");
  // var btn_ccl = g_btn.add("button", undefined, "Cancel");
  w.show();
};
//==================================================================================//

  var thisPaletteWindow = new paletteWindow();
  thisPaletteWindow.show();
};

ScriptPanel_2();