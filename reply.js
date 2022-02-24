const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

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
      url: `https://github.com/Neeptossss/League-of-Legends-RanksAssets/raw/main/${tier}.png`,
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

function leaderboard_stat(region) {
  const embed = new MessageEmbed()
    .setColor("#d48f16")
    .setTitle("Leaderboard")
    .setDescription("Some description here");
  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("refresh")
      .setLabel("Refresh")
      .setStyle("PRIMARY")
  );
  return { embed, row };
}

module.exports = { summoner_stat, leaderboard_stat };
