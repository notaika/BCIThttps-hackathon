const templateDatalist = document.getElementById("template-list");

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("hi");
  populateTemplateList();
});

async function populateTemplateList() {
  console.log("hi");
  const templates = await window.templit.templates();
  for (const template in templates) {
    console.log(template);
    let templateOption = new Option(template, template);
    templateDatalist.appendChild(templateOption);
  }
}
