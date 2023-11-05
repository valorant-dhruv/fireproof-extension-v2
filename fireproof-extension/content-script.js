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
  const response = await chrome.runtime.sendMessage(arr);
  // do something with response here, not outside the function
  console.log(response);
})();
