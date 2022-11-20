const fs = require("fs")
const path = require("path")

const commandLoader = (client) => {
    const ignore = ["index.js"]

    let commands = {
        global: [],
        guild: [],
    }
    let loaded = []

    async function init() {
        fs.readdirSync(__dirname)
            .filter((file) => !file.startsWith("_"))
            .filter((file) => file.endsWith(".js"))
            .filter((a) => !ignore.includes(a))
            .forEach((file) => {
                try {
                    const command = require(`./${file}`)
                    command._path = path.join(__dirname, file)

                    commands.guild.push(command)
                    console.log(`Added guild command: ${command.data.name}`)
                } catch (error) {
                    console.log(file, error.toString())
                }
            })

        await client.database.getGuilds.forEach(async (g) => {
            const guild = client.guilds.resolve(g.guild)
            if (!guild) return

            await guild.commands
                .set(commands.guild.map((c) => c.data))
                .then(() => {
                    console.log(`Loaded ${guild.name}'s commands.`)
                })
        })

        loaded.push(...Object.values(commands).flat())
        Object.assign(loaded, { init, _rawCommands: commands })
    }

    Object.assign(loaded, { init, _rawCommands: commands })

    return loaded
}

module.exports = commandLoader
