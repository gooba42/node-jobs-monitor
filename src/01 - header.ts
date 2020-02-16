/******************************************************************************
 * Name: Node Jobs Monitor
 * Author: Kyle Turpin
 * License: GPL v3.0 or later
 * Description: Job sites don't provide RSS or other easy update mechanisms
 * we're going to scrape those websites and pipe notifications of the changes
 * and updates to a client subscribed by way of pushover or pushbullet (TBD)
 *****************************************************************************/

const sites: { [siteName: string]: string } = {
  "City Utilities":
    "https://careers.cityutilities.net/careersection/ex/joblist.ftl?lang=en"
};
