const serviceBaseUrl = "https://localhost:44365/api/"

class BaseApiService{
    constructor(url){
        this.url = `${serviceBaseUrl}${url}`
        this.token = sessionStorage.getItem("token")
        this.headers = new Headers()
        if(this.token !== undefined){
            this.headers.append("Authorization", `Bearer ${this.token}`)
        }
        this.urlAuth = `${serviceBaseUrl}jwt`
    }
}