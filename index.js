require('dotenv').config()

const Discord = require('discord.js');
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { Intents } = require('discord.js');
const client = new Discord.Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

// process.on('uncaughtException', () => {});

fs.readdir("./commands/", (err, files) => {

	if (err) return console.log(err);

	let jsfile = files.filter(file => file.split(".").pop() === "js");
	if (jsfile.length <= 0) {
		console.log("No commands loaded.");
		return;
	} else {
		console.log("\n\n" + jsfile.length + " commands loaded\n")
	}

	client.commandArray = [];

	files.forEach(file => {
		if (!file.endsWith(".js")) return;
		let props = require(`./commands/${file}`)
		console.log(`${file} loaded`)

		client.commands.set(props.data.name, props);
		console.log(props)
		client.commandArray.push(props.data.toJSON());
	});

	const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

	(async () => {
		try {
			await rest.put(
				Routes.applicationGuildCommands(process.env.BOT_CLIENT_ID, process.env.BOT_GUILD_ID),
				{ body: client.commandArray },
			);

			console.log('Successfully registered application commands.');
		} catch (error) {
			console.error(error);
		}
	})();
});

fs.readdir("./events/", (err, files) => {

	if (err) console.log(err);

	let jsfile = files.filter(file => file.split(".").pop() === "js");
	if (jsfile.length <= 0) {
		console.log("No events loaded.");
		return;
	} else {
		console.log("\n" + jsfile.length + " events loaded\n")
	}

	files.forEach(file => {
		if (!file.endsWith(".js")) return;
		const event = require(`./events/${file}`)
		console.log(`${file} loaded`);

		let eventName = file.split(".")[0]
		client.events.set(eventName, event);
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${file}`)]
	});
});

client.login(process.env.BOT_TOKEN);