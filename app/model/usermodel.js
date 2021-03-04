class UserModel{
    constructor(){
        this.api = new UserApi()
    }

    async getAll(){
        let users = []
        for(let user of await this.api.getAll()){
            users.push(Object.assign(new User(),user))
        }
        return users
    }

    async getById(id){
        try{
            const user = Object.assign(new User(), await this.api.getById(id))
            return user
        }catch(e){
            if(e === 404) return null
            return undefined
        }
        
    }
}