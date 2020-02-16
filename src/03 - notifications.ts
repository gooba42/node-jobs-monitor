// All the details of setting up and sending a notification
// through pushover are included here
const Push = require("pushover-notifications");
const secretsFN = "./data/secrets.json";
let secretsObj: any;

function notify(myURL: string, myTitle: string) {
  //Consult the "secrets" file in our data subdir and
  //if we don't find it, create an empty one

  try {
    //Import the existing JSON if it exists...
    secretsObj = require(secretsFN);
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
    //Build the message to be sent through our push object
    message: `Changes Detected on ${myTitle}`,
    title: "Job Site Update",
    sound: "cashregister",
    url: myURL,
    url_title: myTitle
  };

  //Send the message we've built from the provided details
  myPush.send(msg, function(err: any, result: any) {
    if (err) {
      throw err;
    }
    console.log(result);
  });
}
