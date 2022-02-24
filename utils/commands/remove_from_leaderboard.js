const { SlashCommandBuilder } = require('@discordjs/builders');
const { Options } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('remove_from_leaderboard')
	.setDescription('Remove an user from the server leaderboard')
    .addStringOption(option =>
        option.setName('username')
            .setDescription('Summoner name')
            .setRequired(true));

module.exports = { data }