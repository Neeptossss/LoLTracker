const db = require("../database.js");
const riot = require('../lolscrapper.js');

async function add_to_leaderboard(config, interaction)
{
    var username_arg = interaction.options.get('username')?.value;
    if (await db.check_channel_set(interaction.guild.id) === false) {
        interaction.reply('Please set a channel first.');
        return;
    }
    if (await db.user_exist(interaction.guild.id, username_arg) === true) {
        interaction.reply('This player is already in the leaderboard.');
        return;
    }
    if (await db.check_max_users(interaction.guild.id) === true) {
        interaction.reply('The leaderboard is full.');
        return;
    }
    var stats = await riot.scrapper(config.region, username_arg);
    if (stats.exists === false) {
        interaction.reply('This player doesn\'t exist.');
        return;
    }
    db.add_user(interaction.guild.id, stats);
    await interaction.reply(`${username_arg} added to leaderboard.`);
}

module.exports = add_to_leaderboard;