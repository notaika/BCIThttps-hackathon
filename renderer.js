const templateDatalist = document.getElementById("template-list");
const copyButton = document.getElementById("copy-template-btn");
const destinationPathInput = document.getElementById("destination-path");
const templateInput = document.getElementById("template-select");

document.addEventListener("DOMContentLoaded", (event) => {
  populateTemplateList();
  copyButton.addEventListener("click", copyTemplate);
  document
    .getElementById("select-destination-btn")
    .addEventListener("click", filePathBtn);
});

async function populateTemplateList() {
  const templates = await window.templit.templates();
  for (const template in templates) {
    let templateOption = new Option(template, template);
    templateDatalist.appendChild(templateOption);
  }
}

function copyTemplate() {
  window.templit.buildTemplate(
    templateInput.value.trim(),
    destinationPathInput.value.trim(),
  );
}

async function filePathBtn() {
  let dialogObj = await window.functions.getFilePath();
  let localPathName = dialogObj.filePaths[0];
  destinationPathInput.setAttribute("value", localPathName);
}
