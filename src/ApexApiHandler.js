const axios = require('axios')
require('date-utils')

const APEX_API_URL_MAP = "https://api.mozambiquehe.re/maprotation"
const APEX_API_URL_CRAFT = "https://api.mozambiquehe.re/crafting"

class ApexApiHandler{
    constructor(token){
        this.token = token
        this.init().then(()=>{
            this.DAY = (new Date()).getDay() // to check craft rotation interval
            setInterval(this.update.bind(this), 1000)})
    }

    update(){
        let date = new Date();
        let timestamp = Math.floor(date.getTime() / 1000);
        // Craft info => update every day
        // Map info => update on next time
        if(! this.mapInfo || this.mapInfo.length === 0 || timestamp >= this.mapInfo.current.end){ // map rotation update
            this.requestMapInfo().then(response =>{
                if(! response.data || response.data.length === 0){
                    return
                }
                this.mapInfo = response.data
            })
        }
        let day = date.getDay()
        if(day !== this.DAY || ! this.craftInfo || this.craftInfo.length === 0){ // craft rotation update
            this.DAY = day;
            this.requestCraftInfo().then(response =>{
                if(! response.data || response.data.length === 0){
                    return
                }
                this.craftInfo = response.data
            })
        }
    }

    getRotationTimeLeft(){
        let date = new Date();
        if(! this.mapInfo || this.mapInfo.length === 0){
            return "00:00:00"
        }
        let end = this.mapInfo.current.end
        let endDate = new Date(end * 1000) //modify second-based timestamp to millisecond-based timestamp

        let secs = date.getSecondsBetween(endDate)
        let hours = this.getDoubleDigit(Math.floor(secs / 3600))
        secs %= 3600
        let mins = this.getDoubleDigit(Math.floor(secs / 60))
        secs %= 60
        secs = this.getDoubleDigit(secs)

        return hours + ":" + mins + ":" + secs;
    }

    getDoubleDigit(num){
        if(num < 10){
            return "0" + num;
        }
        return num
    }

    getCraftItems(){
        // bundle no 0, 1, 2, 3: deadshot, equipment, weapon1, weapon2
        if(! this.craftInfo || this.craftInfo.length === 0)
            return []
        let ret = []
        for(let i=0; i<4;i++){
            let bundle = this.craftInfo
            let contents = bundle.bundleContent;
            for(let key in contents){
                let content = contents[key]
                let name = content.itemType.name
                ret.push(name)
            }
        }
        return ret;
    }
    async init(){
        this.mapInfo = await this.requestMapInfo()
        this.craftInfo = await this.requestCraftInfo()
    }
    getMapInfo(){
        return this.mapInfo
    }
    getCraftInfo(){
        return this.craftInfo
    }
    requestCraftInfo(){
        return this.get(APEX_API_URL_CRAFT, {auth: this.token});
    }
    requestMapInfo(){
        // APEX_API_URL?auth=token
        return this.get(APEX_API_URL_MAP, {auth: this.token})
    }
    async get(url, params){
        try {
            return await axios.get(url, {
                params: params
            })
        } catch (e) {
            return {}
        }
    }
}
module.exports = ApexApiHandler;