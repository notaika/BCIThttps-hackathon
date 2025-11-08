import { app } from "./main.js";
import path from "node:path";
import * as fs from "node:fs";
import { open, close } from "node:fs";
export { readTemplates };

const template_filepath = path.join(app.getPath("userData"), "templates.json");
let templates = [];

/* Read in all templates from file. Should be called
 * upon startup */
var index = 0;
function readTemplates() {
  var template_doc;
  try {
    template_doc = fs.readFileSync(template_filepath);
    const data = JSON.parse(template_doc);
    for (let i = 1; i < Object.keys(data).length + 1; i++) {
      index = 0;
      let template = data["template" + i];
      let sub = template[index];
      /* No more sub content arrays */
      if (typeof sub == "undefined") {
        findChildDoc(template);
      } else {
        findChildDoc(sub);
      }

      // if (typeof sub == "undefined") ? findChildDoc(template) : findChildDoc(sub);
    }
  } catch (err) {
    console.log(err);
  }
}
/* Recursively searches for subfolders. */
/* Only takes JSON objects. Anything else, and it breaks. */
function findChildDoc(data) {
  index++;
  for (let i = 0; i < Object.keys(data).length; i++) {
    if (Object.getOwnPropertyNames(data).includes("content")) {
      findChildDoc(data["content"]);
    } else {
      console.log(i);
    }
  }
}

/* Instance the selected template at the specified location */
function buildTemplate(template, filepath) {}

/* LOW PRIORITY BELOW */

/* Save entire templates array back to template file. Should
 * be called whenever a template is created by the user */
function saveTemplates() {}

/* Read the file structure at filepath and load it into templates, 
   then call saveTemplates() */
function createNewTemplate(filepath) {}
