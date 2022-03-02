const mongoose = require('mongoose');

const clientOptions = {
    useNewUrlParser   : true,
    dbName            : 'loltracker'
};
mongoose.connect(process.env.MONGO_URL, clientOptions);
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;

async function check_same_channel(guild_id, channel_id)
{
  var mongo_ref = conn.db.collection('loltracker');
  var guild_data = await mongo_ref.findOne({guild_id: guild_id});
  if (guild_data === null)
    return false;
  if (guild_data.channel_id === channel_id)
    return true;
  return false;
}

async function check_channel_set(guild_id)
{
  var mongo_ref = conn.db.collection('loltracker');
  var guild_data = await mongo_ref.findOne({guild_id: guild_id});
  if (guild_data === null)
    return false;
  return true
}

async function set_channel(guild_id, channel_id)
{
  var mongo_ref = conn.db.collection('loltracker');
  var guild_data = await mongo_ref.findOne({guild_id: guild_id});
  if (guild_data === null) {
    var new_guild = {
      guild_id: guild_id,
      channel_id: channel_id
    };
    await mongo_ref.insertOne(new_guild);
  }
  else
    await mongo_ref.updateOne({guild_id: guild_id}, {$set: {channel_id: channel_id}});
}

async function remove_user(guild_id, summoner_name)
{
  var mongo_ref = conn.db.collection('loltracker');
  var guild_data = await mongo_ref.findOne({guild_id: guild_id});
  if (guild_data === null)
    return;
  await mongo_ref.updateOne({guild_id: guild_id}, {$unset: {["users." + summoner_name]: ""}});
}

async function user_exist(guild_id, summoner_name)
{
  var mongo_ref = conn.db.collection('loltracker');
  var guild_data = await mongo_ref.findOne({guild_id: guild_id});
  if (guild_data === null)
    return false;
  if (!guild_data.users)
    return false;
  if (!(summoner_name in guild_data.users))
    return false;
  return true;
}

async function add_user(guild_id, stats)
{
  var mongo_ref = conn.db.collection('loltracker');
  var guild_data = await mongo_ref.findOne({guild_id: guild_id});
  let formatted_stats = {
    hotStreak: stats.hotStreak,
    leaguePoints: stats.leaguePoints,
    losses: stats.losses,
    rank: stats.tier + ' ' + stats.rank,
    winrate: stats.winrate,
    wins: stats.wins
  };
  if (guild_data === null) {
    var new_guild = {
      guild_id: guild_id,
      users: {[stats.summonerName]: formatted_stats}
    };
    await mongo_ref.insertOne(new_guild);
  }
  else
    await mongo_ref.updateOne({guild_id: guild_id}, {$set: {["users." + stats.summonerName]: formatted_stats}});
}

async function check_has_users(guild_id)
{
  var mongo_ref = conn.db.collection('loltracker');
  var guild_data = await mongo_ref.findOne({guild_id: guild_id});
  if (guild_data === null)
    return false;
  if (guild_data.users[0] === null)
    return false;
  return true;
}

async function check_max_users(guild_id)
{
  var mongo_ref = conn.db.collection('loltracker');
  var guild_data = await mongo_ref.findOne({guild_id: guild_id});
  if (guild_data === null)
    return false;
  if (!guild_data.users)
    return false;
  if (Object.keys(guild_data.users).length >= 9)
    return true;
  return false;
}

async function get_leaderboard(guild_id)
{
  var mongo_ref = conn.db.collection('loltracker');
  var guild_data = await mongo_ref.findOne({guild_id: guild_id});
  if (guild_data === null)
    return;
  console.log(guild_data);
  return guild_data;
}

async function get_channel(guild_id)
{
  var mongo_ref = conn.db.collection('loltracker');
  var guild_data = await mongo_ref.findOne({guild_id: guild_id});
  if (guild_data === null)
    return;
  return guild_data.channel_id;
}

module.exports = { check_same_channel, check_channel_set, user_exist, set_channel, add_user,
                  check_has_users, check_max_users, remove_user, get_leaderboard, get_channel };