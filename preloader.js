"use strict";

var LOADER_ID = "loader";
var BODY_CLASS = "body";
var START_POINT = -200;

function is_cached(src) {
    var image = new Image();
    image.src = src;
    return image.complete;
}


function loadImage(timeline) {
  var img = new Image(), url = timeline.currentFrame().data;
  img.src = url;
  console.log("loadImage - image source--");
  console.log(img.src);

  img.onload = function() {
      var body = document.getElementsByTagName(BODY_CLASS)[0];
      body.style.backgroundImage = "url(" + url + ")";

      setTimeout( // remove loader
      function() {
          var loader = document.getElementById(LOADER_ID);
          if(loader)
            body.removeChild(loader);
        }, 200);
      };
}

function navigate(direction, timeline) {
  if (direction > 0) timeline.nextFrame();
  else if (direction < 0) timeline.previousFrame();
  else timeline.setCurrentToFirstFrame();

  if (!is_cached(timeline.currentFrame().data)) {
    // put in loader
    var loader = document.createElement("div");
    loader.id = LOADER_ID;
    document.getElementsByTagName(BODY_CLASS)[0].appendChild(loader);
  }
  loadImage(timeline);
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

function beforeDOMisLoaded (downloadLocations, timeline, descHashTable) {

  fetch("http://128.199.83.231/pictorials")
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {

      setupHashTable(descHashTable, data);
      setupDownloadLocations(downloadLocations, data);
      setupTimeline(timeline, downloadLocations);

      timeline.setCurrentToFirstFrame();

      var carousel = (function(){
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
