import { displayTemplateStructure } from "./treeRendering.js";
const templates = await window.templit.templates();
const menuMaximizeBtn = document.getElementById("max-btn");
const menuMinimizeBtn = document.getElementById("min-btn");
const menuCloseBtn = document.getElementById("close-btn");

document
  .getElementById("template-location-btn")
  .addEventListener("click", getTemplatePathToCopy);
document
  .getElementById("cancel-template-btn")
  .addEventListener("click", closeWindow);
document
  .getElementById("save-template-btn")
  .addEventListener("click", saveTemplate);
menuMaximizeBtn.addEventListener("click", () => {
  window.templit.maximizeScreen("templateWindow");
});
menuMinimizeBtn.addEventListener("click", () => {
  window.templit.minimizeScreen("templateWindow");
});
menuCloseBtn.addEventListener("click", () => {
  window.templit.closeScreen("templateWindow");
});

async function getTemplatePathToCopy() {
  try {
    let dialogObj = await window.functions.getTemplatePathToCopy();
    let localPathName = dialogObj.filePaths[0];
    console.log(localPathName);
    document
      .getElementById("template-location")
      .setAttribute("value", localPathName);
    let fileStructure = await window.templit.filePathToArray(localPathName);
    displayTemplateStructure(
      fileStructure,
      document.getElementById("folder-structure-content")
    );
    window.functions.sendCopyTemplateFilePath(localPathName);
  } catch (err) {
    console.log(err);
  }
}

function closeWindow() {
  window.templit.closeTemplateWindow();
}

function saveTemplate() {
  const templateSourcePath = document.getElementById("template-location").value;
  const templateName = document.getElementById("template-name").value;
  window.templit.createNewTemplate(templateSourcePath, templateName);
  window.templit.refreshWindow("templateWindow");
  closeWindow();
}
