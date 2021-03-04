class UserApi extends BaseApiService{
    constructor(){
        super("user")
    }

    authenticate(login,password){
        this.headers.set('Content-Type','application/json')
        let dataToSend = JSON.stringify({"email":login,"password":password});
        return new Promise((resolve,reject)=> fetch(this.urlAuth,{
            method:'POST',
            headers: this.headers,
            body :dataToSend
        }).then(res=>{
            if(res.status === 200){
                resolve(res.json())
            }
            else{
                reject(res.status)
            }
        }).catch(err => reject(err)))
    }

    getAll(){
        return fetchJSON(this.url,this.token)
    }

    getById(id){
        return fetchJSON(`${this.url}/${id}`,this.token)
    }
}