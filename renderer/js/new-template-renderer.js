import { displayTemplateStructure } from "./treeRendering.js";
const templates = await window.templit.templates();

document
  .getElementById("template-location-btn")
  .addEventListener("click", getTemplatePathToCopy);
document
  .getElementById("cancel-template-btn")
  .addEventListener("click", closeWindow);
document
  .getElementById("save-template-btn")
  .addEventListener("click", saveTemplate);

async function getTemplatePathToCopy() {
  try {
    let dialogObj = await window.functions.getTemplatePathToCopy();
    let localPathName = dialogObj.filePaths[0];
    document.getElementById("template-location").setAttribute("value", localPathName);
    const fileStructure = window.templit.filePathToArray(localPathName);
    displayTemplateStructure(
      fileStructure,
      localPathName
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
