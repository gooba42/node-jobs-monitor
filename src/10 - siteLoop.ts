//Loop over our list of sites and retrieve checksums of the body contents to be
//compared against the ones stashed in the data file

const siteLoop = async () => {
  for (let item in sites) {
    let myTitle: string = item;
    let myURL: string = sites[item].toString();
    let newChecksum: string;

    newChecksum = await getPageSum(myURL);

    console.log(`Checksum,${item} coming up!\n`);
    console.log(`Existing checksum is ${jsonObj[item]}`);
    console.log(`New checksum is ${newChecksum}`);
    //If our existing checksum doesn't match the new one,
    //we send a notification
    if (jsonObj[item] != newChecksum) {
      jsonObj[item] = newChecksum;
      saveInfo(jsonObj, jsonFN);
      console.log(`${item} checksum updated!`);
      notify(myURL, myTitle);
    } else {
      console.log(`${item} checksum didn't change!!!`);
    }
  }
};

siteLoop();
