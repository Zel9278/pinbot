const { PresenceUpdateStatus } = require("discord.js")

module.exports = (client) => {
    require("../utils/initDatabase.js")({
        sql: new (require("better-sqlite3"))("pinbot.db"),
        client,
    })
    require("../utils/initInteraction")({ client })
    console.log("Bot is ready!")

    client.user.presence.set({
        status: "dnd",
        activities: [
            {
                name: "Depelopment by ced",
                type: PresenceUpdateStatus.Playing,
            },
        ],
    })
    require("../events")(client).init()
}
