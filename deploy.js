const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config()

const commands = [

	new SlashCommandBuilder().setName('ping').setDescription("Pong"),

]
	.map(command => command.toJSON());
const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

(async () => {
	try {
		// let t = await rest.get(Routes.applicationGuildCommands(process.env.BOT_CLIENT_ID, BOT_GUILD_ID)) // Get Guild slash list
		// console.log(t)
		await rest.put(
			Routes.applicationGuildCommands(process.env.BOT_CLIENT_ID, process.env.BOT_GUILD_ID),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();