import { fireproof } from "use-fireproof";
// const [fireproof]=require("@fireproof/core");

let arr = [];

Object.keys(localStorage).forEach(function (key) {
  if (key.includes("fp.0.14.meta.")) {
    let temp = key.slice(13);
    let temparr = temp.split(".");
    arr.push(temparr[0]);
  }
});

(async () => {
  console.log("This is the array of database names", arr);
  const response = await chrome.runtime.sendMessage(arr);
  console.log(response);
})();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    "This is the click event data received from the service worker",
    request.data
  );

  async function querydatabase() {
    let result = fireproof(request.data);
    console.log("This is the result from fireproof", result);
    let queryresult = await result.allDocs();
    console.log("The query result", queryresult);
    const finalresult = { data: queryresult.rows, type: "document" };
    const response = await chrome.runtime.sendMessage(finalresult);
  }

  querydatabase();
});
