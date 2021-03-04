class TypeExigenceModel{
    constructor(){
        this.api = new TypeExigenceApi()
    }

    
    async getAll(){
        let typeExigences = []
        for(let typeExigence of await this.api.getAll()){
            typeExigences.push(Object.assign(new TypeExigence(),typeExigence))
        }
        return typeExigences
    }

    async getById(id){
        try{
            const typeExigence = Object.assign(new TypeExigence(), await this.api.getById(id))
            return typeExigence
        }catch(e){
            if(e === 404) return null
            return undefined
        }
    }
}