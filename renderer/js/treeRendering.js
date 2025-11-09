export { displayTemplateStructure };

function displayTemplateStructure(template, element) {
  const tree = generateTree(template);
  element.innerText = tree;
}

function generateTree(templateItems, prefix = "") {
  let tree = "";
  for (const [i, tempItem] of templateItems.entries()) {
    const isLast = i == templateItems.length - 1;
    const connector = isLast ? "└──" : "├──";

    tree += `${prefix}${connector}${tempItem.name}\n`;

    if (
      tempItem.type === "folder" &&
      tempItem.content &&
      tempItem.content.length > 0
    ) {
      const nextPrefix = prefix + (isLast ? "   " : "|  ");
      tree += generateTree(tempItem.content, nextPrefix);
    }
  }
  return tree;
}
