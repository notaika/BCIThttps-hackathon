export { readTemplates, createNewTemplate, buildTemplate, templates };
import { app } from "./main.js";
import path from "node:path";
import * as fs from "node:fs";
const template_filepath = path.join(app.getPath("userData"), "templates.json");
let templates = {};

/* Read in all templates from file. Should be called
 * upon startup */
function readTemplates() {
  let template_doc;
  try {
    template_doc = fs.readFileSync(template_filepath);
    templates = JSON.parse(template_doc);
  } catch (err) {
    throw err;
  }
}

/* Instance the selected template (arg is just
 * template name) at the specified location */
function buildTemplate(template, filepath) {
  const tempItems = templates[template];
  const buildPath = path.join(filepath, template.concat(Date.now()));

  fs.mkdir(buildPath, { recursive: true }, (err) => {
    if (err && err.code !== "EEXIST") throw err;
  });

  buildTempItemArray(tempItems, buildPath);
}

/* Helper method for buildTemplate */
function buildTempItemArray(tempItems, filepath) {
  for (const fsItem of tempItems) {
    const itemPath = path.join(filepath, fsItem.name);
    if (fsItem.type === "file") {
      fs.open(itemPath, "wx", (err, fd) => {
        if (err && err.code !== "EEXIST") throw err;
      });
    }
    if (fsItem.type === "folder") {
      fs.mkdir(itemPath, { recursive: true }, (err) => {
        if (err && err.code !== "EEXIST") throw err;
        buildTempItemArray(fsItem.content, itemPath);
      });
    }
  }
}

/* LOW PRIORITY BELOW */

/* Save entire templates array back to template file. Should
 * be called whenever a template is created by the user */
function saveTemplates() {
  fs.writeFile(template_filepath, JSON.stringify(templates), (err) => {
    if (err) throw err;
  });
}

/* Read the file structure at filepath and load it into templates, 
   then call saveTemplates() */
function createNewTemplate(filepath) {
  const templateName = path.basename(filepath);
  let templateArray = [];
  fs.opendir(filepath, async (err, dir) => {
    const asyncTemplateCreationFunction = templateEntriesFromDir(templateArray);
    await asyncTemplateCreationFunction(err, dir);
    templates[templateName] = templateArray;
    saveTemplates();
  });
}

/* Recursive callback nonsense for creating templates */
function templateEntriesFromDir(templateEntryArray) {
  return async (err, dir) => {
    if (err) throw err;
    for await (const dirEntry of dir) {
      let templateEntry = {};

      if (dirEntry.isFile()) {
        templateEntry.type = "file";
        templateEntry.name = dirEntry.name;
      } else if (dirEntry.isDirectory()) {
        const dirEntryPath = path.join(dirEntry.parentPath, dirEntry.name);
        templateEntry.type = "folder";
        templateEntry.name = dirEntry.name;
        templateEntry.content = [];
        fs.opendir(dirEntryPath, templateEntriesFromDir(templateEntry.content));
      } else {
        throw new Error(
          "Can't create template out of non-file, non-folder entry. What nonsene are you trying?",
        );
      }
      templateEntryArray.push(templateEntry);
    }
  };
}
