const {SlashCommandBuilder} = require(`discord.js`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('birthday')
        .setDescription('Wish someone a happy birthday!')
        .addStringOption(option =>
        option.setName('discorduser')
            .setDescription('Type in the @ of the discorduser')
            .setRequired(true)),

    async execute(interaction, client) {
        const message = await interaction.deferReply({fetchReply: true})
        const user = interaction.user;
        const user2 = interaction.options.getString('discorduser')
        const video = 'https://www.youtube.com/watch?v=FbDdV6etYJQ'

        await interaction.editReply(`${user} wishes ${user2} a happy birthday!\n${video}`)
    }
}