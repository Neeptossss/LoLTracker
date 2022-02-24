const { SlashCommandBuilder } = require('@discordjs/builders');
const { Options } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('stat')
	.setDescription('Get the latest stats of a summoner')
	.addStringOption(option =>
		option.setName('username')
			.setDescription('Summoner name')
			.setRequired(true));

module.exports = { data }