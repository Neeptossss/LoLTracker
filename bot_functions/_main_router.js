const add_to_leaderboard = require('./add_to_leaderboard');
const remove_from_leaderboard = require('./remove_from_leaderboard');
const leaderboard = require('./leaderboard');
const region = require('./set_region');
const set_channel = require('./set_channel');
const stat = require('./stat');

async function router(config, interaction)
{
    if (interaction.commandName == 'stat')
        stat(config, interaction);
    if (interaction.commandName == 'set_region')
        region(config, interaction);
    if (interaction.commandName == 'leaderboard')
        leaderboard(interaction);
    if (interaction.commandName == 'add_to_leaderboard')
        add_to_leaderboard(config, interaction);
    if (interaction.commandName == 'set_channel')
        set_channel(interaction);
    if (interaction.commandName == 'remove_from_leaderboard')
        remove_from_leaderboard(interaction);
}

module.exports = router;