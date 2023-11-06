console.log("Content script has been injected into this page.");

let arr = [];

//This is the method for iterating through localstorage
Object.keys(localStorage).forEach(function (key) {
  //Now inside this loop if there is any key that matches the fp.0.14.meta prefix of the string then save it in a different
  //array
  if (key.includes("fp.0.14.meta.")) {
    let temp = key.slice(13);
    let temparr = temp.split(".");
    arr.push(temparr[0]);
  }
});

//Now that we have an array of database names, the next step is to send this data to the service worker of the extension
//This is an IIFE async function
(async () => {
  console.log("This is the array of database names", arr);
  // let result = fireproof("default");
  // console.log("This is the result from fireproof", result);
  // let queryresult = await result.allDocs();
  // console.log("The query result", queryresult);
  const response = await chrome.runtime.sendMessage(arr);
  // do something with response here, not outside the function
  console.log(response);
})();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    "This is the click event data received from the service worker",
    request.data
  );

  //Now that we have received the database name which is clicked, the next step is to query that database
  //How do we query the database with the help of content scripts?

  var url = window.location.href;
  console.log("This is the url on which the application is running", url);

  let data = { value: request.data, for: "react" };

  //Now we post a message to the application
  window.postMessage(data, url);
});

async function fncalled(event) {
  if (event.data.for !== "react") {
    console.log(
      "Ok so the content script got the data back from the react component",
      event.data
    );

    const result = { data: event.data.rows, type: "document" };
    //Now that we have the data back from the react component regarding the documents
    const response = await chrome.runtime.sendMessage(result);
  }
}

window.addEventListener("message", fncalled);
