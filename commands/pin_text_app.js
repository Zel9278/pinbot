const { ApplicationCommandType } = require("discord.js")
const channelSendHandler = require("../utils/channelSendHandler")
const { client } = require("../index")

const pin = {
    data: {
        name: "pin",
        type: ApplicationCommandType.Message,
    },
    async exec(interaction) {
        const { channelId, guildId, user, commandName, targetId } = interaction
        if (commandName === "pin") {
            const message = await client.guilds
                .resolve(guildId)
                ?.channels.resolve(channelId)
                ?.messages.fetch(targetId)
            if (message.reactions.resolve("📌")?.count > 1) return
            channelSendHandler(user.id, targetId, channelId, guildId)
            interaction.reply({
                content: "Pinned!",
                ephemeral: true,
            })
            return
        }
    },
}

module.exports = pin
