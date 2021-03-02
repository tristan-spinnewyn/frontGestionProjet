class LoginController extends BaseFormController{
    constructor(){
        super(false)
        this.svc = new UserApi()
    }

    async auth(){
        let login = this.validateRequiredField('#fieldLogin','Adresse e-mail')
        let password = this.validateRequiredField('#fieldPassword','Mot de passe')
        if(login != null && password != null){
            this.svc.authenticate(login,password)
                .then(res=>{
                    console.log(res)
                    sessionStorage.setItem("token",res.token)
                    sessionStorage.setItem("roleId",res.roleUserId)
                    window.location.replace("index.html")
                })
                .catch(err =>{
                    console.log(err)
                    if(err == 401){
                        this.toast("adresse e-mail ou mot de passe incorrect")
                    }else{
                        this.displayServiceError()
                    }
                })
        }
    }
}

window.loginController = new LoginController()