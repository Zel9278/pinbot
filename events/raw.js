const reactHandler = require("../utils/reactHandler")

const raw = {
    name: "raw",
    async exec(data) {
        const { t, d } = data
        switch (t) {
            case "MESSAGE_REACTION_ADD":
                const { user_id, message_id, emoji, channel_id, guild_id } = d
                reactHandler(user_id, message_id, emoji, channel_id, guild_id)
                break

            default:
                break
        }
    },
}

module.exports = raw
