const db = require("../database.js");

async function remove_from_leaderboard(interaction)
{
    var username_arg = interaction.options.get('username')?.value;
    if (await db.user_exist(interaction.guild.id, username_arg) === false) {
        interaction.reply('This player is not in the leaderboard.');
        return;
    }
    db.remove_user(interaction.guild.id, username_arg);
    await interaction.reply(`${username_arg} removed from leaderboard.`);
}

module.exports = remove_from_leaderboard;