const fs = require("fs");
const jsonFN = "./data/checksums.json";
let jsonObj: any;

try {
  //Import the existing JSON if it exists...
  jsonObj = require(jsonFN);
  console.log(jsonObj);
} catch (error) {
  //Otherwise fall back on creating an empty one
  jsonObj = {};
  saveInfo(jsonObj, jsonFN);
}

function saveInfo(myObj: object, filename: string) {
  fs.writeFile(filename, JSON.stringify(myObj), "UTF8", function(err: string) {
    if (err) {
      console.log("An error occured while writing JSON to file.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
}
