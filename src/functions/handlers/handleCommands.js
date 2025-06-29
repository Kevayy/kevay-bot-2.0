const { REST } = require(`@discordjs/rest`);
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('./src/commands');

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));

            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);

                // ✅ Verifieer het commando vóór je het toevoegt
                if (!command.data || !command.data.name) {
                    console.warn(`⚠️ Skipping command file ${file} – missing 'data.name'`);
                    continue;
                }

                commands.set(command.data.name, command);
                commandArray.push(command.data);
                console.log(`✅ Command: ${command.data.name} has passed through the handler`);
            }
        }

        const rest = new REST({ version: '10' }).setToken(process.env.token);
        try {
            console.log('⏳ Started refreshing application (/) commands...');
            await rest.put(
                Routes.applicationCommands(process.env.clientId),
                { body: client.commandArray }
            );
            console.log('✅ Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error('❌ Error reloading commands:', error);
        }
    };
};
