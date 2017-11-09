var gDescriptionData;
var API_URL = "http://128.199.83.231/pictorials/";

function createElement(tagName, attributesArray, text, childrenToAppend) {
  var element;
  if (typeof tagName !== 'undefined') { element = document.createElement(tagName); }
  if (typeof text !== 'undefined') { element.appendChild(document.createTextNode(text)); }

  if (Array.isArray(attributesArray) && attributesArray.length > 0) {
    for (var i = 0; i < attributesArray.length; i++) {
        var attribute = attributesArray[i];
        element.setAttribute(attribute.name, attribute.value);
    }
  }

  if (Array.isArray(childrenToAppend) && childrenToAppend.length > 0) {
    for (var i = 0; i < childrenToAppend.length; i++) {
        element.appendChild(childrenToAppend[i]);
    }
  }
  return element;
}

function createTitleLabel() {
  return createElement("h1", undefined, "update existing entries");
}

function createNameLabel(index) {
    var nameAttributes = [];
    nameAttributes.push({
      name : "class",
      value : "name"
    });
    return createElement("p", nameAttributes,gDescriptionData[index].name);
}

function createFileNameLabel(index) {
    var fileNameAttributes = [];
    fileNameAttributes.push({
      name : "class",
      value : "fileName"
    });
    return createElement("p", fileNameAttributes, gDescriptionData[index].fileName);
}

function createTextArea(index) {
    var textAreaAttributes = [];
    textAreaAttributes.push({
      name : "class",
      value : "description"
    });
    textAreaAttributes.push({
      name : "id",
      value : gDescriptionData[index].name
    });
    return createElement("textarea", textAreaAttributes, gDescriptionData[index].description);
}

function createUpdateBtn(index) {
    var updateBtnAttributes = [];
    updateBtnAttributes.push({
      name : "class",
      value : "update"
    });
    updateBtnAttributes.push({
      name : "id",
      value : gDescriptionData[index].name
    });
    updateBtnAttributes.push({
      name : "descriptionData",
      value : gDescriptionData[index].description
    });

    var updateButton = createElement("button", updateBtnAttributes, "update");
    updateButton.addEventListener ("click", function() {
      var newDescription = document.getElementById(this.getAttribute("id")).value;

      var requestURL = API_URL + this.getAttribute("id")
                  + "/description/" + newDescription;

      var request = new Request(requestURL, {
        method: 'PUT',
        headers: new Headers()
      });
      fetch(request)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) {
          console.log("description data received from " + requestURL);
          console.log(data);
        });
    });
    return updateButton;
}

function createSection(dataIndex) {
    var sectionAttributes = [];
    sectionAttributes.push({
      name : "class",
      value : "row"
    });

    return createElement( "div",
      sectionAttributes,
      undefined,
      [createNameLabel(dataIndex), createFileNameLabel(dataIndex), createTextArea(dataIndex), createUpdateBtn(dataIndex)]);
}


fetch(API_URL)
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {

    console.log("description data received from " + API_URL);
    console.log(data);
    gDescriptionData = data;

    var containerAttributes = [];
    containerAttributes.push({
      name : "class",
      value : "section"
    });

    var container = createElement("div", containerAttributes);
    container.appendChild(createTitleLabel());

    for (var i = 0; i < gDescriptionData.length; i++) {
      container.appendChild(createSection(i));
    }
    document.body.appendChild(container);
  });
