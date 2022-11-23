class TelegramHandler {
    constructor(client, apexApiHandler) {
        this.client = client
        this.apexApiHandler = apexApiHandler
    }

    bindEventListener() {
        this.client.on("message", (message) => {
            if (!message.text)
                return;
            let text = message.text;
            let args = text.split(" ");
            let cmd = args.shift();
            if (cmd === "/map") {
                let timeLeft = this.apexApiHandler.getRotationTimeLeft();
                let info = this.apexApiHandler.getMapInfo();
                let current = info.current
                let map = current.map
                let next = info.next.map
                this.client.sendMessage(message.chat.id, "현재 맵은 " + map + " 입니다.(" + timeLeft + " 남음) 다음 맵은 " + next + " 입니다.");
            } else if (cmd === "/craft") {

                let items = this.apexApiHandler.getCraftItems()
                if (items.length === 0) {
                    this.client.sendMessage(message.chat.id, "서버에서 정보를 불러오는 중입니다. 잠시만 기다려주세요.")
                    return
                }
                let text = "";
                for (let i in items) {
                    let item = items[i]
                    text += item + " ";
                }
                this.client.sendMessage(message.chat.id, "현재 제작 로테이션: " + text)
            }
        });

    }
}

module.exports = TelegramHandler;