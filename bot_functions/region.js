const utils = require("../utils_ds.js");

async function region(config, interaction)
{
var region_arg = interaction.options.get('region')?.value;
    if (!utils.is_valid_region(region_arg)) {
      interaction.reply(`${region_arg} is not a valid region.`);
      return;
    }
    config.region = utils.format_region(region_arg);
    await interaction.reply(`New region set to ${region_arg}.`);
}

module.exports = region;