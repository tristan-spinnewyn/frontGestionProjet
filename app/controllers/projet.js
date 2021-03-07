class ProjetController extends BaseFormController {
    constructor() {
        super(true)
        this.projetModel = new ProjetModel()
        this.userModel = new UserModel()
        this.jalonModel = new JalonModel()
        this.typeExigenceModel = new TypeExigenceModel()
        this.exigenceController = new ExigenceController()
        this.jalonController = new JalonController()
        if(indexController.selectedProjet) {
            this.projet = indexController.selectedProjet
            indexController.selectedProjet = null
        }
        this.selectedJalon = null;
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

    async initJalon(){
        let content = ""
        try{
            for(const jalon of await this.projetModel.getAllJalon(this.projet.id)){
                let user = await this.userModel.getById(jalon.userId)
                let dateLivPrev = new Date(jalon.dateLivPrev)
                let dateLivReel;
                let show;
                if(jalon.dateLivReel != null){
                    dateLivReel = new Date(jalon.dateLivReel).toLocaleDateString('fr-FR')
                    show = "none"
                }else{
                    dateLivReel = "Non livré"
                    show="block"
                }
                content += `<tr>
                <td><a onclick="projetController.seeJalon(${jalon.id})">${jalon.jalonName}</a></td>
                <td>${dateLivPrev.toLocaleDateString('fr-FR')}</td>
                <td>${dateLivReel}</td>
                <td>${user.trigramme}</td>
                <td>${jalon.pourcentageFinish}</td>
                <td>
                    <a class="waves-effect waves-light btn" onclick="projetController.jalonController.openModalUpdate(${jalon.id})">Modifier</a>
                    <a class="waves-effect waves-light btn" style="display:${show}" onclick="projetController.jalonController.livraisonJalon(${jalon.id})">marqué comme livré</a>
                </td></tr>`
            }
            $("#contentTableListJalon").innerHTML = content
        }catch(err){
            console.log(err)
            this.displayServiceError()
        }
    }

    async seeJalon(id){
        try {
            const object = await this.jalonModel.getById(id)
            if (object === undefined) {
                this.displayServiceError()
                return
            }
            if (object === null) {
                this.displayNotFoundError()
                return
            }
            this.selectedJalon = object
            navigate("frontjalon")
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
}

window.projetController = new ProjetController()