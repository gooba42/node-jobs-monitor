"use strict";
/******************************************************************************
 * Name: Node Jobs Monitor
 * Author: Kyle Turpin
 * License: GPL v3.0 or later
 * Description: Job sites don't provide RSS or other easy update mechanisms
 * we're going to scrape those websites and pipe notifications of the changes
 * and updates to a client subscribed by way of pushover or pushbullet (TBD)
 *****************************************************************************/
const sites = {
    "City Utilities": "https://careers.cityutilities.net/careersection/ex/joblist.ftl?lang=en"
};
const fs = require("fs");
const jsonFN = "./data/checksums.json";
let jsonObj;
try {
    //Import the existing JSON if it exists...
    jsonObj = require(jsonFN);
    console.log(jsonObj);
}
catch (error) {
    //Otherwise fall back on creating an empty one
    jsonObj = {};
    saveInfo(jsonObj, jsonFN);
}
function saveInfo(myObj, filename) {
    fs.writeFile(filename, JSON.stringify(myObj), "UTF8", function (err) {
        if (err) {
            console.log("An error occured while writing JSON to file.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });
}
const Push = require("pushover-notifications");
const secretsFN = "./data/secrets.json";
let secretsObj;
function notify(myURL, myTitle) {
    try {
        //Import the existing JSON if it exists...
        secretsObj = require(secretsFN);
        console.log(secretsObj);
    }
    catch (error) {
        //Otherwise fall back on creating an empty one
        secretsObj = {
            token: "",
            user: "",
            group: ""
        };
        saveInfo(secretsObj, secretsFN);
    }
    let myPush = new Push({
        /* user token delivers to a single subscriber,
        group token delivers to the whole list */
        user: secretsObj["user"],
        token: secretsObj["token"]
    });
    let msg = {
        message: `Changes Detected on ${myTitle}`,
        title: "Job Site Update",
        sound: "cashregister",
        url: myURL,
        url_title: myTitle
    };
    myPush.send(msg, function (err, result) {
        if (err) {
            throw err;
        }
        console.log(result);
    });
}
const puppeteer = require("puppeteer");
const checksum = require("checksum");
const getPageSum = async (myURL) => {
    let myPageContent = "";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(myURL);
    myPageContent = await page.content();
    await browser.close();
    return checksum(myPageContent);
};
const siteLoop = async () => {
    for (let item in sites) {
        let myTitle = item;
        let myURL = sites[item].toString();
        let newChecksum;
        newChecksum = await getPageSum(myURL);
        console.log(`Checksum,${item} coming up!\n`);
        console.log(`Existing checksum is ${jsonObj[item]}`);
        if (jsonObj[item] != newChecksum) {
            jsonObj[item] = newChecksum;
            saveInfo(jsonObj, jsonFN);
            console.log(`${item} checksum updated!`);
            notify(myURL, myTitle);
        }
        else {
            console.log(`${item} checksum didn't change!!!`);
        }
    }
};
siteLoop();
function bailout(strMessage) {
    //Spit out the exit message and handle any other shutdown related tasks.
    console.log(strMessage);
}
