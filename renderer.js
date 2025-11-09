const templateDatalist = document.getElementById("template-list");
const copyButton = document.getElementById("copy-template-btn");
const destinationPathInput = document.getElementById("destination-path");
const templateInput = document.getElementById("template-select");
const createTemplateBtn = document.getElementById("create-template-btn");
const deleteTemplateBtn = document.getElementById("delete-template-btn");

document.addEventListener("DOMContentLoaded", (event) => {
  populateTemplateList();
  copyButton.addEventListener("click", copyTemplate);
  document.getElementById("select-destination-btn").addEventListener("click", filePathBtn);
  createTemplateBtn.addEventListener("click", (e) => {
    window.templit.openTemplateWindow();
  });
  deleteTemplateBtn.addEventListener("click", deleteTemplate)
});

async function populateTemplateList() {
  const templates = await window.templit.templates();
  for (const template in templates) {
    let templateOption = new Option(template, template);
    templateDatalist.appendChild(templateOption);
  }
}

function copyTemplate() {
  let parentFileName = document.getElementById("template-instance-name").value;
  window.templit.buildTemplate(templateInput.value.trim(), destinationPathInput.value.trim(), parentFileName);
}

async function filePathBtn() {
  let dialogObj = await window.functions.getFilePath();
  let localPathName = dialogObj.filePaths[0];
  destinationPathInput.setAttribute("value", localPathName);
  document.getElementById("template-destination").innerText = localPathName;
}

function deleteTemplate() {
  console.log("template input: " + templateInput);
  window.templit.deleteTemplate(templateInput.value);
}