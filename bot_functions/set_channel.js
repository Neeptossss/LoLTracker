const db = require("../database.js");

async function set_channel(interaction)
{
    db.set_channel(interaction.guild.id, interaction.channel.id);
    interaction.reply('Channel set.');
}

module.exports = set_channel;