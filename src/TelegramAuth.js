const TelegramBot = require("node-telegram-bot-api")

class TelegramAuth {
    constructor(token) {
        this.token = token;
    }
    login(){
        return new TelegramBot(this.token, {
            polling: true,
        });
    }
}
module.exports = TelegramAuth;