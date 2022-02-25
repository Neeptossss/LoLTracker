const db = require("../database.js");
const reply = require("../reply.js");

async function leaderboard(config, interaction)
{
    if (await db.check_channel_set(interaction.guild.id) === false) {
        interaction.reply('Please set a channel first.');
        return;
    }
    let data = await db.get_leaderboard(interaction.guild.id);
    let embed = reply.leaderboard_stat(interaction, config.region, data.users);
    await interaction.reply({embeds: [embed]});
}

module.exports = leaderboard;