const TelegramBot = require("node-telegram-bot-api")
const Agent = require('socks5-https-client/lib/Agent.js')

class TelegramAuth {
    constructor(token) {
        this.token = token;
    }
    login(){
        return new TelegramBot(this.token, {
            polling: true,
            request: {
                agentClass: Agent,
                agentOptions: {
                    socksHost: process.env.PROXY_SOCKS5_HOST,
                    socksPort: parseInt(process.env.PROXY_SOCKS5_PORT),
                    // If authorization is needed:
                    // socksUsername: process.env.PROXY_SOCKS5_USERNAME,
                    // socksPassword: process.env.PROXY_SOCKS5_PASSWORD
                }
            } // https://stackoverflow.com/questions/54349234/error-polling-error-codeetelegram-messageetelegram-401-unauthorize
        });
    }
}
module.exports = TelegramAuth;