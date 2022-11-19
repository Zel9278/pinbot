const fs = require("fs")
const path = require("path")

const eventLoader = (client) => {
    const ignore = ["index.js"]

    let events = []
    let loaded = []

    async function init() {
        fs.readdirSync(__dirname)
            .filter((a) => !ignore.includes(a))
            .forEach((file) => {
                try {
                    if (!file.endsWith(".js")) return

                    const event = require(`./${file}`)
                    event._path = path.join(__dirname, file)

                    events.push(event)
                    console.log(`Added event: ${event.name}`)

                    client.on(event.name, event.exec)
                } catch (error) {
                    console.log(file, error.toString())
                }
            })

        loaded.push(...Object.values(events).flat())
        Object.assign(loaded, { init, _rawEvents: events })
    }

    Object.assign(loaded, { init, _rawEvents: events })

    return loaded
}

module.exports = eventLoader
