function bindMethod(obj, method) {
    return obj[method].bind(obj)
}

module.exports = ({ sql, client }) => {
    const table_servers = sql
        .prepare(
            "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'servers';"
        )
        .get()
    if (!table_servers["count(*)"]) {
        sql.prepare(
            "CREATE TABLE servers (guild TEXT PRIMARY KEY, channel TEXT);"
        ).run()
        sql.prepare(
            "CREATE UNIQUE INDEX idx_servers_id ON servers (guild);"
        ).run()
        sql.pragma("synchronous = 1")
        sql.pragma("journal_mode = wal")
    }

    client.database = {}
    client.database.getGuild = bindMethod(
        sql.prepare("SELECT * FROM servers WHERE guild = ?"),
        "get"
    )
    client.database.setGuild = bindMethod(
        sql.prepare(
            "INSERT OR REPLACE INTO servers (guild, channel) VALUES (@guild, @channel);"
        ),
        "run"
    )
    client.database.getGuilds = sql.prepare("SELECT * FROM servers;").all()
}
