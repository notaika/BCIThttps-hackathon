import { app } from "./main.js";
import path from "node:path";
import * as fs from "node:fs";

const template_filepath = path.join(app.getPath("userData"), "templates.json");
let templates = {};

/* Read in all templates from file. Should be called
 * upon startup */
function readTemplates() {}

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
      fs.mkdir(itemPath, (err) => {
        if (err && err.code !== "EEXIST") throw err;
        buildTempItemArray(fsItem.content, itemPath);
      });
    }
  }
}

/* LOW PRIORITY BELOW */

/* Save entire templates array back to template file. Should
 * be called whenever a template is created by the user */
function saveTemplates() {}

/* Read the file structure at filepath and load it into templates, 
   then call saveTemplates() */
function createNewTemplate(filepath) {}
