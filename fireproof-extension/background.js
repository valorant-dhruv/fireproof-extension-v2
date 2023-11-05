chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Message received from the content script", sender);
  console.log("This is the request", request);

  (async () => {
    const response = await chrome.runtime.sendMessage({ data: request });
    console.log("This is the response from popup.js", response);
  })();
});
