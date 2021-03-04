class ProjetApi extends BaseApiService{
    constructor(){
        super("project")
    }

    getAll(){
        return fetchJSON(this.url,this.token)
    }

    getById(id){
        return fetchJSON(`${this.url}/${id}`,this.token)
    }

    insert(projet){
        this.headers.set('Content-Type','application/json')
        return new Promise((resolve,reject) => fetch(this.url,{
            method:'POST',
            headers:this.headers,
            body:JSON.stringify(projet)
        }).then(res=>{
            if(res.status === 200){
                resolve(res.json())
            }else{
                reject(res.status)
            }
        }).catch(err=>reject(err)))
    }

    update(projet){
        this.headers.set('Content-Type','application/json')
        return new Promise((resolve,reject) => fetch(this.url,{
            method:'PUT',
            headers:this.headers,
            body:JSON.stringify(projet)
        }).then(res=>{
            if(res.status === 200){
                resolve(res.json())
            }else{
                reject(res.status)
            }
        }).catch(err=>reject(err)))
    }
}