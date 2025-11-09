export {
  readTemplates,
  createNewTemplate,
  buildTemplate,
  templates,
  filePathToArray,
};
import { app } from "../../main.js";
import path from "node:path";
import * as fs from "node:fs";
const template_filepath = path.join(app.getPath("userData"), "templates.json");
const default_template_json = {
  COMP1537: [
    {
      name: "app",
      type: "folder",
      content: [
        {
          name: "data",
          type: "folder",
          content: [],
        },
        {
          name: "html",
          type: "folder",
          content: [
            {
              name: "index.html",
              type: "file",
            },
          ],
        },
      ],
    },
    {
      name: "public",
      type: "folder",
      content: [
        {
          name: "js",
          type: "folder",
          content: [],
        },
        {
          name: "css",
          type: "folder",
          content: [
            {
              name: "style.css",
              type: "file",
            },
          ],
        },
        {
          name: "img",
          type: "folder",
          content: [],
        },
      ],
    },
    {
      name: "index.js",
      type: "file",
    },
  ],
  COMP1800: [
    {
      name: "public",
      type: "folder",
      content: [
        {
          name: "images",
          type: "folder",
          content: [],
        },
      ],
    },
    {
      name: "src",
      type: "folder",
      content: [],
    },
  ],
};

let templates = {};

/* Read in all templates from file. Should be called
 * upon startup */
function readTemplates() {
  let template_doc;
  try {
    template_doc = fs.readFileSync(template_filepath);
    templates = JSON.parse(template_doc);
  } catch (err) {
    if (err.code === "ENOENT") {
      template_doc = fs.writeFile(
        template_filepath,
        JSON.stringify(default_template_json),
        (err) => {
          if (err) throw err;
          readTemplates();
        },
      );
    } else {
      throw err;
    }
  }
}

/* Instance the selected template (arg is just
 * template name) at the specified location */
function buildTemplate(template, filepath) {
  const tempItems = templates[template];
  const buildPath = path.join(filepath, template);

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
        fs.write(fd, atob(fsItem.content), (err) => {
          if (err) throw err;
        });
      });
    } else if (fsItem.type === "folder") {
      fs.mkdirSync(itemPath, { recursive: true });
      buildTempItemArray(fsItem.content, itemPath);
    }
  }
}

/* Save entire templates array back to template file. Should
 * be called whenever a template is created by the user */
function saveTemplates() {
  fs.writeFile(template_filepath, JSON.stringify(templates), (err) => {
    if (err) throw err;
  });
}

/* Read the file structure at filepath and load it into templates, 
   then call saveTemplates() */
function createNewTemplate(filepath, templateName) {
  let templateArray = [];
  fs.opendir(filepath, async (err, dir) => {
    const asyncTemplateCreationFunction = templateEntriesFromDir(templateArray);
    await asyncTemplateCreationFunction(err, dir);
    templates[templateName] = templateArray;
    saveTemplates();
  });
}

/* Converts a file path to a JSON template structure */
async function filePathToArray(filepath) {
  let templateArray = [];
  const dir = fs.opendirSync(filepath);
  const asyncTemplateCreationFunction = templateEntriesFromDir(templateArray);
  await asyncTemplateCreationFunction(null, dir);
  return templateArray;
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
        const fileContent = fs.readFileSync(
          path.join(dirEntry.parentPath, dirEntry.name),
        );
        templateEntry.content = btoa(fileContent.toString());
      } else if (dirEntry.isDirectory()) {
        if (dirEntry.name == "node_modules") {
          throw new Error(
            "You left node_modules in your template source folder. I refuse to make that a template.",
          );
        }
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
