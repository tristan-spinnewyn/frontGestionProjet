class JalonApi extends BaseApiService{
    constructor(){
        super("jalon")
    }

    getById(id){
        return fetchJSON(`${this.url}/${id}`,this.token)
    }

    insert(exigence){
        this.headers.set('Content-Type','application/json')
        return new Promise((resolve,reject) => fetch(this.url,{
            method:'POST',
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

    update(exigence){
        this.headers.set('Content-Type','application/json')
        return new Promise((resolve,reject) => fetch(this.url,{
            method:'PUT',
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