class TypeExigenceApi extends BaseApiService{
    constructor(){
        super("typeexigence")
    }

    getById(id){
        return fetchJSON(`${this.url}/${id}`,this.token)
    }

    getAll(){
        return fetchJSON(`${this.url}`,this.token)
    }
}