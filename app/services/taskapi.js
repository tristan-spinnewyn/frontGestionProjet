class TaskApi extends BaseApiService{
    constructor(){
        super("task")
    }

    getById(id){
        return fetchJSON(`${this.url}/${id}`,this.token)
    }

    insert(task){
        this.headers.set('Content-Type','application/json')
        return new Promise((resolve,reject) => fetch(this.url,{
            method:'POST',
            headers:this.headers,
            body:JSON.stringify(task)
        }).then(res=>{
            if(res.status === 200){
                resolve(res.json())
            }else{
                reject(res.status)
            }
        }).catch(err=>reject(err)))
    }

    update(task){
        this.headers.set('Content-Type','application/json')
        return new Promise((resolve,reject) => fetch(this.url,{
            method:'PUT',
            headers:this.headers,
            body:JSON.stringify(task)
        }).then(res=>{
            if(res.status === 200){
                resolve(res.json())
            }else{
                reject(res.status)
            }
        }).catch(err=>reject(err)))
    }

    start(task){
        this.headers.set('Content-Type','application/json')
        return new Promise((resolve,reject) => fetch(`${this.url}/start`,{
            method:'PUT',
            headers:this.headers,
            body:JSON.stringify(task)
        }).then(res=>{
            if(res.status === 200){
                resolve(res.json())
            }else{
                reject(res.status)
            }
        }).catch(err=>reject(err)))
    }

    start(task){
        this.headers.set('Content-Type','application/json')
        return new Promise((resolve,reject) => fetch(`${this.url}/start`,{
            method:'PUT',
            headers:this.headers,
            body:JSON.stringify(task)
        }).then(res=>{
            if(res.status === 200){
                resolve(res.json())
            }else{
                reject(res.status)
            }
        }).catch(err=>reject(err)))
    }

    end(task){
        this.headers.set('Content-Type','application/json')
        return new Promise((resolve,reject) => fetch(`${this.url}/end`,{
            method:'PUT',
            headers:this.headers,
            body:JSON.stringify(task)
        }).then(res=>{
            if(res.status === 200){
                resolve(res.json())
            }else{
                reject(res.status)
            }
        }).catch(err=>reject(err)))
    }

    getExigence(id){
        return fetchJSON(`${this.url}/${id}/exigence`,this.token)
    }
}
