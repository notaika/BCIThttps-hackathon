document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("template-location-btn").addEventListener("click", getTemplatePathToCopy);
  document.getElementById("cancel-btn").addEventListener("click", closeWindow)
})


async function getTemplatePathToCopy() {
  try {
    let dialogObj = await window.functions.getTemplatePathToCopy();
    let localPathName = dialogObj.filePaths[0];
    window.functions.sendCopyTemplateFilePath(localPathName);
  } catch (err) {
    console.log(err);
  }
}

function closeWindow() {
  console.log("test")
  window.templit.closeTemplateWindow();
}