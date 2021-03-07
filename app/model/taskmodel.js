class TaskModel{
    constructor(){
        this.api = new TaskApi()
    }

    insert(task){
        return this.api.insert(task)
    }

    update(task){
        return this.api.update(task)
    }

    async getById(id){
        try{
            const task = Object.assign(new Task(), await this.api.getById(id))
            return task
        }catch(e){
            if(e === 404) return null
            return undefined
        }
    }

    start(task){
        return this.api.start(task)
    }

    end(task){
        return this.api.end(task)
    }

    async getExigence(id){
        let exigences = []
        for(let exigence of await this.api.getExigence(id)){
            exigences.push(Object.assign(new TaskExigence(),exigence))
        }
        return exigences
    }
}