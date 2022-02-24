const db = require("../database.js");

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
    db.add_user(config.region, interaction.guild.id, username_arg);
    await interaction.reply(`${username_arg} added to leaderboard.`);
}

module.exports = add_to_leaderboard;