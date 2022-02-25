require("dotenv").config();
const fs = require('fs');
const path = require('path');
const router = require('./bot_functions/_main_router');
const { Client, Intents, CommandInteractionOptionResolver } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"] });
const db = require('./database');

let rawdata = fs.readFileSync(path.resolve(__dirname, 'config.json'));
let config = JSON.parse(rawdata);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Present in ${client.guilds.cache.size} guild(s)`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  console.log(`Received command: ${interaction.commandName}`);
  router(config, interaction);
});

// client.on('interactionCreate', interaction => {
// 	if (!interaction.isButton()) return;
// 	if (interaction.customId === 'refresh') {
//     interaction.reply({content: 'Refreshing...', ephemeral: true});
//   }
// });

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  console.log(`Received message: ${message.content}`);
  if (db.check_same_channel(message.guildId, message.channelId === true)) {
    message.delete();
  }
});

client.login(process.env.DS_TOKEN);