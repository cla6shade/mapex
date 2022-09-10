const {Client, GatewayIntentBits} = require('discord.js')

class DiscordAuth {
    constructor(token) {
        this.token = token
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        })
    }

    login() {
        return this.client.login(this.token)
    }
}
module.exports = DiscordAuth