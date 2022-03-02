module.exports = async (client, message) => {

	if (message.author.bot) return;

	let prefix = process.env.BOT_PREFIX;
	if (!message.content.startsWith(prefix)) return;

	let args = message.content.slice(prefix.length).trim().split(/ +/g);

	let messageArray = message.content.split(" ")
	let cmd = messageArray[0]

	let commandfile = client.commands.get(cmd.slice(prefix.length));
	if (commandfile) {
		commandfile.run(client, message, args, cmd);
	}

};