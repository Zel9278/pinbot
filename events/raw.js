const reactHandler = require("../utils/reactHandler")
const { client } = require("../index")

const raw = {
    name: "raw",
    async exec(data) {
        const { t, d } = data
        switch (t) {
            case "MESSAGE_REACTION_ADD":
                const { user_id, message_id, emoji, channel_id, guild_id } = d
                const isBot = client.users.resolve(user_id).bot
                reactHandler(
                    user_id,
                    message_id,
                    emoji,
                    channel_id,
                    guild_id,
                    isBot
                )
                break

            default:
                break
        }
    },
}

module.exports = raw
