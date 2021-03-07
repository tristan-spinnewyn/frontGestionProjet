class TaskExigenceApi extends BaseApiService{
    constructor(){
        super("taskexigence")
    }

    insert(taskexigence){
        this.headers.set('Content-Type','application/json')
        return new Promise((resolve,reject) => fetch(this.url,{
            method:'POST',
            headers:this.headers,
            body:JSON.stringify(taskexigence)
        }).then(res=>{
            if(res.status === 200){
                resolve(res.json())
            }else{
                reject(res.status)
            }
        }).catch(err=>reject(err)))
    }

    delete(exigence){
        this.headers.set('Content-Type','application/json')
        return new Promise((resolve,reject) => fetch(this.url,{
            method:'DELETE',
            headers:this.headers,
            body:JSON.stringify(exigence)
        }).then(res=>{
            if(res.status === 200){
                resolve(res.json())
            }else{
                reject(res.status)
            }
        }).catch(err=>reject(err)))
    }
}