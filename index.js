require("dotenv").config()

const {
    Client,
    GatewayIntentBits,
    ApplicationCommandType,
} = require("discord.js")
const client = new Client({
    intents: Object.values(GatewayIntentBits).filter(Number.isInteger),
})

const SERVER_ID = "990917256290660352"
const CHANNEL_ID = "1005729189338554458"

client.on("ready", async () => {
    console.log("Bot is ready!")

    await client.guilds.resolve(SERVER_ID)?.commands.set([
        {
            name: "pin",
            type: ApplicationCommandType.Message,
        },
    ])
})

const reactHandler = async (userId, messageId, emoji, channelId, guildId) => {
    if (guildId !== SERVER_ID) return
    if (emoji.name !== "📌") return

    const message = await client.guilds
        .resolve(guildId)
        ?.channels.resolve(channelId)
        ?.messages.fetch(messageId)
    if (!message) return
    if (message.reactions.cache.size > 1) return
    channelSendHandler(userId, messageId, channelId, guildId)
}

const channelSendHandler = async (userId, messageId, channelId, guildId) => {
    if (guildId !== SERVER_ID) return

    const guild = client.guilds.resolve(guildId)
    const channel = guild?.channels.resolve(channelId)
    const message = await channel?.messages.fetch(messageId)
    if (!message) return

    const pinChannel = client.channels.resolve(CHANNEL_ID)
    if (!pinChannel) return

    const user = guild?.members.resolve(userId)?.user

    pinChannel.send({
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
}

client.on("raw", (data) => {
    const { t, d } = data
    switch (t) {
        case "MESSAGE_REACTION_ADD":
            const { user_id, message_id, emoji, channel_id, guild_id } = d
            reactHandler(user_id, message_id, emoji, channel_id, guild_id)
            break

        default:
            break
    }
})

client.on("interactionCreate", (interaction) => {
    if (!interaction.isMessageContextMenuCommand()) return
    const { channelId, guildId, user, commandName, targetId } = interaction
    if (commandName === "pin") {
        channelSendHandler(user.id, targetId, channelId, guildId)
        interaction.reply({
            content: "Pinned!",
            ephemeral: true,
        })
        return
    }
})

client.login(process.env.TOKEN)
