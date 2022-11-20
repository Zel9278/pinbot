const { PresenceUpdateStatus } = require("discord.js")
const commandLoader = require("../commands/index")
const eventLoader = require("../events/index")

module.exports = (client) => {
    require("../utils/initDatabase.js")({
        sql: new (require("better-sqlite3"))("pinbot.db"),
        client,
    })
    console.log("Bot is ready!")

    const customCommands = commandLoader(client)
    const customEvents = eventLoader(client)

    Object.assign(client, {
        customCommands,
        customEvents,
        _rawCommands: customCommands._rawCommands,
        _rawEvents: customEvents._rawEvents,
    })

    customCommands.init()
    customEvents.init()

    client.user.presence.set({
        status: "dnd",
        activities: [
            {
                name: "Depelopment by ced",
                type: PresenceUpdateStatus.Playing,
            },
        ],
    })
}
