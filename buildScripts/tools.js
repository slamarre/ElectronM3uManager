//use moz;
var fs = require('fs');
var dateFormat = require('dateformat');
//const fse = require('fs-extra');
//const remote = require('remote');
//var dialog = remote.require("dialog");
//import path from 'path';
//const formidable = require('formidable');
/*eslint-disable no-console */
/*eslint-disable no-unused-vars */
var EventEmitter = require('events').EventEmitter;
//const drivelist = require('drivelist');

//const drives = drivelist.list();
//console.log(drives);
/*
var getResouces = function (c) {
  var e = new EventEmitter();
  process.nextTick(function () {
    var count = 0;
    e.emit('start');
    var t = setInterval(function () {
      e.emit('data', ++count);
      if (count === c) {
        e.emit('end', count);
        clearInterval(t);
      }
    }, 10);
  });
  return (e);
};
var r = getResouces(5);
r.on('start', function () {
  //console.log('stsrted')
});*/


/*
var _ = require('lodash');

var containsDeep = function (array, item) {
  return _.any(_.map(array, _.partial(_.isEqual, item)));
};
var differenceDeep = function (x, y) {
  return _.filter(x, _.partial(_.negate(containsDeep), y));
};
var createDiffOperation = function (type, element) {
  return {
    type: type,
    drive: element
  };
};
var drivelistDiff = function (previous, current) {
  var additions = differenceDeep(current, previous);
  var removals = differenceDeep(previous, current);

  var mappingAdditions = _.map(additions, _.partial(createDiffOperation, 'add'));
  var mappingRemovals = _.map(removals, _.partial(createDiffOperation, 'remove'));

  return {
    drives: current,
    diff: _.union(mappingAdditions, mappingRemovals)
  };
};*/

/*
const exec = require('child_process').exec;
exec('wmic logicaldisk get name', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log('stdout ', stdout);
  console.log('stderr ', stderr);
});*/

function lowercasethefile(path, filename) {
  //var fullpath = path + '/' + filename;
  //console.log(fullpath);
  var fileName = filename,
    fileNewName = fileName.toString().toLowerCase(),
    containsM3u = fileName.toString().toLowerCase().indexOf('.m3u') > -1,
    containsMP3 = fileName.toString().toLowerCase().indexOf('.mp3') > -1;
  if ((containsM3u || containsMP3) && fileName !== fileNewName) {
    fs.renameSync(path + '/' + fileName, path + '/' + fileNewName);
    console.log('File named:' + fileName + " to " + fileNewName); //
  }
}

function createm3ufolder(path, filename) {
  var fullpath = path + '/' + filename;
  if (fullpath.indexOf('.m3u') > -1) {
    var folder = fullpath.replace('.m3u', '');
    var filefound = fs.existsSync(folder);
    //console.log("found:"+filefound);
    if (filefound !== true) {
      fs.mkdirSync(folder);
      console.log("Folder created:" + folder);
    }
  }
}

function moveToM3uFolder(path, m3uFolder, filename) {
  var fullpath = path + '/' + filename;
  var fullpathNew = path + '/' + m3uFolder + '/' + filename;
  //console.log('path:' + path);
  //console.log('m3uFolder:' + m3uFolder);
  //console.log('filename:' + filename);
  //console.log('old:' + fullpath);
  //console.log('new:' + fullpathNew);

  var oldpathfound = fs.existsSync(fullpath);

  var newpathfound = fs.existsSync(fullpathNew);
  if (oldpathfound === true && newpathfound === false) {

    fs.renameSync(fullpath, fullpathNew);
  }
}

function getLastFolderName(path) {
  if (path.indexOf('.') === -1) {
    return path.substr(path.lastIndexOf('/') + 1);
  } else {
    return path.indexOf('');
  }
}

function IsDirectory(filename) {
  try {
    return fs.lstatSync(filename).isDirectory();
  } catch (e) {
    // Handle error
    if (e.code === 'ENOENT') {
      //no such file or directory
      //do something
      return false;
    } else {
      //do something else
      return true;
    }
  }
}

function IsFile(filename) {
  try {
    return !fs.lstatSync(filename).isDirectory();
  } catch (e) {
    // Handle error
    if (e.code === 'ENOENT') {
      //no such file or directory
      //do something
      return false;
    } else {
      //do something else
      return false;
    }
  }
  //return false;
}

function MeetsRules(theString) {
  return (MeetsRule(theString) && MeetsRuleReg(theString));

}

function MeetsRule(theString) {
  if (theString.indexOf('copy') > -1) {
    return true;
  } else {
    return false;
  }
}

RegExp.escape = function (string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};
//Wait to run your initialization code until the DOM is fully loaded. This is needed
// when wanting to access elements that are later in the HTML than the <script>.
/*
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterLoaded);
} else {
  //The DOMContentLoaded event has already fired. Just run the code.
  afterLoaded();
}

function afterLoaded() {
  //Your initialization code goes here. This is from where your code should start
  //  running if it wants to access elements placed in the DOM by your HTML files.
  //  If you are wanting to access DOM elements inserted by JavaScript, you may need
  //  to delay more, or use a MutationObserver to see when they are inserted.
}*/

function MeetsRuleReg2(theString, regexstring) {
  try {
    var thePath = document.getElementById('fileLocal');
    if (thePath !== null) {
      theString = theString.replace(thePath.value, "");
    }
    if (typeof regexstring === "undefined" || regexstring === "") {
      regexstring = "";
      return false;
    }
    //theString = path.basename(theString);
    //console.log(path.basename(theString));
    var reg = regexstring.replace('.', '\.');
    //reg = '#' + regexstring + "#";
    //reg = new RegExp(regexstring, "i");
    //console.log(theString, reg);
    var r = new RegExp(reg, "i");
    var found = theString.match(new RegExp(RegExp.escape(reg)));
    found = theString.search(r);
    //console.log(r);
    //var found = theString.match(new RegExp(RegExp.escape(regexstring)));
    //if (found !== null)
    //console.log(found);
    if (found > -1) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

function MeetsRuleReg(theString) {
  try {
    var reg = /\([0-9]\)/;
    var found = theString.match(new RegExp(reg));
    if (found.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

function ValidateThePath(ev) {
  //console.log(ev.value);

  if (fs.existsSync(ev.value) === true) {
    ev.style.backgroundColor = "lightgreen";
  } else {
    ev.style.backgroundColor = "lightred";
  }
}

function ValidateThePath2(theString) {
  var re = /([a-zA-Z0-9])+/g;
  UpdateTheDate();
  if (typeof theString === 'undefined') return;
  //console.log(theString);
  var found = false;
  var r = new RegExp("/([A-Za-z0-9])\w+/", "g");
  var newFolderText = document.getElementById('newFolderText');
  if (newFolderText !== null && theString !== "undefined" && theString !== "") {
    found = theString.match(re).length > 0 ? true : false;
    //console.log(found);
  }
  var createFolderBtn = document.getElementById('createFolderBtn');

  if (found) {
    newFolderText.style.backgroundColor = "lightgreen";
    newFolderText.value = theString.match(re).join().replace(',', '');
    createFolderBtn.disabled = '';
  } else {
    newFolderText.style.backgroundColor = "lightyellow";
    createFolderBtn.disabled = 'disabled';
  }
}

function RepresentSize(size) {
  var maxSize = 1000;
  if (size <= maxSize) {
    //size = size / maxSize;
    return size + " byte(s)";
  } else if (size >= maxSize && size <= maxSize * 1000) {
    size = size / 1000;
    size = Math.round(size);
    return size + " KB";
  } else if (size >= maxSize * 1000000 && size <= maxSize * 1000) {
    size = size / 1000000;
    size = Math.round(size);
    return size + " MB";
  } else if (size >= maxSize * 1000000000 && size <= maxSize * 1000000) {
    size = size / 1000000000;
    size = Math.round(size);
    return size + " GB";
  } else if (size >= maxSize * 1000000000000 && size <= maxSize * 1000000000) {
    size = size / 1000000000000;
    size = Math.round(size);
    return size + " TB";
  } else if (size >= maxSize * 1000000000000000 && size <= maxSize * 1000000000000) {
    size = size / 1000000000000000;
    size = Math.round(size);
    return size + " PB";
  }
}

function RepresentDate(date) {
  return "Modified: " +
    dateFormat(date, 'm/d/yy hh:MM tt');
}

function AddContentToDivWithFilter(textPath, filter) {
  if (typeof filter === "undefined") {
    filter = "";
  }
  var hideDirectory = false;
  var directoryCheckBox = document.getElementById('directoryCheckBox');
  if (directoryCheckBox !== null && directoryCheckBox.checked) {
    hideDirectory = true;
    //console.log("hide", hideDirectory);
  }
  var content = document.getElementsByClassName('m3ucontent')[0].parentElement;
  //console.log('content');
  //console.log(content);
  //console.log(text);
  //var conttent2 = document.getElementById('fileContent');
  //conttent2 = document.querySelectorAll('fileContent');
  //console.log(conttent2);
  if (typeof textPath === "undefined") {
    textPath = path;
  }
  //console.log(path);
  //console.log(text);
  else {
    path = textPath;
  }
  //path = text;
  //console.log(path);
  //console.log(text);

  var k = 0;
  var theDiv = document.createElement("div");
  theDiv.setAttribute("id", "theFileContent");
  var files = fs.readdirSync(path);
  var theCode = '';
  for (var i in files) {
    var theDiv2 = document.createElement("div");
    var fileName = files[i];
    var line = '';
    var line0 = '';
    var spanPath = '<span class=spanPath>'
    var spanSize = '<span class=spanSize>';
    var spanDateCreated = '<span class=spanDateCreated>';
    var spanDateModified = '<span class=spanDateModified>';
    var spanDateAccessed = '<span class=spanDateAccessed>';
    var spanClosed = "</span>";
    var spanRadio = "<span class=spanRadio><input type='radio' class='spanRadioChoose' id='spanRadioChoose' name='spanRadioChoose'  />" + spanClosed;

    var fullpath = path + '/' + fileName;


    var eachFileInArray = path + '/' + files[i].trim();
    eachFileInArray = fullpath;
    var emptyDiretory = false; //fse.emptyDirSync(fullpath);
    //console.log(MeetsRuleReg2(eachFileInArray, text));
    //console.log(IsFile(eachFileInArray));
    //console.log(eachFileInArray);
    //console.log(fs.statSync(eachFileInArray));
    var fileDetail = fs.statSync(eachFileInArray);
    if (MeetsRuleReg2(eachFileInArray, filter) === true) {
      line0 = '<input type=checkbox checked=checked id="chk"' + k + ' />';
      if (emptyDiretory === true) {
        line = '<div class="blueish">' + line0 + '' + spanPath + eachFileInArray + spanClosed + '</div>';
      } else {
        line = '<div class="blueish">' + line0 + '' + spanPath + eachFileInArray + spanClosed + '</div>';
      }

    } else {
      line0 = '<input type=checkbox id="chk' + k + '" />';
      if (emptyDiretory === true) {
        line = '<div class="yellowback">' + line0 + '' + spanPath + eachFileInArray + spanClosed + '</div>';
      } else {
        line = '<div class="yellowback">' + line0 + '' + spanPath + eachFileInArray + spanClosed + '</div>';
      }
    }

    if (!IsFile(eachFileInArray)) {
      line = line.replace(
        'class="',
        'class="strike ');
      line = line.replace(line0, '');
      //line = line.replace('</div>', spanRadio + '</div>');

      theDirectories.push(eachFileInArray.replace(path + '/', ''));
    }
    if (hideDirectory && !IsFile(eachFileInArray)) {
      line = line.replace('class="', 'style="display:none" class="');
    }


    //console.log(fileDetail["size"]);
    if (fileDetail.size <= 64) {
      line = line.replace('class="', 'class="red ');
    }
    spanSize = spanSize + RepresentSize(fileDetail.size) + spanClosed;
    spanDateModified = spanDateModified + RepresentDate(fileDetail.mtime) + spanClosed;
    line = line.replace('</div>', spanSize + '</div>');
    line = line.replace('</div>', spanDateModified + '</div>');

    if (IsFile(eachFileInArray)) {
      spanRadio = spanRadio.replace("id='spanRadioChoose'", "id='spanRadioChoose' value='" + eachFileInArray + "'");
      line = line.substr(0, line.length - '</div>'.length) + spanRadio + '</div>';
    }
    k++;
    theCode = theCode + line;
    ///console.log(files[i]);
    //console.log(line);
    theDiv2.innerHTML = theDiv2.innerHTML + theCode;
    theDiv = theDiv.appendChild(theDiv2);
    //console.log(theDiv);
  }
  theDiv.setAttribute('id', 'fileContent1234');
  content = content.appendChild(theDiv);

}

function AddContentToDiv() {
  var childElement, appendChildElement;
  //console.log('NEW!!');
  var parentElement = document.getElementById('fileContentDiv');
  if (parentElement === null) {
    console.log('parent missing');
    //console.log(document);
  }
  childElement = document.createElement("div");
  if (childElement === null) {
    console.log("really!!");
  }
  //appendChildElement.innerHTML = "eeeee"
  var node = document.createTextNode("This is new.");
  //childElement = childElement.appendChild(node);
  //theDiv.innerHTML = "True";
  //theDiv.appendChild(node);
  //theDiv = fileContentDiv.appendChild(theDiv);
  //appendChildElement = parentElement.appendChild(childElement);

  console.log('NEW!!!');

}

function HideJunk() {
  var output1 = document.getElementById('output');
  output1.style.display = "none";
  var output2 = document.getElementById("output2");
  output2.style.display = "none";
  var myRange = document.getElementById("myRange");
  myRange.style.display = "none";
}
console.log('start');
var theDirectories = [];
MutationJob();
HideJunk();
var path = process.cwd() + "/Demo";
document.writeln("<p class='m3ucontent'>");
var labelPath = document.getElementById('labelPath');
if (labelPath !== null) {
  //console.log('label', labelPath);
  labelPath.textContent = "Path:" + path;
}

var spanPath = document.getElementsByClassName('pathValue')[0];
spanPath.innerHTML = "";
var files = fs.readdirSync(path);
//console.log(files);
var tbox = document.getElementById("fileLocal");
if (tbox !== null) {
  tbox.value = path;
  tbox.addEventListener("keyup", ValidateThePath(tbox));
}
var createFolderBtn = document.getElementById('createFolderBtn');
createFolderBtn.disabled = 'disabled';

var newFolderText = document.getElementById("newFolderText");
//console.log(newFolderText);
if (newFolderText !== null) {
  newFolderText.addEventListener("keyup", function () {
    ValidateThePath2(newFolderText.value);
    UpdateTheDate();
  });
}
var directoryCheckBox = document.getElementById('directoryCheckBox');
if (directoryCheckBox !== null) {
  directoryCheckBox.addEventListener('click', function () {
    //console.log('checked');
    UpdateTheDate();
    //AddContentToDivWithFilter(fileLocal.value, "");
    ClearFilterText();
    doAct();

  });
}
//var createFolderBtn = document.getElementById('createFolderBtn');
if (createFolderBtn !== null) {
  createFolderBtn.addEventListener('click', function (ev) {
    console.log('clicked');
    if (newFolderText !== null && tbox !== null) {
      var newpath = tbox.value + '/' + newFolderText.value;
      console.log(newpath);
      console.log(fs.existsSync(newpath));
      if (!fs.existsSync(newpath)) {
        fs.mkdirSync(newpath);
      }
      ev.preventDefault();
    }
  });
}
PopulateTheSlider();

function PopulateTheSlider() {
  console.log('slider start');
  var slider = document.getElementById("myRange");
  var output = document.getElementById("output");
  var output2 = document.getElementById("output2");
  var demoText = document.getElementById("demoText");
  var slider2 = document.getElementById("myRange2");
  var slider3 = document.getElementById("myRange3");
  var demoTextHidden = document.getElementById("demoTextHidden");
  //demoText.value = path;
  slider.max = demoTextHidden.value.length;
  slider2.min = 0;
  slider2.max = Math.ceil(demoTextHidden.value.length / 2);
  slider3.min = Math.ceil(demoTextHidden.value.length / 2) + 1;
  slider3.max = demoTextHidden.value.length;
  slider3.value = slider3.max;
  output.innerHTML = slider.value; // Display the default slider value

  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function () {
    output.innerHTML = this.value;
    demoText.value = demoTextHidden.value.substr(0, this.value);
  }
  slider2.oninput = function () {
    //var slider3 = document.getElementById("myRange3");
    output.innerHTML = this.value;
    //demoText.value = path.substr(this.value).replace(path.substr(slider3.value), '');
    demoText.value = demoTextHidden.value.substr(0, slider3.value).substr(this.value);
  }

  slider3.oninput = function () {
    //var slider2 = document.getElementById("myRange2");

    output2.innerHTML = this.value;
    //demoText.value = path.substr(slider2.value).replace(path.substr(this.value), '');
    demoText.value = demoTextHidden.value.substr(0, this.value).substr(slider2.value);

  }
}

function UpdateTheDate() {
  var upDateText = document.getElementById("upDateText");
  if (upDateText !== null) {
    var a = Date.now();
    upDateText.value = dateFormat(a, 'm/d/yy, hh:MM:ss tt');
    upDateText.readonly = true;
  }
}
//document.addEventListener('change', UpdateTheDate());
document.body.addEventListener('DOMSubtreeModified', function () {
    UpdateTheDate();
  }

);
//WriteArray(files);

//document.write('</form>')
document.write("</p>");

var input = document.getElementById("btn");
var filtering = document.getElementById("filterText");
filtering.addEventListener("keyup", function () {
  //console.log("filter:" + this.value);
  var cc = document.getElementById('fileContent1234');
  //console.log(cc);
  if (cc !== null) {
    cc.remove();
    var fileLocal = document.getElementById('fileLocal');
    AddContentToDivWithFilter(fileLocal.value, this.value);
    UpdateTheDate();
  }
});

function doAct() {
  UpdateTheDate();
  var fileLocal = document.getElementById('fileLocal');
  var pathText = fileLocal.value;
  var cc = document.getElementById('fileContent1234');
  //console.log(cc);
  if (cc !== null) {
    cc.remove();
    AddContentToDivWithFilter(pathText);
  }
}

function ClearFilterText() {
  var filtering = document.getElementById("filterText");
  if (filtering !== null) {
    filtering.value = "";
    UpdateTheDate();
  }
}


//console.log(filtering);
var nodeVersion = document.getElementById('footer');
var filelocation = document.getElementById("filelocation");
var fileLocal = document.getElementById('fileLocal');
fileLocal.addEventListener("keyup", function () {
  //console.log("path: " + this.value);
  //console.log(fs.existsSync(this.value));
  ClearFilterText();
  UpdateTheDate();
  var pathText = this.value;
  if (fs.existsSync(pathText)) {
    if (pathText.endsWith('//') || pathText.endsWith('/')) {
      //pathText = pathText.substring(0, pathText.length - 1);
      return;
    }
    this.style.backgroundColor = 'lightgreen';
    var cc = document.getElementById('fileContent1234');
    //console.log(cc);
    if (cc !== null) {
      cc.remove();
      //console.log(pathText);
      AddContentToDivWithFilter(pathText);
    }
  } else {
    this.style.backgroundColor = 'yellow';
  }
});
//var hiddenVal = document.getElementById("hiddenVal");
//hiddenVal = document.getElementsByName("hiddenVal");
//var hiddenVal = document.body.querySelector("div#fileContentDiv");
//console.log(hiddenVal);
//console.log(filelocation);
//console.log(input);
//console.log(input.parentElement);
input.addEventListener('click', function (event) {
  console.log('button clicked!!!!' + event);
  var cc = document.getElementById('fileContent1234');
  //console.log(cc);
  if (cc !== null) {
    cc.remove();
  }
  //ReWriteDirectoryContent();
  AddContentToDivWithFilter();
  UpdateTheDate();
  event.preventDefault();
});
var moveToBtn = document.getElementById('moveToButton');
//moveToBtn = document.querySelector('button#moveToButton');
//console.log('button', moveToBtn);
nodeVersion = document.getElementById('nodeVersion');
//console.log(nodeVersion);
//if (moveToButton1 === null)
//  moveToButton1 = document.getElementsByName("moveToButton");
//{

moveToBtn.addEventListener('click', function (event) {
  //console.log(moveToBtn);
  var arr = [];
  console.log('button clicked!!!!' + event);
  var x = document.querySelectorAll('div>input#chk');
  var pathText = document.getElementById('fileLocal');
  if (pathText != null)
    pathText = pathText.value;
  for (var i = 0; i < x.length; i++) {
    //console.log(x[i].checked);
    if (x[i].checked == true) {
      var y = x[i].parentNode.childNodes;
      arr.push(x[i].parentNode.childNodes[1].textContent.replace(pathText, ''));

      //event.target.optSelected
    }

  }
  var theSelect = document.getElementById('directorySelect');
  arr.forEach(function (item) {
    var oldpath = pathText + item;
    var newpath = pathText + '/' + theSelect.options[theSelect.selectedIndex].value + item;
    //console.log(pathText, item, theSelect.options[theSelect.selectedIndex].value);
    console.log(oldpath, newpath);
    //fs.renameSync(oldpath,newpath);
  });
  //console.log(arr);
  UpdateTheDate();
  event.preventDefault();
  //event.stopPropagation();

});
//}
//var b = document.getElementById("b");
//console.log('b', b);
var resetBtn = document.getElementById('resetBtn');
//console.log('reset', resetBtn);
resetBtn.addEventListener('click', function (event) {
  ResetBtnAction(event);
});

var xx = function heyYall() {
  console.log('ha!')
}

RunTheJob('demoText', 'keyup', xx);

function RunTheJob(elementID, eventype, theFunction) {
  console.log(elementID);
  var theObject = document.getElementById(elementID);
  if (theObject !== null) {
    console.log(theObject, eventype);
    theObject.addEventListener(eventype, function (event) {
      theFunction;
    });
  }
}

filelocation.addEventListener('change', function (event) {
  //console.log('filelocation.files:: ' + this.value);
  //console.log(this.val());
  //console.log(event.target.files[0].webkitRelativePath);
  var pathText = event.target.files[0].path;
  //console.log(event.target.files);
  ClearFilterText();
  UpdateTheDate();
  var fileLocal = document.getElementById('fileLocal');
  fileLocal.value = pathText;
  var cc = document.getElementById('fileContent1234');
  //console.log(cc);
  if (cc !== null) {
    cc.remove();
    AddContentToDivWithFilter(pathText);
  }
});

fileLocal.addEventListener('keypress', ReWriteDirectoryContent());

function MutationJob() {
  //console.log(1);
  var targetNode = document.getElementById('directoryDiv');
  if (targetNode === null) return;
  var config = {
    childList: true,
    subtree: true
  };

  // Callback function to execute when mutations are observed
  var callback = function (mutationsList, observer) {
    for (var mutation of mutationsList) {
      if (mutation.type == 'childList') {
        console.log('A child node has been added or removed.');
      }

      //console.log(mutation.type);
    }
  };

  // Create an observer instance linked to the callback function
  var observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);

  // Later, you can stop observing
  //observer.disconnect();
}
//console.log(theDirectories);
PopulateSelect();
RadioButtonSelectAction();

function RadioButtonSelectAction() {
  var radioBtn = document.getElementsByName('spanRadioChoose');
  var radioBtn2 = document.querySelectorAll('input[type="radio"]');
  var r = document.getElementsByName("spanRadioChoose");
  var demoTextHidden = document.getElementById('demoTextHidden');
  var demoText = document.getElementById('demoText');
  if (radioBtn != null) {
    //console.log(radioBtn, radioBtn.length);
    for (var x = 0; x < radioBtn.length; x++) {
      //console.log(radioBtn[x]);
      radioBtn[x].addEventListener('click', function () {
        demoText.value = this.value;
        demoTextHidden.value = this.value;
        PopulateTheSlider();
        //console.log(this.value);
      });
      // console.log(x);
    }
    //console.log(radioBtn);
    //console.log(radioBtn2);
    //console.log(r);

  }

}



function PopulateSelect() {
  var directorySelect = document.getElementById('directorySelect');
  for (var i = 0; i < theDirectories.length; i++) {
    var opt = theDirectories[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    directorySelect.appendChild(el);
  }
}
console.log('end');

function ResetBtnAction(event) {
  var cc = document.getElementById('fileContent1234');
  //console.log(cc);
  if (cc !== null) {
    cc.remove();
    UpdateTheDate();
    AddContentToDivWithFilter();
  }
}

function ReWriteDirectoryContent() {
  //console.log('file location changed!!');
  var m3ucontent = document.getElementsByClassName('m3ucontent')[0];
  //console.log(m3ucontent);
  //m3ucontent.innerHTML = "test";

  //theDiv.innerHTML = "test";
  var k = 0;

  for (var i in files) {
    var theDiv = document.createElement("div");
    var fileName = files[i];
    var line = '';
    var line0 = '';
    var spanSize = '<span class=spanSize>';
    var spanDateCreated = '<span class=spanDateCreated>';
    var spanDateModified = '<span class=spanDateModified>';
    var spanDateAccessed = '<span class=spanDateAccessed>';
    var spanClosed = "</span>";

    var fullpath = path + '/' + fileName;
    //console.log(fs.statSync(fullpath));

    var eachFileInArray = path + '/' + files[i].trim();
    eachFileInArray = fullpath;
    if (IsFile(eachFileInArray) === true && MeetsRules(eachFileInArray)) {
      line0 = '<input type=checkbox checked=checked />';
      line = '<div class=red>' + line0 + '' + eachFileInArray + '</div>';


    } else {
      line0 = '';
      line = '<div class=green>' + line0 + '' + eachFileInArray + '</div>';
    }
    ///console.log(files[i]);
    //console.log(line);
    theDiv.innerHTML = line;
    //commented out the code below
    //m3ucontent = m3ucontent.appendChild(theDiv);

  }
  //var theParent = m3ucontent.parentNode;
  //m3ucontent.removeChild();
  // m3ucontent.innerHTML = "replaced!!";
  AddContentToDivWithFilter();
}

//not used
function WriteArray(files) {
  for (var i in files) {
    var fileName = files[i];
    var line = '';
    var line0 = '';

    var fullpath = path + '/' + fileName;

    var eachFileInArray = path + '/' + files[i].trim();
    eachFileInArray = fullpath;
    if (IsFile(eachFileInArray) === true && MeetsRules(eachFileInArray)) {
      line0 = '<input type=checkbox checked=checked />';
      line = '<div class=red>' + line0 + '(Y): ' + eachFileInArray + '</div>';

    } else {
      line0 = '';
      line = '<div class=green>' + line0 + '(N): ' + eachFileInArray + '</div>';
    }
    //console.log(files[i]);

    //document.writeln(line);


  }
}
