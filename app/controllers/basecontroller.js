class BaseController {
    constructor(secured) {
        if(secured){this.checkAuthentication()}
        M.AutoInit();
        this.setBackButtonView('index')
        this.model = new Model()
    }
    toast(msg) {
        M.toast({html: msg, classes: 'rounded'})
    }
    displayServiceError() {
        this.toast('Service injoignable ou problème réseau')
    }
    getModal(selector) {
        return M.Modal.getInstance($(selector))
    }
    setBackButtonView(view) {
        window.onpopstate = function() {
            navigate(view)
        }; history.pushState({}, '');
    }
    checkAuthentication(){
        if(sessionStorage.getItem('token') === null){
            window.location.replace("login.html")
        }
    }
    displayUnauthaurizedError() {
        this.toast('Vous n\'avez pas les droits pour effectuer cette action. ')
    }
    displayChief(element){
        if(sessionStorage.getItem("roleId") != 1){
            element.style.display = 'none'
        }
    }
    initSelect(selector){
        M.FormSelect.init($(selector));
    }
}
