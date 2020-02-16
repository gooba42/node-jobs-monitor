const siteLoop = async () => {
  for (let item in sites) {
    let myTitle: string = item;
    let myURL: string = sites[item].toString();
    let newChecksum: string;
    newChecksum = await getPageSum(myURL);

    console.log(`Checksum,${item} coming up!\n`);
    console.log(`Existing checksum is ${jsonObj[item]}`);
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
