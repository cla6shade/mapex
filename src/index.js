const Discord = require('discord.js')
const fs = require('fs')

const TOKEN_FILE = "token.txt"

const prefix = "!"

const {Client, GatewayIntentBits} = require('discord.js')

const client = new Client({intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]})

client.on('ready', () => {
    console.log(client.user.tag + "(으)로 로그인되었습니다.")
})
client.on('messageCreate', message => {
    let text = message.content
    if(! text.startsWith(prefix)){
        return;
    }
    let args = text.split(" ")
    let cmd = split.shift()
    if(cmd===prefix + 'mapex'){
    }
})

let token = fs.readFileSync(TOKEN_FILE).toString()
client.login(token)