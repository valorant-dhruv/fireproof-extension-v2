chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  var tbody = document.querySelector("#table-body");
  tbody.innerHTML = "";

  if (message.data) {
    //Perform the DOM manipulation
    console.log("This is the data received from background.js", message.data);

    //Loop through the received data from the background.js
    message.data.forEach(function (databaseName) {
      var newRow = document.createElement("tr");
      var newCell = document.createElement("td");
      newCell.textContent = databaseName;
      newRow.appendChild(newCell);
      tbody.appendChild(newRow);
    });
  } else {
    //Inside this give a message that the current application has no databases provisioned through fireproof
    var newRow = document.createElement("tr");
    var newCell = document.createElement("td");
    newCell.textContent = "No databases present";
    newRow.appendChild(newCell);
    tbody.appendChild(newRow);
  }

  sendResponse("Ok so the popup.js has functioned properly");
});
