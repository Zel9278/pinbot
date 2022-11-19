require("dotenv").config()

const { Client, GatewayIntentBits } = require("discord.js")

const client = new Client({
    intents: Object.values(GatewayIntentBits).filter(Number.isInteger),
})

client.on("ready", () => require("./utils/readyHandler")(client))

client.login(process.env.TOKEN)

module.exports = { client }
