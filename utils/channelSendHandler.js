const { client } = require("../index")

module.exports = async (userId, messageId, channelId, guildId) => {
    if (!client.database.getGuilds.find((a) => a.guild === guildId)) return
    const guildData = client.database.getGuilds.find((a) => a.guild === guildId)

    const guild = client.guilds.resolve(guildId)
    const channel = guild?.channels.resolve(channelId)
    const message = await channel?.messages.fetch(messageId)
    if (!message) return

    const pinChannel = client.channels.resolve(guildData.channel)
    if (!pinChannel) return

    const user = guild?.members.resolve(userId)?.user

    pinChannel
        .send({
            embeds: [
                {
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.avatarURL(),
                    },
                    title: `Pinned By. ${user?.tag}`,
                    url: message.url,
                    description: message.content,
                    footer: {
                        text: `Message from ${message.channel.name}`,
                    },
                },
            ],
        })
        .then(() => message.react("📌"))
}
