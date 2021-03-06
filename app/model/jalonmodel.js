class JalonModel{
    constructor(){
        this.api = new JalonApi()
    }

    insert(jalon){
        return this.api.insert(jalon)
    }

    update(jalon){
        return this.api.update(jalon)
    }

    async getById(id){
        try{
            const jalon = Object.assign(new Jalon(), await this.api.getById(id))
            return jalon
        }catch(e){
            if(e === 404) return null
            return undefined
        }
    }

    async livraison(jalon){
        return this.api.livraison(jalon)
    }
}