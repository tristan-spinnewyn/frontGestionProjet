class IndexController extends BaseFormController {
    constructor() {
        super(true)
        this.projetModel = new ProjetModel()
        this.userModel = new UserModel()
        this.initProjet()
        this.displayChief($("#buttonAddProject"))
        this.project;
    }

    async openModalAjout(){
        $("#buttonAdd").innerHTML = "Ajouter"
        $("#titleAdd").innerHTML = "Ajouter un projet"
        this.project = null;
        $("#formAddProject").reset()
        await this.getUsers()
        super.getModal("#modalAddProject").open()
    }

    async openModalUpdate(id){
        await this.openModalAjout()
        $("#buttonAdd").innerHTML = "Modifier"
        this.project = await this.projetModel.getProject(id)
        $("#titleAdd").innerHTML = `Modifier le projet: ${this.project.nameProject}`
        $("#project_name_field").value = this.project.nameProject
        $("#lstUser").value  = this.project.userId
        M.FormSelect.init($("#lstUser"))
    }

   async initProjet(){
        let content = ""
        try{
            for(const projet of await this.projetModel.getAll()){
                let userName = "Non défini"
                if(projet.userId != null){
                    let user = await this.userModel.getById(projet.userId)
                    userName = user.trigramme
                }
                
                content += `<tr><td><a onclick="indexController.seeProject(${projet.id})">${projet.nameProject}</a></td><td>${userName}</td><td><a id="buttonUpdateProject" onclick="indexController.openModalUpdate(${projet.id})">Modifier</a></td></tr>`
            }
            $("#contentTableListProject").innerHTML = content
            this.displayChief($("#buttonUpdateProject"))
        }catch(err){
            console.log(err)
            this.displayServiceError()
        }
    }

    async getUsers(){
        let content = "<option value='' disabled selected>Sélectionner le charger de projet</option>"
        try{
            for(const user of await this.userModel.getAll()){
                content += `<option value="${user.id}">${user.trigramme}</option>`
            }
            $("#lstUser").innerHTML = content
            M.FormSelect.init($("#lstUser"));
        }catch(err){
            console.log(err)
            this.displayServiceError()
        }
    }

    async addProject(){
        let projectName = this.validateRequiredField("#project_name_field","nom du projet")
        let userId = null
        let result = false
        if($("#lstUser").value != null || $("#lstUser").value != ""){
            userId = $("#lstUser").value
        }
        if(projectName != null){
            try{
                if(this.project == null){
                    let msg = await this.projetModel.insert(new Project(projectName,userId))
                    if(msg.message == "Insertion effectué"){
                        this.toast("Le projet a été enregistrer")
                        result = true
                    }
                }else{
                    this.project.nameProject = projectName
                    this.project.userId = userId
                    let msg = await this.projetModel.update(this.project)
                    if(msg.message == "Modification effectué"){
                        this.toast("Le projet a été modifié")
                        result = true
                    }
                }
                if(result)
                {
                    super.getModal("#modalAddProject").close()
                    this.initProjet()
                }
            }catch(err){
            console.log(err)
                if(err === 401){
                    this.displayUnauthaurizedError()
                }
                this.displayServiceError()
            }
        }
    }

    async seeProject(id){
        try {
            const object = await this.projetModel.getProject(id)
            if (object === undefined) {
                this.displayServiceError()
                return
            }
            if (object === null) {
                this.displayNotFoundError()
                return
            }
            this.selectedProjet = object
            navigate("projet")
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
}

window.indexController = new IndexController()
