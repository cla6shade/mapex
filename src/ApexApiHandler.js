const axios = require('axios')
require('date-utils')

const APEX_API_URL = "https://api.mozambiquehe.re/maprotation"
class ApexApiHandler{
    constructor(token){
        this.token = token
        this.info = {}
        setInterval(this.update.bind(this), 3000)
    }
    update(){
        this.getMapInfo().then((response)=>{
            if(! response.data || response.data.length === 0)
                return
            this.info = response.data
        })
    }
    getMapInfo(){
        // APEX_API_URL?auth=token
        return this.get(APEX_API_URL, {auth: this.token})
    }
    async get(url, params){
        try {
            return await axios.get(url, {
                params: params
            })
        } catch (e) {
        }
    }
}
module.exports = ApexApiHandler;