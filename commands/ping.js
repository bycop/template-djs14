const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder().setName("ping").setDescription("Pong"),

	async run(client, content, args) {
		content.reply("Pong !");
	}
}