class TelegramHandler {
    constructor(client, apexApiHandler) {
        this.client = client
        this.apexApiHandler = apexApiHandler

        this.username = ""
        this.tag = ""
        this.client.getMe().then((me)=>{
            this.username = me.username;
            console.log(this.username + "(으)로 로그인 되었습니다.")
            this.tag = "@" + this.username;
        })
    }

    bindEventListener() {
        this.client.on("message", (message) => {
            if (!message.text)
                return;
            let text = message.text;
            let args = text.split(" ");
            let cmd = args.shift();
            cmd = cmd.toLowerCase()
            if (cmd === "/map" || cmd === "/map" + this.tag) {
                let timeLeft = this.apexApiHandler.getRotationTimeLeft();
                let info = this.apexApiHandler.getMapInfo();
                let current = info.current
                let map = current.map
                let next = info.next.map
                this.client.sendMessage(message.chat.id, "현재 맵은 " + map + " 입니다.(" + timeLeft + " 남음) 다음 맵은 " + next + " 입니다.", {reply_to_message_id: message.message_id});
            } else if (cmd === "/craft" || cmd === "/craft" + this.tag) {
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
                this.client.sendMessage(message.chat.id, "현재 제작 로테이션: " + text, {reply_to_message_id: message.message_id})
            }
        });

    }
}

module.exports = TelegramHandler;