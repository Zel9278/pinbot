require("dotenv").config()

const { Client, GatewayIntentBits } = require("discord.js")
const client = new Client({
    intents: Object.values(GatewayIntentBits).filter(Number.isInteger),
})

const SERVER_ID = "990917256290660352"
const CHANNEL_ID = "1005729189338554458"

client.on("ready", () => console.log("Bot is ready!"))

client.on("messageReactionAdd", (react, user) => {
    if (react.message.guildId !== SERVER_ID) return
    if (react.emoji.name !== "📌") return
    if (react.count > 1) return

    const channel = client.channels.resolve(CHANNEL_ID)
    if (!channel) return
    channel.send({
        embeds: [
            {
                author: {
                    name: react.message.author.tag,
                    iconURL: react.message.author.avatarURL(),
                },
                title: `Pinned By. ${user.tag}`,
                url: react.message.url,
                description: react.message.content,
                footer: {
                    text: `Message from ${react.message.channel.name}`,
                },
            },
        ],
    })
})

client.login(process.env.TOKEN)
