export {
  readTemplates,
  createNewTemplate,
  buildTemplate,
  templates,
  filePathToArray,
  deleteTemplate,
};
import { app } from "../../main.js";
import path from "node:path";
import * as fs from "node:fs";
const template_filepath = path.join(app.getPath("userData"), "templates.json");
const default_template_json = {
  COMP1537: [
    {
      type: "folder",
      name: "app",
      content: [
        { type: "folder", name: "data", content: [] },
        { type: "folder", name: "html", content: [] },
      ],
    },
    {
      type: "folder",
      name: "public",
      content: [
        { type: "folder", name: "js", content: [] },
        { type: "folder", name: "css", content: [] },
        { type: "folder", name: "img", content: [] },
      ],
    },
    {
      type: "file",
      name: "index.js",
      content:
        "Ly8gaHR0cHM6Ly9leHByZXNzanMuY29tL2VuL2d1aWRlL3JvdXRpbmcuaHRtbA0KDQoNCi8vIFJFUVVJUkVTDQpjb25zdCBleHByZXNzID0gcmVxdWlyZSgiZXhwcmVzcyIpOw0KY29uc3QgYXBwID0gZXhwcmVzcygpOw0KYXBwLnVzZShleHByZXNzLmpzb24oKSk7DQpjb25zdCBmcyA9IHJlcXVpcmUoImZzIik7DQoNCi8vIGp1c3QgbGlrZSBhIHNpbXBsZSB3ZWIgc2VydmVyIGxpa2UgQXBhY2hlIHdlYiBzZXJ2ZXINCi8vIHdlIGFyZSBtYXBwaW5nIGZpbGUgc3lzdGVtIHBhdGhzIHRvIHRoZSBhcHAncyB2aXJ0dWFsIHBhdGhzDQphcHAudXNlKCIvanMiLCBleHByZXNzLnN0YXRpYygiLi9wdWJsaWMvanMiKSk7DQphcHAudXNlKCIvY3NzIiwgZXhwcmVzcy5zdGF0aWMoIi4vcHVibGljL2NzcyIpKTsNCmFwcC51c2UoIi9pbWciLCBleHByZXNzLnN0YXRpYygiLi9wdWJsaWMvaW1nIikpOw0KDQphcHAuZ2V0KCIvIiwgZnVuY3Rpb24gKHJlcSwgcmVzKSB7DQogICAgLy9jb25zb2xlLmxvZyhwcm9jZXNzLmVudik7DQogICAgLy8gcmV0cmlldmUgYW5kIHNlbmQgYW4gSFRNTCBkb2N1bWVudCBmcm9tIHRoZSBmaWxlIHN5c3RlbQ0KICAgIGxldCBkb2MgPSBmcy5yZWFkRmlsZVN5bmMoIi4vYXBwL2h0bWwvaW5kZXguaHRtbCIsICJ1dGY4Iik7DQogICAgcmVzLnNlbmQoZG9jKTsNCn0pOw0KDQphcHAuZ2V0KCIvaGVsbG8iLCBmdW5jdGlvbiAocmVxLCByZXMpIHsNCiAgICAvLyBqdXN0IHNlbmQgc29tZSBwbGFpbiB0ZXh0DQogICAgcmVzLnNlbmQoIkhlbGxvIHdvcmxkISIpOw0KfSk7DQoNCmFwcC5nZXQoIi9oZWxsb0hUTUwiLCBmdW5jdGlvbiAocmVxLCByZXMpIHsNCiAgICAvLyBoYXJkLWNvZGVkIEhUTUwNCiAgICByZXMuc2VuZCgiPGh0bWw+PGhlYWQ+PHRpdGxlPkhpITwvdGl0bGU+PC9oZWFkPjxib2R5PjxwPkhlbGxvITwvcD48L2JvZHk+PC9odG1sPiIpOw0KfSk7DQoNCmFwcC5nZXQoIi9wcm9maWxlIiwgZnVuY3Rpb24gKHJlcSwgcmVzKSB7DQoNCiAgICBsZXQgZG9jID0gZnMucmVhZEZpbGVTeW5jKCIuL2FwcC9odG1sL3Byb2ZpbGUuaHRtbCIsICJ1dGY4Iik7DQoNCiAgICAvLyBqdXN0IHNlbmQgdGhlIHRleHQgc3RyZWFtDQogICAgcmVzLnNlbmQoZG9jKTsNCg0KfSk7DQoNCmFwcC5nZXQoIi9zY2hlZHVsZSIsIGZ1bmN0aW9uIChyZXEsIHJlcykgew0KDQogICAgbGV0IGRvYyA9IGZzLnJlYWRGaWxlU3luYygiLi9hcHAvZGF0YS9jc3RzY2hlZHVsZS54bWwiLCAidXRmOCIpOw0KDQogICAgLy8ganVzdCBzZW5kIHRoZSB0ZXh0IHN0cmVhbQ0KICAgIHJlcy5zZW5kKGRvYyk7DQoNCn0pOw0KDQphcHAuZ2V0KCIvbGlzdHMiLCBmdW5jdGlvbiAocmVxLCByZXMpIHsNCg0KICAgIGxldCBkb2MgPSBmcy5yZWFkRmlsZVN5bmMoIi4vYXBwL2RhdGEvbGlzdHMuanMiLCAidXRmOCIpOw0KDQogICAgLy8ganVzdCBzZW5kIHRoZSB0ZXh0IHN0cmVhbQ0KICAgIHJlcy5zZW5kKGRvYyk7DQoNCn0pOw0KDQphcHAuZ2V0KCIvZGF0ZSIsIGZ1bmN0aW9uIChyZXEsIHJlcykgew0KDQogICAgLy8gc2V0IHRoZSB0eXBlIG9mIHJlc3BvbnNlOg0KICAgIHJlcy5zZXRIZWFkZXIoIkNvbnRlbnQtVHlwZSIsICJhcHBsaWNhdGlvbi9qc29uIik7DQogICAgbGV0IG9wdGlvbnMgPSB7IHdlZWtkYXk6ICJsb25nIiwgeWVhcjogIm51bWVyaWMiLCBtb250aDogImxvbmciLCBkYXk6ICJudW1lcmljIiB9Ow0KICAgIGxldCBkID0gbmV3IERhdGUoKTsNCg0KICAgIHJlcy5zZW5kKHsgY3VycmVudFRpbWU6IGQudG9Mb2NhbGVEYXRlU3RyaW5nKCJlbi1VUyIsIG9wdGlvbnMpIH0pOw0KDQp9KTsNCg0KLy8gZm9yIHJlc291cmNlIG5vdCBmb3VuZCAoaS5lLiwgNDA0KQ0KYXBwLnVzZShmdW5jdGlvbiAocmVxLCByZXMsIG5leHQpIHsNCiAgICAvLyB0aGlzIGNvdWxkIGJlIGEgc2VwYXJhdGUgZmlsZSB0b28gLSBidXQgeW91J2QgaGF2ZSB0byBtYWtlIHN1cmUgdGhhdCB5b3UgaGF2ZSB0aGUgcGF0aA0KICAgIC8vIGNvcnJlY3QsIG90aGVyZXdpc2UsIHlvdSdkIGdldCBhIDQwNCBvbiB0aGUgNDA0IChhY3R1YWxseSBhIDUwMCBvbiB0aGUgNDA0KQ0KICAgIHJlcy5zdGF0dXMoNDA0KS5zZW5kKCI8aHRtbD48aGVhZD48dGl0bGU+UGFnZSBub3QgZm91bmQhPC90aXRsZT48L2hlYWQ+PGJvZHk+PHA+Tm90aGluZyBoZXJlLjwvcD48L2JvZHk+PC9odG1sPiIpOw0KfSk7DQoNCi8vIFJVTiBTRVJWRVINCmxldCBwb3J0ID0gODAwMDsNCmFwcC5saXN0ZW4ocG9ydCwgZnVuY3Rpb24gKCkgew0KICAgIGNvbnNvbGUubG9nKCJFeGFtcGxlIGFwcCBsaXN0ZW5pbmcgb24gcG9ydCAiICsgcG9ydCArICIhIik7DQp9KTsNCg==",
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
          readTemplates();
        }
      );
    }
  }
}

/* Instance the selected template (arg is just
 * template name) at the specified location */
function buildTemplate(template, filepath, topFolderName) {
  const tempItems = templates[template];
  const buildPath = path.join(filepath, topFolderName);

  fs.mkdir(buildPath, { recursive: true }, (err) => {});

  buildTempItemArray(tempItems, buildPath);
}

/* Helper method for buildTemplate */
function buildTempItemArray(tempItems, filepath) {
  for (const fsItem of tempItems) {
    const itemPath = path.join(filepath, fsItem.name);
    if (fsItem.type === "file") {
      fs.open(itemPath, "wx", (err, fd) => {
        fs.write(fd, atob(fsItem.content), (err) => {});
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
  fs.writeFile(template_filepath, JSON.stringify(templates), (err) => {});
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
    for await (const dirEntry of dir) {
      let templateEntry = {};

      if (dirEntry.isFile()) {
        templateEntry.type = "file";
        templateEntry.name = dirEntry.name;
        const fileContent = fs.readFileSync(
          path.join(dirEntry.parentPath, dirEntry.name)
        );
        templateEntry.content = btoa(fileContent.toString());
      } else if (dirEntry.isDirectory()) {
        if (dirEntry.name == "node_modules") {
          throw new Error(
            "You left node_modules in your template source folder. I refuse to make that a template."
          );
        }
        const dirEntryPath = path.join(dirEntry.parentPath, dirEntry.name);
        templateEntry.type = "folder";
        templateEntry.name = dirEntry.name;
        templateEntry.content = [];
        fs.opendir(dirEntryPath, templateEntriesFromDir(templateEntry.content));
      } else {
        throw new Error(
          "Can't create template out of non-file, non-folder entry. What nonsene are you trying?"
        );
      }
      templateEntryArray.push(templateEntry);
    }
  };
}

/* Delete template from templates object. */
function deleteTemplate(templateName) {
  if (templateName in templates) {
    delete templates[templateName];
    saveTemplates();
  }
}
