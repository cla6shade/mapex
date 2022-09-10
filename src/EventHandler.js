class EventHandler{
    constructor(client, apex){
        this.client = client
        this.apexApi = apex
        this.commandPrefix = "!"
    }
    bindEventListener(){
        //bind
        this.client.on('ready', this.onReady.bind(this))
        this.client.on('messageCreate', this.handleMessage.bind(this))
    }
    handleMessage(message){
        let content = message.content
        if(content.startsWith(this.commandPrefix)){
            let params = content.split(" ")
            let cmd = params.shift()
            this.handleCommand(cmd.substring(1), params, message)
        }
    }
    onReady(){
        console.log(this.client.user.tag + "(으)로 로그인 되었습니다.")
    }
    handleCommand(cmd, params, origin){ // origin은 message의 원래 객체
        if(cmd==="mapex"){
            let info = this.apexApi.info;
            if(typeof info.current === "undefined"){
                origin.reply("서버에서 데이터를 받아오는 중입니다. 잠시 후에 다시 시도해주세요")
                return
            }
            let current = info.current
            let map = current.map
            let timeLeft = current.remainingTimer
            let next = info.next.map
            origin.reply("현재 맵은 " + map + " 입니다.(" + timeLeft + " 남음) 다음 맵은 " + next + " 입니다.")
        }
    }
}
module.exports = EventHandler