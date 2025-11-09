document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("addTemplateFolderBtn").addEventListener("click", getTemplatePathToCopy);
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