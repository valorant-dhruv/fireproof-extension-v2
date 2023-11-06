chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  var tbody = document.querySelector("#table-body");
  var tbody2 = document.querySelector("#table-body-docs");

  if (message.for == "extension") {
    if (message.data.length != 0) {
      //Perform the DOM manipulation
      console.log("This is the data received from background.js", message.data);
      globaldata = message.data;

      tbody.innerHTML = "";

      //Loop through the received data from the background.js
      message.data.forEach(function (databaseName) {
        var newRow = document.createElement("tr");
        var newCell = document.createElement("td");
        newCell.id = databaseName;
        newCell.textContent = databaseName;
        newRow.appendChild(newCell);
        tbody.appendChild(newRow);
      });

      addlisteners(message.data);
      sendResponse("Ok so the popup.js has functioned properly");
    }
  } else {
    if (message.data.length != 0) {
      //Perform the DOM manipulation
      console.log(
        "These are the documents received in popup.js from service worker",
        message.data
      );
      tbody2.innerHTML = "";

      //Loop through the received data from the background.js
      message.data.forEach(function (doc) {
        var newRow = document.createElement("tr");
        var newCell = document.createElement("td");
        var newCell2 = document.createElement("td");
        console.log(doc);
        newCell.textContent = doc.key;
        newCell2.textContent = JSON.stringify(doc.value);
        newRow.appendChild(newCell);
        newRow.appendChild(newCell2);
        tbody2.appendChild(newRow);
      });

      addlisteners(message.data);
      sendResponse("Ok so the popup.js has functioned properly");
    }
  }
});

//We need to add event listeners to the database names rows so that whenever they are clicked an alert opens up
//We already have assigned unique ids to all the table rows
function addlisteners(globaldata) {
  globaldata.forEach((element) => {
    //Now fetch the table rows which match the id
    let row = document.querySelector(`#${element}`);
    row.addEventListener("click", async (e) => {
      await chrome.runtime.sendMessage({
        data: e.srcElement.innerHTML,
        to: "background",
      });
    });
  });
}
