const { client } = require("../index")

const get = {
    data: {
        name: "get",
        description: "Get pinned channel.",
    },
    async exec(interaction) {
        const channel = client.channels.resolve(
            client.database.getGuild(interaction.guild.id)?.channel
        )

        if (!channel)
            return interaction.reply(
                "There are no channels specified for this server."
            )

        await interaction.reply(
            `The channel specified for this server is ${channel}.`
        )
    },
}

module.exports = get
