"use strict";

var START_POINT = -200;
var END_POINT = 100;
var SPEED = 20;

var gDescriptionInitialY = START_POINT;
var gDescriptionCurrentY;
var gVisible = false;

function windowOrDescriptionHeightLarger(descriptionElement) {
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return Math.max(viewHeight, descriptionElement.offsetHeight);
}

function moveDescriptionAndMainWindowDown(intervalId,  descriptionElement, mainElement) {

  if (gDescriptionCurrentY >= END_POINT) {
      clearInterval(intervalId);
      gVisible = true;
  }
  else {
      gDescriptionCurrentY += SPEED;
      descriptionElement.style.top = gDescriptionCurrentY + 'px';

      let mainElementY = parseInt(mainElement.style.marginTop, 10);
      mainElementY += SPEED;
      mainElement.style.marginTop = `${mainElementY}px`;
  }

}

function moveDescriptionAndMainWindowUp(intervalId, descriptionElement, mainElement) {
  if (gDescriptionCurrentY > gDescriptionInitialY) {
      gDescriptionCurrentY -= SPEED;
      descriptionElement.style.top = gDescriptionCurrentY + 'px';
      let mainElementY = parseInt(mainElement.style.marginTop, 10);
      mainElementY -= SPEED;
      mainElement.style.marginTop = `${mainElementY}px`;

  } else {
      clearInterval(intervalId);
      gVisible = false;
  }
}

function init(descriptionElement, mainElement, distance) {
  if (gVisible === false) {
    gDescriptionInitialY = distance * -1;
    gDescriptionCurrentY = gDescriptionInitialY;
    descriptionElement.style.top = `${gDescriptionInitialY}px`;
    mainElement.style.marginTop = '0px';// default it
  } else {
    gDescriptionInitialY = distance * -1;
    gDescriptionCurrentY = parseInt(descriptionElement.style.top, 10);
  }
}


function toggleImageDescription(timeline,
  descriptionHashTable,
  descriptionElementID,
  mainElementID) {

    // STARTING POINT
    var url = timeline.currentFrame().data;
    var urlArray = url.split('/');
    var fileNameWithExt = urlArray[urlArray.length-1]; // beijing.jpg
    var fileName = fileNameWithExt.substr(0, fileNameWithExt.indexOf('.')); // beijing
    var found = descriptionHashTable.access(fileName); // see if "beijing" exists

    var descriptionElement = document.getElementById(descriptionElementID);
    var mainElement = document.getElementById(mainElementID);
    descriptionElement.innerHTML = (found) ? found.description : "";
    let distance = windowOrDescriptionHeightLarger(descriptionElement);

    init(descriptionElement, mainElement, distance);

    var id = setInterval(animateDescriptionFunc, 5); // calls frame function every 5 millisecond

    function animateDescriptionFunc() {
        if (gVisible === false) {
            moveDescriptionAndMainWindowDown(id, descriptionElement, mainElement);
        }
        else {
            moveDescriptionAndMainWindowUp(id, descriptionElement, mainElement);
        }

    }

}
