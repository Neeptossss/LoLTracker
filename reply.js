const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const TableLayout = require('table-layout')
const { Table } = require('embed-table');

function summoner_stat(
  region,
  summonerName,
  profileIcon,
  tier,
  rank,
  leaguePoints,
  winrate,
  wins,
  losses,
  opgg,
  hotStreak
) {
  const message = {
    color: 0xd48f16,
    title: `Stats of ${summonerName} ${hotStreak === "true" ? "🔥" : " "}`,
    url: opgg,
    author: {
      name: summonerName,
      icon_url: profileIcon,
      url: opgg,
    },
    description: `This player have ${wins} wins and ${losses} losses over past 7 days.`,
    thumbnail: {
      url: `https://github.com/Neeptossss/LoLTracker/raw/main/ranks/${tier}.png`,
    },
    fields: [
      {
        name: "Rank",
        value: `${tier} ${rank !== "0" ? rank : " "}`,
        inline: true,
      },
      {
        name: "LP",
        value: leaguePoints,
        inline: true,
      },
      {
        name: "Winrate",
        value: `${winrate}%`,
        inline: true,
      },
    ],
    footer: {
      text: `Server region: ${region}`,
    },
  };
  return message;
}

function leaderboard_stat(region, data)
{
  //get the longest summonerName
  users = data.users
  var longest_summonerName = 0
  for (var key in users) {
    if (key.length > longest_summonerName)
      longest_summonerName = key.length
  }
  //get the longest rank
  var longest_rank = 0
  for (var key in users) {
    if (users[key].rank.length > longest_rank)
      longest_rank = users[key].rank.length
  }
  const table = new Table({
    titles: ['Summoner', 'Rank', 'LP', 'Winrate'],
    titleIndexes: [0, 9, 14, 17],
    columnIndexes: [0, longest_summonerName + 1, longest_rank + longest_summonerName + 1, longest_summonerName + longest_rank + 3],
    padEnd: 4
  });
  for (var key in users) {
    table.addRow([
      key,
      users[key].rank,
      users[key].leaguePoints,
      users[key].winrate + "%",
    ]);
  }
  const embed = new MessageEmbed().addFields(table.field());
  console.log(table);
  return embed;
}

module.exports = { summoner_stat, leaderboard_stat };
