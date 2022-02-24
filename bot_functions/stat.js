const riot = require('../lolscrapper.js');
const reply = require('../reply.js');

async function stat(config, interaction)
{
    var username_arg = interaction.options.get('username')?.value;
        var stats = await riot.scrapper(config.region, username_arg);
        if (stats.exists === false) {
        interaction.reply('This player doesn\'t exist.');
        return;
        }
        var message = reply.summoner_stat(config.region, stats.summonerName,
                    stats.profileIcon, stats.tier, stats.rank,
                    stats.leaguePoints, stats.winrate, stats.wins,
                    stats.losses, stats.opgg, stats.hotStreak);
        await interaction.reply({embeds: [message]});
}

module.exports = stat;