const fs = require('fs')

const DISCORD_TOKEN_FILE = "discord_token.txt"
const TELEGRAM_TOKEN_FILE = "telegram_token.txt"
const APEX_TOKEN_FILE = "apex_token.txt"

const discord_token = fs.readFileSync(DISCORD_TOKEN_FILE).toString()
const telegram_token = fs.readFileSync(TELEGRAM_TOKEN_FILE).toString()
const apex_token = fs.readFileSync(APEX_TOKEN_FILE).toString()

const DiscordAuth = require("./DiscordAuth.js")
const DiscordHandler = require("./DiscordHandler.js")

const TelegramAuth = require("./TelegramAuth.js")
const TelegramHandler = require("./TelegramHandler.js")
const ApexApiHandler = require("./ApexApiHandler.js")

const discordAuth = new DiscordAuth(discord_token)
const telegramAuth = new TelegramAuth(telegram_token)

let discordHandler;
let apexApiHandler = new ApexApiHandler(apex_token)

let telegramHandler = new TelegramHandler(telegramAuth.login(), apexApiHandler)
telegramHandler.bindEventListener()
discordAuth.login().then(() => {
    let client = discordAuth.client
    //apex handler register

    discordHandler = new DiscordHandler(client, apexApiHandler)
    discordHandler.bindEventListener()
})