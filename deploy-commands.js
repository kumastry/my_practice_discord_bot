import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import * as dotenv from 'dotenv';
dotenv.config();

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.clientId;
const guildId = process.env.guildId;

// Grab all the command files from the commands directory you created earlier
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


const getCommands = async () => {	
	const cmds = [];
	for (const file of commandFiles) {
		try {
			const command = await import(`./commands/${file}`);
		    cmds.push(command.default.data);
		} catch (error) {
			console.log(error);
		}
	}

	return cmds;
}



// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {

		const commands = await getCommands();
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();