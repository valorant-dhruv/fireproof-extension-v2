chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //The background receives messages from both the content-script and the extension itself
  //When the message from the content script is received a different set of tasks are being performed
  if (sender.tab) {
    //Now we will have to deal with two types of messages, One that is received when the documents arrive
    if (request.type == "document") {
      console.log(
        "Ok so the service worker receives the document data from the content script",
        request
      );

      //Now that the documents are with background.js we send it to the popup
      (async () => {
        await chrome.runtime.sendMessage(request);
      })();
    } else {
      console.log("Message received from the content script", sender);
      console.log("This is the request", request);

      (async () => {
        const response = await chrome.runtime.sendMessage({
          data: request,
          for: "extension",
        });
        console.log("This is the response from popup.js", response);
      })();
    }
  } else {
    console.log("The message is received from the extension", request);
    //Now that we know which database was in fact clicked we need to send this information back to the content-script
    //Once the content script receives the databasename, as it has access to all the packages, it can perform the query4
    (async () => {
      // Send a message from background script to content script
      await chrome.tabs.query(
        { active: true, currentWindow: true },
        async function (tabs) {
          await chrome.tabs.sendMessage(tabs[0].id, {
            data: request.data,
            for: "content-script",
          });
        }
      );
    })();
  }
});

//Does this function instantly run inside the content script?

