const { client } = require("../index")

const interactionCreate = {
    name: "interactionCreate",
    async exec(interaction) {
        if (interaction.user.id === client.id) return

        if (
            interaction.isChatInputCommand() ||
            interaction.isMessageContextMenuCommand()
        ) {
            const command = client.customCommands.find(
                (x) => x.data.name == interaction.commandName
            )
            await command?.exec?.(interaction)
        }
    },
}

module.exports = interactionCreate
