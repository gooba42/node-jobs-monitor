const Push = require("pushover-notifications");
const secretsFN = "./data/secrets.json";
let secretsObj: any;

function notify(myURL: string, myTitle: string) {
  try {
    //Import the existing JSON if it exists...
    secretsObj = require(secretsFN);
    console.log(secretsObj);
  } catch (error) {
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
    user: secretsObj["group"],
    token: secretsObj["token"]
  });

  let msg = {
    message: `Changes Detected on ${myTitle}`,
    title: "Job Site Update",
    sound: "cashregister",
    url: myURL,
    url_title: myTitle
  };

  myPush.send(msg, function(err: any, result: any) {
    if (err) {
      throw err;
    }
    console.log(result);
  });
}
