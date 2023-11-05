chrome.devtools.panels.create(
  "Fireproof Databases",
  "../images/fireproof_img.png",
  "./popup.html",
  function (panel) {
    console.log("The panel for the extension has been created");
  }
);
