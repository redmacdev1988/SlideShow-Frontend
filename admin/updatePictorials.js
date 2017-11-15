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
  var titleAttributes = [];
  titleAttributes.push({
    name : "class",
    value : "alert alert-success"
  });
  return createElement("div", titleAttributes, "Edit existing description text below. You can also delete the pictorial.");
}

function createNameLabel(index) {
    var nameAttributes = [];
    nameAttributes.push({
      name : "class",
      value : "badge badge-light idName"
    });
    return createElement("span", nameAttributes,gDescriptionData[index].name);
}

function createFileNameLabel(index) {
    var fileNameAttributes = [];
    fileNameAttributes.push({
      name : "class",
      value : "badge badge-info fileName"
    });
    return createElement("span", fileNameAttributes, gDescriptionData[index].fileName);
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

function createDeleteBtn(index) {
  var deleteBtnAttributes = [];
  deleteBtnAttributes.push({
    name : "class",
    value : "delete"
  });
  deleteBtnAttributes.push({
    name : "id",
    value : gDescriptionData[index].name
  });

  var deleteButton = createElement("button", deleteBtnAttributes, "delete");

  deleteButton.addEventListener ("click", function() {
      console.log("DELETE button clicked!");
      var requestURL = API_URL + this.getAttribute("id");
      var request = new Request(requestURL, {
        method: 'DELETE',
        mode: 'cors',
        body: "pictorialId="+gDescriptionData[index].name, // 2 mb limit
        redirect: 'follow',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      });

      fetch(request).then(function(result) {
        console.log("--- result ----");
        console.log(result);
        document.location.reload(true); // refresh page

      });
  }); // addEventListener

  return deleteButton;
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

        console.log("update button clicked!");
        var newDescription = document.getElementById(this.getAttribute("id")).value;
        var requestURL = API_URL + this.getAttribute("id");
        console.log("requestURL: ");
        console.log(requestURL);

        var formData = new FormData();
        formData.append('myKey', 'Ha dooooo ken!');

        var request = new Request(requestURL, {
        	method: 'PUT',
        	mode: 'cors',
          body: "description="+newDescription, // 2 mb limit
        	redirect: 'follow',
        	headers: new Headers({
        		'Content-Type': 'application/x-www-form-urlencoded'
        	})
        });

        fetch(request).then(function(result) {
            if (result.status == 200) {
              alert("updated");
            }
        });

    });
    return updateButton;
}

function createSection(dataIndex) {
    var sectionAttributes = [];
    sectionAttributes.push({
      name : "class",
      value : "list-group-item"
    });

    return createElement( "li",
      sectionAttributes,
      undefined,
      [createNameLabel(dataIndex), createFileNameLabel(dataIndex),
        createTextArea(dataIndex), createUpdateBtn(dataIndex), createDeleteBtn(dataIndex)]);
}




function plasterDataIntoElmentID(dataArray, elementID) {
  var containerAttributes = [];
  containerAttributes.push({
    name : "class",
    value : "list-group"
  });

  var container = createElement("ul", containerAttributes);
  container.appendChild(createTitleLabel());

  for (var i = 0; i < dataArray.length; i++) {
    container.appendChild(createSection(i));
  }

  if (document.getElementById(elementID).appendChild(container))
    return true;

  return false;
}


fetch(API_URL)
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {

    console.log("description data received from " + API_URL);
    console.log(data);
    var EDITING_SECTION_ID = "editingSection";

    gDescriptionData = data;

    var dataPlasteredIn = new Promise(
        function (resolve, reject) {
            if (plasterDataIntoElmentID(gDescriptionData, EDITING_SECTION_ID)) { resolve("plastered"); }
            else { reject("Error"); }
        }
    ); //Promise

    var injectData = function () {
        dataPlasteredIn // call our promise variable
            .then(function (result) {
                if(result === "plastered") {
                  console.log("Data Injected!");

                  var items = document.getElementById(EDITING_SECTION_ID).getElementsByClassName("list-group-item");
                  for ( var i = 0; i < items.length; i++) {
                      if (i%2==0) items[i].style.backgroundColor = "pink";
                      else items[i].style.border = "2px solid black";
                  }

                }
            })
            .catch(function (error) {
                console.log(error.message);
            });
    };

    injectData();


  });
