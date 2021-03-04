class ExigenceModel{
    constructor(){
        this.api = new ExigenceApi()
    }

    insert(exigence){
        return this.api.insert(exigence)
    }

    update(exigence,id){
        return this.api.update(exigence)
    }

    async getById(id){
        try{
            const exigence = Object.assign(new Exigence(), await this.api.getById(id))
            return exigence
        }catch(e){
            if(e === 404) return null
            return undefined
        }
    }
}