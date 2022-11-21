class TelegramHandler {
    constructor(client, apexApiHandler) {
        this.client = client
        this.apexApiHandler = apexApiHandler
    }

    bindEventListener() {
        this.client.on(/\/map (.+)/, (msg, match) => {
            let timeLeft = this.apexApiHandler.getRotationTimeLeft();
            let info = this.apexApiHandler.getMapInfo();
            let current = info.current
            let map = current.map
            let next = info.next.map
            this.client.sendMessage(msg.chat.id, "현재 맵은 " + map + " 입니다.(" + timeLeft + " 남음) 다음 맵은 " + next + " 입니다.")
        })
        this.client.on(/\/craft (.+)/, (msg, match) => {
            let items = this.apexApi.getCraftItems()
            if (items.length === 0) {
                this.client.sendMessage(msg.chat.id,"서버에서 정보를 불러오는 중입니다. 잠시만 기다려주세요.")
                return
            }
            let text = "";
            for (let i in items) {
                let item = items[i]
                text += item + " ";
            }
            this.client.sendMessage(msg.chat.id,"현재 제작 로테이션: " + text)
        })
    }
}

module.exports = TelegramHandler;