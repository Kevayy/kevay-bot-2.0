const { ActivityType } = require('discord.js');

module.exports = (client) => {
    client.pickPresence = async () => {

        const options = [
            {
                type: ActivityType.Watching,
                text: "over the Copper Civils",
                status: "online"
            },
            {
                type: ActivityType.Watching,
                text: "over Lys Morket",
                status: "idle"
            },
            {
                type: ActivityType.Playing,
                text: "Minecraft",
                status: "dnd"
            },
            {
                type: ActivityType.Listening,
                text: "Convergance Anthems",
                status: "idle"
            }
        ];

        const option = Math.floor(Math.random() * options.length);

        client.user.setPresence({
            activities: [{
                name: options[option].text,
                type: options[option].type
            }],
            status: options[option].status
        });
    }
}