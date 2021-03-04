class ProjetController extends BaseFormController {
    constructor() {
        super(true)
        this.projetModel = new ProjetModel()
        this.userModel = new UserModel()
        this.typeExigenceModel = new TypeExigenceModel()
        this.exigenceController = new ExigenceController()
        if(indexController.selectedProjet) {
            this.projet = indexController.selectedProjet
            indexController.selectedProjet = null
        }
        $("#titleProject").innerHTML = this.projet.nameProject
        this.initExigence()
    }

    async initExigence(){
        let content = ""
        try{
            for(const exigence of await this.projetModel.getAllExigence(this.projet.id)){
                let fonction = ""
                if(exigence.isFonctionnel){
                    fonction = "oui"
                }else{
                    let typeExigence = await this.typeExigenceModel.getById(exigence.typeExigenceId)
                    fonction = `non (porte sur ${typeExigence.nameExigence})`
                }
                content += `<tr><td><a onclick="projetController.exigenceController.openModalUpdate(${exigence.id})">${exigence.descExigence}</a></td><td>${fonction}</td><td><a>Modifier</a></td></tr>`
            }
            $("#contentTableListExigence").innerHTML = content
        }catch(err){
            console.log(err)
            this.displayServiceError()
        }
    }
}

window.projetController = new ProjetController()