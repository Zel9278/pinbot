const { ApplicationCommandType } = require("discord.js")

module.exports = async ({ client }) => {
    client.database.getGuilds.forEach(async (server) => {
        const guild = client.guilds.resolve(server.guild)
        await guild?.commands
            .set([
                {
                    name: "pin",
                    type: ApplicationCommandType.Message,
                },
            ])
            .then(() => {
                console.log(`Loaded ${guild.name}'s commands.`)
            })
    })
}
