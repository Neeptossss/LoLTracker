const db = require("../database.js");

async function check_channel_set(interaction)
{
    if (await db.check_channel_set(interaction.guild.id) === false) {
    interaction.reply('Please set a channel first.');
    return;
    }
    var {embed, row} = reply.leaderboard_stat(region);
    await interaction.reply({embeds: [embed], components: [row]});
}

module.exports = check_channel_set;