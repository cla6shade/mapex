const fs = require('fs')

const DISCORD_TOKEN_FILE = "discord_token.txt"
const APEX_TOKEN_FILE = "apex_token.txt"

const discord_token = fs.readFileSync(DISCORD_TOKEN_FILE).toString()
const apex_token = fs.readFileSync(APEX_TOKEN_FILE).toString()

const DiscordAuth = require("./DiscordAuth.js")
const EventHandler = require("./EventHandler.js")
const ApexApiHandler = require("./ApexApiHandler.js")

const auth = new DiscordAuth(discord_token)
let eventHandler, apexApiHandler;
auth.login().then(() => {
    let client = auth.client
    //apex handler register
    apexApiHandler = new ApexApiHandler(apex_token)

    eventHandler = new EventHandler(client, apexApiHandler)
    eventHandler.bindEventListener()
})