require("dotenv").config();
const reply = require ("./reply.js");
const utils = require("./utils_ds.js");
const riot = require('./lolscrapper.js');
const db = require("./database.js");
const { Client, Intents, CommandInteractionOptionResolver } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

var region = "euw1";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'stat') {
    var username_arg = interaction.options.get('username')?.value;
    var stats = await riot.scrapper(region, username_arg);
    if (stats.exists === false) {
      interaction.reply('This player doesn\'t exist.');
      return;
    }
    var message = reply.summoner_stat(region, stats.summonerName,
                  stats.profileIcon, stats.tier, stats.rank,
                  stats.leaguePoints, stats.winrate, stats.wins,
                  stats.losses, stats.opgg, stats.hotStreak);
    await interaction.reply({embeds: [message]});
  }
  if (interaction.commandName === 'region') {
    var region_arg = interaction.options.get('region')?.value;
    if (!utils.is_valid_region(region_arg)) {
      interaction.reply(`${region} is not a valid region.`);
      return;
    }
    region = utils.format_region(region_arg);
    await interaction.reply(`New region set to ${region_arg}.`);
  }
  if (interaction.commandName === 'leaderboard') {
    if (await db.check_channel_set(interaction.guild.id) === false) {
      interaction.reply('Please set a channel first.');
      return;
    }
    var {embed, row} = reply.leaderboard_stat(region);
    await interaction.reply({embeds: [embed], components: [row]});
  }
  if (interaction.commandName === 'add_to_leaderboard') {
    if (await db.check_channel_set(interaction.guild.id) === false) {
      interaction.reply('Please set a channel first.');
      return;
    }
    var username_arg = interaction.options.get('username')?.value;
    db.add_user(region, interaction.guild.id, username_arg);
    await interaction.reply(`${username_arg} added to leaderboard.`);
  }
  if (interaction.commandName === 'set_channel') {
    db.set_channel(interaction.guild.id, interaction.channel.id);
    interaction.reply('Channel set.');
  }
});

client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
	if (interaction.customId === 'refresh') {
    interaction.reply({content: 'Refreshing...', ephemeral: true});
  }
});

client.login(process.env.DS_TOKEN);