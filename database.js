var admin = require("firebase-admin");
const lol = require("./lolscrapper.js");

var serviceAccount = require("./cred/firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://loltracker-f22c6-default-rtdb.europe-west1.firebasedatabase.app",
});

async function check_channel_set(guild_id) {
  var db = admin.database();
  var ref = db.ref("/");
  var guild_ref = ref.child(guild_id);
  var guild_data = await guild_ref.once("value");
  if (guild_data.val() === null)
    return false;
  if (guild_data.val().channelId === 0)
    return false;
  return true;
}

async function set_channel(guild_id, channel_id) {
  var db = admin.database();
  var db = admin.database();
  var ref = db.ref("/");
  var guild_ref = ref.child(guild_id);
  var guild_data = await guild_ref.once("value");
  if (guild_data.val() === null)
    ref.set({[guild_id]: {channelId: channel_id}});
  else
    guild_ref.update({channelId: channel_id});
}

async function remove_user(guild_id, summoner_name) {
  var db = admin.database();
  var ref = db.ref("/");
  var guild_ref = ref.child(guild_id);
  var guild_data = await guild_ref.once("value");
  guild_ref.child(summoner_name).remove();
}

async function add_user(guild_id, summoner_name, region) {
  var db = admin.database();
  var ref = db.ref("/");
  var guild_ref = ref.child(guild_id);
  var guild_data = await guild_ref.once("value");
  guild_ref.set({[summoner_name]: {}});
  var summoner_ref = guild_ref.child(summoner_name);
  var stats = await lol.scrapper(region, summoner_name);
  summoner_ref.set({ [lp]: stats.leaguesPoints, [wr]: stats.winrate, [wins]: stats.wins, [losses]: stats.losses, [opgg]: stats.opgg, [hotStreak]: stats.hotStreak });
}

module.exports = { check_channel_set, set_channel, add_user, remove_user };