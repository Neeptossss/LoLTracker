const add_to_leaderboard = require('./add_to_leaderboard');
const leaderboard = require('./leaderboard');
const region = require('./region');
const set_channel = require('./set_channel');
const stat = require('./stat');

async function router(config, interaction)
{
    if (interaction.commandName == 'stat')
        stat(config, interaction);
    if (interaction.commandName == 'region')
        region(config, interaction);
    if (interaction.commandName == 'leaderboard')
        leaderboard(interaction);
    if (interaction.commandName == 'add_to_leaderboard')
        add_to_leaderboard(config, interaction);
    if (interaction.commandName == 'set_channel')
        set_channel(interaction);
}

module.exports = router;