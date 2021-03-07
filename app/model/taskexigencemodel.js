class TaskExigenceModel{
    constructor(){
        this.api = new TaskExigenceApi()
    }

    insert(taskExigence){
        return this.api.insert(taskExigence)
    }

    delete(taskExigence){
        return this.api.delete(taskExigence)
    }
}