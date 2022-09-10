const axios = require('axios')
require('date-utils')

const APEX_API_URL = "https://api.mozambiquehe.re/maprotation"
class ApexApiHandler{
    constructor(token){
        this.token = token
        this.info = {}
        setInterval(this.update.bind(this), 1000)
    }
    update(){
        this.getMapInfo().then((response)=>{
            this.info = response.data
        })
    }
    getMapInfo(){
        // APEX_API_URL?auth=token
        return this.get(APEX_API_URL, {auth: this.token})
    }
    async get(url, params){
        return await axios.get(url, {
            params: params
        })
    }
}
module.exports = ApexApiHandler;