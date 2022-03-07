const fs = require('fs');
const path = require('path');
const router = require('./bot_functions/_main_router');
const { Client, Intents, CommandInteractionOptionResolver } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"] });
const refresh = require('./bot_functions/leaderboard_refresh');
require('./utils/deploy-commands');

const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'config/config.json')));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Present in ${client.guilds.cache.size} guild(s)`);
  client.user.setActivity('your stats', { type: 'WATCHING' });
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  console.log(`Received command: ${interaction.commandName}`);
  router(config, interaction);
});

client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
	if (interaction.customId === 'refresh') {
    refresh(interaction);
  }
});

// client.on('messageCreate', async message => {
//   if (message.author.bot) return;
//   console.log(`Received message: ${message.content}`);
//   if (db.check_same_channel(message.guildId, message.channelId === true)) {
//     message.delete();
//   }
// });

client.login(config.discord_token);