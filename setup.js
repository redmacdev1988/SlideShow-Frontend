"use strict";

var LOADER_ID = "loader";
var BODY_CLASS = "body";
var START_POINT = -200;

function is_cached(src) {
    console.log("Checking to see if " + src + " is cached");
    var image = new Image();
    console.log("image.src = " + src);
    image.src = src;
    console.log("image.complete is: " + image.complete);
    return image.complete;
}


function loadImage(timeline) {
    var img = new Image(), url = timeline.currentFrame().data;
    img.onload = function() {
        console.log(" image at url loaded into JS Image() object, let's set it to the backgroundImage property.");
        var body = document.getElementsByTagName(BODY_CLASS)[0];
        body.style.backgroundImage = "url(" + url + ")";

        setTimeout( // remove loader
            function() {
                var loader = document.getElementById(LOADER_ID);
                if(loader)
                body.removeChild(loader);
            }, 200);
    };
    console.log("img.src = " + url);
    img.src = url;
  }

function navigate(direction, timeline) {
  if (direction > 0) timeline.nextFrame();
  else if (direction < 0) timeline.previousFrame();
  else timeline.setCurrentToFirstFrame();

  var imgURL = timeline.currentFrame().data;

  if (!is_cached(imgURL)) {
    console.log("setup.js - NOT cached, so we put up a loader animation");
    var loader = document.createElement("div");
    loader.id = LOADER_ID;
    document.getElementsByTagName(BODY_CLASS)[0].appendChild(loader);
    console.log("setup.js - loading the image with loadImage");
    loadImage(timeline);
  } else {
    console.log("setup.js - image already cached...just stick it in the background");
    var body = document.getElementsByTagName(BODY_CLASS)[0];
    body.style.backgroundImage = "url(" + imgURL + ")";
  }


}


function setupHashTable(hashTable, dataArray) {
  for(var index = 0; index < dataArray.length; index++) {
      console.log("inserting into hash table: " + dataArray[index].name);
      hashTable.insert(dataArray[index].name, dataArray[index]);
  }
}

function setupDownloadLocations(locations, data) {
    for (var imageIndex = 0; imageIndex < data.length; imageIndex++) {
        var imageFileLocation = "http://128.199.83.231/"+data[imageIndex].fileName;
        locations.push(imageFileLocation);
    }
}

function setupTimeline(timeline, downloadLocations) {
  for (var index = 0; index < downloadLocations.length; index++) {
      timeline.insertTimeFrame(downloadLocations[index]);
  }
}

function defaultDescriptionPosition(descElemID) {
  var imgDesc = document.getElementById(descElemID);
  if (imgDesc.style.top != "") {
    // if its > 0, bring it up to -200px
    var top = imgDesc.style.top.replace(/[^0-9\-]/g, '');
    var topNum = Number(top);

    // if it is visible
    if (topNum > 0) {
        imgDesc.style.top = START_POINT+"px"; // let's make it invisible
    }
  }
}

function afterDOMisLoaded (downloadLocations, timeline, descHashTable) {

  fetch("http://128.199.83.231/pictorials")
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {

      console.log(data);

      setupHashTable(descHashTable, data);
      setupDownloadLocations(downloadLocations, data);
      setupTimeline(timeline, downloadLocations);

      timeline.setCurrentToFirstFrame();

      var carousel = (function() {
        console.log("preloader.js - addEventListener");
        var next = document.querySelector('.next');
        var prev = document.querySelector('.prev');

        next.addEventListener('click', function(ev) {
          defaultDescriptionPosition("imageDescription");
          navigate(1, timeline);
        });

        prev.addEventListener('click', function(ev) {
          defaultDescriptionPosition("imageDescription");
          navigate(-1, timeline);
        });

        navigate(0, timeline); // we default it to the first frame
      })();

    });
}
