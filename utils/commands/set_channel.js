const { SlashCommandBuilder } = require('@discordjs/builders');
const { Options } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('set_channel')
	.setDescription('Change leaderboard channel to the current channel')

module.exports = { data }