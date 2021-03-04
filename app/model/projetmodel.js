class ProjetModel{
    constructor(){
        this.api = new ProjetApi()
    }

    insert(projet){
        return this.api.insert(projet)
    }

    update(projet,id){
        return this.api.update(projet)
    }

    async getAll(){
        let projets = []
        for(let projet of await this.api.getAll()){
            projets.push(Object.assign(new Project(),projet))
        }
        return projets
    }

    async getProject(id){
        try{
            const projet = Object.assign(new Project(), await this.api.getById(id))
            return projet
        }catch(e){
            if(e === 404) return null
            return undefined
        }
    }
}