var admin = require("firebase-admin");
const lol = require("./lolscrapper.js");

var serviceAccount = require("./cred/firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://loltracker-f22c6-default-rtdb.europe-west1.firebasedatabase.app",
});

var db = admin.database();
var ref = db.ref("/");

async function check_channel_set(guild_id)
{
  var guild_ref = ref.child(guild_id);
  var guild_data = await guild_ref.once("value");
  if (guild_data.val() === null)
    return false;
  if (guild_data.val().channelId === 0)
    return false;
  return true;
}

async function set_channel(guild_id, channel_id)
{
  var guild_ref = ref.child(guild_id);
  var guild_data = await guild_ref.once("value");
  if (guild_data.val() === null)
    ref.set({[guild_id]: {channelId: channel_id}});
  else
    guild_ref.update({channelId: channel_id});
}

async function remove_user(guild_id, summoner_name)
{
  var guild_ref = ref.child(guild_id);
  var guild_data = await guild_ref.once("value");
  if (guild_data.val() === null)
    return;
  var users_ref = guild_ref.child('users');
  summoner_ref = users_ref.child(summoner_name);
  summoner_data = await summoner_ref.once("value");
  if (summoner_data.val() === null)
    return;
  summoner_ref.remove();
}

async function user_exist(guild_id, summoner_name)
{
  var guild_ref = ref.child(guild_id);
  var users_ref = guild_ref.child('users');
  var summoner_ref = users_ref.child(summoner_name);
  var summoner_data = await summoner_ref.once("value");
  if (summoner_data.val() === null)
    return false;
  else
    return true;
}

async function add_user(guild_id, stats)
{
  var guild_ref = ref.child(guild_id);
  var users_ref = guild_ref.child('users');
  var summoner_ref = users_ref.child(stats.summonerName);
  var summoner_data = await summoner_ref.once("value");
  if (summoner_data.val() === null) {
    stats.hotStreak ? summoner_ref.child("hotStreak").set(stats.hotStreak) : summoner_ref.child("hotStreak").set(false);
    summoner_ref.child("rank").set(stats.tier + " " + stats.rank);
    summoner_ref.child("leaguePoints").set(stats.leaguePoints);
    summoner_ref.child("wins").set(stats.wins);
    summoner_ref.child("losses").set(stats.losses);
    summoner_ref.child("winrate").set(stats.winrate);
  }
}

async function check_max_users(guild_id)
{
  var guild_ref = ref.child(guild_id);
  var guild_data = await guild_ref.once("value");
  if (guild_data.val() === null)
    return;
  var users_ref = guild_ref.child('users');
  var users_data = await users_ref.once("value");
  if (users_data.val() === null)
    return;
  let users = users_data.val();
  let count = 0;
  for (key in users) {
    count++;
  }
  if (count >= 10)
    return true;
  else
    return false;
}

async function get_leaderboard(guild_id)
{
  var guild_ref = ref.child(guild_id);
  var guild_data = await guild_ref.once("value");
  if (guild_data.val() === null)
    return;
  return guild_data.val();
}

module.exports = { check_channel_set, user_exist, set_channel, add_user, check_max_users, remove_user, get_leaderboard };