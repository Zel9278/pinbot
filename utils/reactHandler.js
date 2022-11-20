const channelSendHandler = require("./channelSendHandler")
const { client } = require("../index")

module.exports = async (
    userId,
    messageId,
    emoji,
    channelId,
    guildId,
    isBot
) => {
    if (isBot) return
    if (!client.database.getGuilds.find((a) => a.guild === guildId)) return
    if (emoji.name !== "📌") return

    const message = await client.guilds
        .resolve(guildId)
        ?.channels.resolve(channelId)
        ?.messages.fetch(messageId)
    if (!message) return
    if (message.reactions.resolve("📌")?.count > 1) return
    channelSendHandler(userId, messageId, channelId, guildId)
}
