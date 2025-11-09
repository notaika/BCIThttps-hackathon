import { displayTemplateStructure } from "./treeRendering.js";
const templates = await window.templit.templates();

document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("template-location-btn")
    .addEventListener("click", getTemplatePathToCopy);
  document.getElementById("cancel-btn").addEventListener("click", closeWindow);
  document
    .getElementById("save-template-btn")
    .addEventListener("click", saveTemplate);
});

async function getTemplatePathToCopy() {
  try {
    let dialogObj = await window.functions.getTemplatePathToCopy();
    let localPathName = dialogObj.filePaths[0];
    const fileStructure = window.templit.filePathToArray(localPathName);
    displayTemplateStructure(
      fileStructure,
      document.getElementById("file-content"),
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
  window.templit.saveTemplate(templateSourcePath);
}
