"use strict";

var START_POINT = -200;
var END_POINT = 350;
var SPEED = 20;

var gPos = START_POINT; // start from 0 with every click of button
var visible = false;

function toggleImageDescription(timeline, descriptionHashTable, descriptionElementID) {

    // http://345.34.35.345/haha.jpg
    var url = timeline.currentFrame().data;
    var urlArray = url.split('/');
    var fileNameWithExt = urlArray[urlArray.length-1]; // beijing.jpg
    var fileName = fileNameWithExt.substr(0, fileNameWithExt.indexOf('.')); // beijing
    var found = descriptionHashTable.access(fileName); // see if "beijing" exists
    var elem = document.getElementById(descriptionElementID);
    elem.innerHTML = (found) ? found.description : "";

    var top = elem.style.top;
    if (top != "") {
        var topPx = top.replace(/[^0-9\-]/g, '');
        gPos = Number(topPx);
        visible = (gPos < 0) ? false : true;
    } else {
      elem.style.top = START_POINT+"px";
      gPos = START_POINT;
      visible = false;
    }

    var id = setInterval(animateDescriptionFunc, 5); // calls frame function every 5 millisecond
    function animateDescriptionFunc() {
        if (visible === false) {
          if (gPos >= END_POINT) {
            clearInterval(id);
            visible = true;
          }
          else {
            gPos += SPEED;
            elem.style.top = gPos + 'px';
          }
        } else {
          if (gPos > START_POINT) {
            gPos -= SPEED;
            elem.style.top = gPos + 'px';
          } else {
            clearInterval(id);
            visible = false;
          }
        }
    }

}
