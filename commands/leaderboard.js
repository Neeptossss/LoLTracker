const { SlashCommandBuilder } = require('@discordjs/builders');
const { Options } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('leaderboard')
	.setDescription('Show the leaderboard of the server')

module.exports = { data }