module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        //const role = channel.guild.roles.cache.find(role => role.name === roleName);

        setInterval(client.pickPresence, 900 * 1000);

        console.log(`Nyhef is online as: ${client.user.tag}!`);
    }
}