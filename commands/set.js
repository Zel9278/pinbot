const { ApplicationCommandOptionType } = require("discord.js")
const { client } = require("../index")

const set = {
    data: {
        name: "set",
        description: "Specifies the channel to place the pinned message.",
        options: [
            {
                name: "channel",
                description: "Channel to be specified",
                type: ApplicationCommandOptionType.Channel,
            },
        ],
    },
    async exec(interaction) {
        const channel =
            interaction.options.getChannel("channel") || interaction.channel
        const guild = client.database.getGuild(interaction.guild.id)
        if (!guild) {
            guild = {
                guild: interaction.guild.id,
                channel: channel.id,
            }
        }

        guild.channel = channel.id
        client.database.setGuild(guild)

        await interaction.reply(
            `The channel to place the pin is set to ${channel}.`
        )
    },
}

module.exports = set
