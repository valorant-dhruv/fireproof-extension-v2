chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  var tbody = document.querySelector("#table-body");

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
    } else {
      //Inside this give a message that the current application has no databases provisioned through fireproof
      var newRow = document.createElement("tr");
      var newCell = document.createElement("td");
      newCell.textContent = "No databases present";
      newRow.appendChild(newCell);
      tbody.appendChild(newRow);
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
      alert(`Ok so the row ${e.srcElement.innerHTML} has been clicked`);
      await chrome.runtime.sendMessage({
        data: e.srcElement.innerHTML,
        to: "background",
      });
    });
  });
}
