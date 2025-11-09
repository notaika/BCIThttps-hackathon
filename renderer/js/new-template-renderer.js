document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("template-location-btn")
    .addEventListener("click", getTemplatePathToCopy);
  document
    .getElementById("save-template-btn")
    .addEventListener("click", saveTemplate);
});

async function getTemplatePathToCopy() {
  try {
    let dialogObj = await window.functions.getTemplatePathToCopy();
    let localPathName = dialogObj.filePaths[0];
    window.functions.sendCopyTemplateFilePath(localPathName);
  } catch (err) {
    console.log(err);
  }
}

function saveTemplate() {
  const templateSourcePath = document.getElementById("template-location").value;
  window.templit.saveTemplate(templateSourcePath);
}

