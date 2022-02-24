const { SlashCommandBuilder } = require('@discordjs/builders');
const { Options } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('region')
	.setDescription('Change the region of the bot')
	.addStringOption(option =>
		option.setName('region')
			.setDescription('Enter the region you want to use (ex: EUW for Europe West)')
			.setRequired(true));

module.exports = { data }