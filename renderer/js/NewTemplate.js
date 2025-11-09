document.addEventListener("DOMContentLoaded", () => {
  const templateTree = document.getElementById("templateTree");
  const addFolderBtn = document.getElementById("addFolderBtn");
  const addFileBtn = document.getElementById("addFileBtn");
  const addTemplateFolderBtn = document.getElementById("addTemplateFolderBtn");
  const deleteBtn = document.getElementById("deleteBtn");
  const saveTemplateBtn = document.getElementById("saveTemplateBtn");
  const fileContentArea = document.getElementById("fileContent");
  const manageVariablesBtn = document.getElementById("manageVariablesBtn");
  const includeEmpty = document.getElementById("includeEmpty");
  const enablePlaceholders = document.getElementById("enablePlaceholders");

  let selectedItem = null;
  let fileContents = {}; // Store content per file

  // --- Helper: Create Tree Item ---
  function createTreeItem(type, name = "") {
    const li = document.createElement("li");
    li.classList.add(type);
    li.dataset.type = type;

    const content = document.createElement("span");
    content.classList.add("tree-item-content");

    const icon = document.createElement("span");
    icon.classList.add("icon");
    icon.textContent = type === "folder" ? "📁" : "📄";

    const input = document.createElement("input");
    input.type = "text";
    input.value = name || (type === "folder" ? "New Folder" : "new_file.txt");
    input.readOnly = true;

    content.appendChild(icon);
    content.appendChild(input);
    li.appendChild(content);

    if (type === "folder") {
      const subTree = document.createElement("ul");
      subTree.classList.add("sub-tree");
      li.appendChild(subTree);
    }

    // Selection
    content.addEventListener("click", (e) => {
      e.stopPropagation();
      if (selectedItem)
        selectedItem
          .querySelector(".tree-item-content")
          .classList.remove("selected");
      selectedItem = li;
      content.classList.add("selected");

      if (type === "file") {
        const fileName = input.value;
        document.querySelector(
          ".file-content h3"
        ).textContent = `File Content (${fileName})`;
        fileContentArea.value = fileContents[fileName] || "";
      }
    });

    // Rename
    content.addEventListener("dblclick", () => {
      input.readOnly = false;
      input.focus();
    });

    input.addEventListener("blur", () => {
      input.readOnly = true;
      if (!input.value.trim()) {
        input.value = type === "folder" ? "New Folder" : "new_file.txt";
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") input.blur();
    });

    return li;
  }

  // --- Add Item ---
  function addItem(type) {
    let parentUL;

    if (selectedItem && selectedItem.dataset.type === "folder") {
      parentUL = selectedItem.querySelector(".sub-tree");
    } else {
      parentUL = templateTree.querySelector(".sub-tree");
    }

    const newItem = createTreeItem(type);
    parentUL.appendChild(newItem);

    if (selectedItem)
      selectedItem
        .querySelector(".tree-item-content")
        .classList.remove("selected");
    newItem.querySelector(".tree-item-content").classList.add("selected");
    selectedItem = newItem;

    const input = newItem.querySelector("input");
    input.readOnly = false;
    input.focus();

    if (type === "file") {
      const fileName = input.value;
      fileContents[fileName] = "";
      document.querySelector(
        ".file-content h3"
      ).textContent = `File Content (${fileName})`;
      fileContentArea.value = "";
    }
  }

  // --- Delete Item ---
  function deleteItem() {
    if (!selectedItem) return alert("Select a file or folder to delete.");
    const name = selectedItem.querySelector("input").value;
    if (name === "Template Root") return alert("Cannot delete root.");
    if (selectedItem.dataset.type === "file") {
      delete fileContents[name];
    }
    selectedItem.remove();
    selectedItem = null;
    fileContentArea.value = "";
    document.querySelector(".file-content h3").textContent = "File Content";
  }

  // --- Serialize Tree ---
  function serializeTree(ul) {
    const result = [];
    const items = ul.children;

    for (const li of items) {
      const type = li.dataset.type;
      const name = li.querySelector("input").value;
      const obj = { type, name };

      if (type === "folder") {
        const subTree = li.querySelector(".sub-tree");
        const children = serializeTree(subTree);
        if (includeEmpty.checked || children.length > 0) {
          obj.content = children;
          result.push(obj);
        }
      } else if (type === "file") {
        obj.content = fileContents[name] || "";
        result.push(obj);
      }
    }

    return result;
  }

  // --- Save Template ---
  function saveTemplate() {
    const templateName = document.getElementById("templateName").value.trim();
    if (!templateName) return alert("Please enter a template name.");

    const root = templateTree.querySelector(".sub-tree");
    const jsonStructure = serializeTree(root);

    const output = {
      name: templateName,
      placeholdersEnabled: enablePlaceholders.checked,
      structure: jsonStructure,
    };

    console.log("Template JSON:", JSON.stringify(output, null, 2));
    alert(`Template "${templateName}" saved! (Check console for JSON)`);
  }

  // --- Manage Variables (Placeholder Modal Stub) ---
  manageVariablesBtn.addEventListener("click", () => {
    alert(
      "Variable manager not implemented yet. You can add ⟪placeholders⟫ manually in file content."
    );
  });

  // --- Save File Content on Change ---
  fileContentArea.addEventListener("input", () => {
    if (selectedItem && selectedItem.dataset.type === "file") {
      const name = selectedItem.querySelector("input").value;
      fileContents[name] = fileContentArea.value;
    }
  });

  // --- Event Listeners ---
  addFolderBtn.addEventListener("click", () => addItem("folder"));
  addFileBtn.addEventListener("click", () => addItem("file"));
  addTemplateFolderBtn.addEventListener("click", () => {
    const newTemplate = createTreeItem("folder", "New Template");
    templateTree.appendChild(newTemplate);
  });
  deleteBtn.addEventListener("click", deleteItem);
  saveTemplateBtn.addEventListener("click", saveTemplate);
});
