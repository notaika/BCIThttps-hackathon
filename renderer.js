import { displayTemplateStructure } from "./renderer/js/treeRendering.js";

const templateDatalist = document.getElementById("template-list");
const copyButton = document.getElementById("copy-template-btn");
const destinationPathInput = document.getElementById("destination-path");
const templateInput = document.getElementById("template-select");
const instanceNameInput = document.getElementById("template-instance-name");
const instanceNamePreview = document.getElementById("preview-name");
const createTemplateBtn = document.getElementById("create-template-btn");
const deleteTemplateBtn = document.getElementById("delete-template-btn");

document.addEventListener("DOMContentLoaded", (event) => {
  populateTemplateList();
  copyButton.addEventListener("click", copyTemplate);
  document
    .getElementById("select-destination-btn")
    .addEventListener("click", filePathBtn);
  createTemplateBtn.addEventListener("click", (e) => {
    window.templit.openTemplateWindow();
  });
  templateInput.addEventListener("change", updateTreePreview);
  instanceNameInput.addEventListener("change", updatePreviewName);
  deleteTemplateBtn.addEventListener("click", deleteTemplate);
});

async function populateTemplateList() {
  const templates = await window.templit.templates();
  for (const template in templates) {
    let templateOption = new Option(template, template);
    templateDatalist.appendChild(templateOption);
  }
}

function copyTemplate() {
  let parentFileName = instanceNameInput.value;
  window.templit.buildTemplate(
    templateInput.value.trim(),
    destinationPathInput.value.trim(),
    parentFileName,
  );
}

async function filePathBtn() {
  let dialogObj = await window.functions.getFilePath();
  let localPathName = dialogObj.filePaths[0];
  destinationPathInput.setAttribute("value", localPathName);
  document.getElementById("template-destination").innerText = localPathName;
}

async function updateTreePreview(event) {
  const templates = await window.templit.templates();
  const template = templates[this.value];
  const templatePreview = document.getElementById("template-preview");
  if (instanceNamePreview.innerText === "") {
    instanceNamePreview.innerText = templateInput.value;
  }
  document.getElementById("preview-log").removeAttribute("hidden");
  if (template) {
    displayTemplateStructure(template, templatePreview);
  }
}

function updatePreviewName(event) {
  if (this.value) {
    instanceNamePreview.innerText = this.value;
  } else {
    instanceNamePreview.innerText = templateInput.value;
  }
}

function deleteTemplate() {
  console.log("template input: " + templateInput);
  window.templit.deleteTemplate(templateInput.value);
}
