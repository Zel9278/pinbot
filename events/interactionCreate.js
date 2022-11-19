const channelSendHandler = require("../utils/channelSendHandler")

const interactionCreate = {
    name: "interactionCreate",
    async exec(interaction) {
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
    },
}

module.exports = interactionCreate
