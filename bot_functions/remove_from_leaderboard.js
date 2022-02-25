const db = require("../database.js");

async function remove_from_leaderboard(interaction)
{
    var username_arg = interaction.options.get('username')?.value;
    if (await db.check_channel_set(interaction.guild.id) === false) {
        interaction.reply('Please set a channel first.');
        return;
    }
    if (interaction.channel.id !== await db.get_channel(interaction.guild.id)) {
        interaction.reply('This command can only be used in the channel set by the bot.');
        return;
    }
    if (await db.user_exist(interaction.guild.id, username_arg) === false) {
        interaction.reply('This player is not in the leaderboard.');
        return;
    }
    db.remove_user(interaction.guild.id, username_arg);
    await interaction.reply(`${username_arg} removed from leaderboard.`);
}

module.exports = remove_from_leaderboard;