const db = require("../database.js");
const reply = require("../reply.js");

async function leaderboard(interaction)
{
    if (await db.check_channel_set(interaction.guild.id) === false) {
        interaction.reply('Please set a channel first.');
        return;
    }
    if (interaction.channel.id !== await db.get_channel(interaction.guild.id)) {
        interaction.reply('This command can only be used in the channel set by the bot.');
        return;
    }
    if (await db.check_has_users(interaction.guild.id) === false) {
        interaction.reply('The leaderboard is empty.');
        return;
    }
    let data = await db.get_leaderboard(interaction.guild.id);
    let embed = reply.leaderboard_stat(interaction, data.users);
    await interaction.reply({embeds: [embed]});
}

module.exports = leaderboard;