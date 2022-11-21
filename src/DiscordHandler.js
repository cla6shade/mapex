class DiscordHandler {
    constructor(client, apex) {
        this.client = client
        this.apexApi = apex
        this.commandPrefix = "!"
    }

    bindEventListener() {
        //bind
        this.client.on('ready', this.onReady.bind(this))
        this.client.on('messageCreate', this.handleMessage.bind(this))
    }

    handleMessage(message) {
        let content = message.content
        if (content.startsWith(this.commandPrefix)) {
            let params = content.split(" ")
            let cmd = params.shift()
            this.handleCommand(cmd.substring(1), params, message)
        }
    }

    onReady() {
        console.log(this.client.user.tag + "(으)로 로그인 되었습니다.")
    }

    handleCommand(cmd, params, origin) { // origin은 message의 원래 객체
        cmd = cmd.toLowerCase()
        //TODO 하드코딩된 명령어 config에 저장하기
        if (cmd === "map") {
            let info = this.apexApi.getMapInfo();
            if (info.length === 0 || typeof info.current === "undefined") {
                origin.reply("서버에서 데이터를 받아오는 중입니다. 잠시 후에 다시 시도해주세요")
                return
            }
            let current = info.current
            let map = current.map
            let timeLeft = this.apexApi.getRotationTimeLeft()
            let next = info.next.map
            origin.reply("현재 맵은 " + map + " 입니다.(" + timeLeft + " 남음) 다음 맵은 " + next + " 입니다.")
            return
        }
        if (cmd === "craft") {
            let items = this.apexApi.getCraftItems()
            if (items.length === 0) {
                origin.reply("서버에서 정보를 불러오는 중입니다. 잠시만 기다려주세요.")
                return
            }
            let text = "";
            for (let i in items) {
                let item = items[i]
                text += item + " ";
            }
            origin.reply("현재 제작 로테이션: " + text)
            return
        }
        if (cmd === "help") {
            origin.reply("명령어 도움말: \n!map - 현재 일반 게임 맵 로테이션을 조회합니다.\n!craft - 현재 제작 로테이션을 조회합니다.")
        }
    }
}

module.exports = DiscordHandler