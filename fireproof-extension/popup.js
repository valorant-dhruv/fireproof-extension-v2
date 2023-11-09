chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // var tbody = document.querySelector("#table-body");
  var tbody = document.querySelector(".dropdown-content");
  var tbody2 = document.querySelector("#table-body-docs");
  var name = document.querySelector("#title");

  if (message.for == "extension") {
    if (message.data.length != 0) {
      //Perform the DOM manipulation
      console.log("This is the data received from background.js", message.data);
      globaldata = message.data;

      tbody.innerHTML = "";

      //Loop through the received data from the background.js
      message.data.forEach(function (databaseName) {
        // var newRow = document.createElement("tr");
        // var newCell = document.createElement("td");
        // newCell.id = databaseName;
        // newCell.textContent = databaseName;
        // newRow.appendChild(newCell);
        // tbody.appendChild(newRow);
        // var newdatabase = document.createElement("a");
        var newdatabase = document.createElement("h4");
        newdatabase.id = databaseName;
        newdatabase.textContent = databaseName;
        newdatabase.focus = "hover";
        tbody.appendChild(newdatabase);
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
      console.log(message);
      console.log("This is the name of the database", message.databasename);
      name.innerHTML = `Database:${message.databasename}`;
      tbody2.innerHTML = "";
      var originalrow = document.createElement("tr");
      var originalcell = document.createElement("td");
      var originalcell2 = document.createElement("td");
      originalcell.textContent = "_id";
      originalcell2.textContent = "doc";
      originalrow.appendChild(originalcell);
      // originalrow.appendChild(originalcell2);
      tbody2.appendChild(originalrow);

      let keys = [];
      let values = [];
      let count = 0;

      //Loop through the received data from the background.js
      message.data.forEach(function (doc) {
        var newRow = document.createElement("tr");
        var newCell = document.createElement("td");
        var newCell2 = document.createElement("td");
        console.log(doc);
        newCell.textContent = doc.key;
        keys.push(doc.key);
        newCell.id = `ok-${count}`;
        count++;
        newCell2.textContent = JSON.stringify(doc.value);
        values.push(JSON.stringify(doc.value, null, 2));
        newRow.appendChild(newCell);
        // newRow.appendChild(newCell2);
        tbody2.appendChild(newRow);
      });

      addlisteners2(keys, values);
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

function addlisteners2(keys, values) {
  console.log("Ok so the event listeners are being added");
  keys.forEach((element, index) => {
    let row = document.querySelector(`#ok-${index}`);
    row.addEventListener("click", async (e) => {
      //Now when the specific row is clicked the doc related to that row is displayed
      let bottom = document.querySelector("#bottom-section");
      bottom.textContent = values[index];
      console.log("This is the value corresponding to the key", values[index]);
    });
  });
}
