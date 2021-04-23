let Parser = require('rss-parser');
let parser = new Parser();


function sleep(miliseconds) {
  var currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {
  }
}


function Update () {
  (async () => {
    let feed = await parser.parseURL('https://www.reddit.com/.rss');
    var latest_update = feed.items[0].title;
    var latest_update_link = feed.items[0].link;
    console.log(latest_update, latest_update_link)

    var loop = true;
    while (loop) {
      feed = await parser.parseURL('https://www.reddit.com/.rss');
      if (feed.items[0].title === latest_update) {
        sleep(60*120);
        return feed.items[0].title, feed.items[0].link;
      } else {
          loop = false;
          console.log('success');
          console.log(feed.items[0].title, feed.items[0].link);
      }
    }
  })();
}


async function AllUpdates () {
  feed = await parser.parseURL('https://hypixel.net/forums/skyblock-patch-notes.158/index.rss');
  let update_items = [];
  feed.items.forEach(item => {
    // console.log(item.title)
    update_items.push(item.link)
  })
  update_items.length = 10;
  return update_items
}


async function LatestUpdate () {
  feed = await parser.parseURL('https://hypixel.net/forums/skyblock-patch-notes.158/index.rss')
  return feed.items[0].title, feed.items[0].link;

};


module.exports.AllUpdates = AllUpdates;
module.exports.LatestUpdate = LatestUpdate;
module.exports.Update = Update;