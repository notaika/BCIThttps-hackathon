import { app } from "./main.js";
const path = require("path");
const fs = require("fs");

const template_filepath = path.join(app.getPath("userData"), "templates.json");
let templates = [];

/* Read in all templates from file. Should be called
 * upon startup */
function readTemplates() {}

/* Instance the selected template at the specified location */
function buildTemplate(template, filepath) {}

/* LOW PRIORITY BELOW */

/* Save entire templates array back to template file. Should
 * be called whenever a template is created by the user */
function saveTemplates() {}

/* Read the file structure at filepath and load it into templates, 
   then call saveTemplates() */
function createNewTemplate(filepath) {}
