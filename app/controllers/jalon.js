class JalonController extends BaseFormController{
    constructor(){
        super(false)
        this.jalonModel = new JalonModel()
        this.userModel = new UserModel()
        this.jalon = null;
    }

    async openModalAjout(){
        this.jalon = null;
        $("#buttonAddJalon").innerHTML = "Ajouter"
        $("#titleAddJalon").innerHTML = "Ajouter un jalon"
        $("#formAddJalon").reset()
        await this.getUsers()
        super.getModal("#modalAddJalon").open()
    }

    async openModalUpdate(id){
        await this.openModalAjout()
        this.jalon = await this.jalonModel.getById(id)
        $("#buttonAddJalon").innerHTML = "Modifier"
        $("#titleAddJalon").innerHTML = "Modification de l'exigence"
        $("#jalon_name_field").value = this.jalon.jalonName
        $("#lstUserJalon").value  = this.jalon.userId
        M.FormSelect.init($("#lstUserJalon"))
    }

    async addJalon(){
        let jalonName = this.validateRequiredField("#jalon_name_field","Nom du jalon")
        let userId = this.validateRequiredField("#lstUserJalon","l'utilisateur chargé du jalon")
        let result= false;
        if(jalonName != null && userId != null){
            try{
                if(this.jalon == null){
                    let msg = await this.jalonModel.insert(new Jalon(null,null,jalonName,projetController.projet.id,userId,0))
                    if(msg.message == "Insertion effectué"){
                        this.toast("Le jalon a été enregistrer")
                        result = true
                    }
                }else{
                    this.jalon.jalonName = jalonName
                    this.jalon.userId = userId
                    let msg = await this.jalonModel.update(this.jalon)
                    if(msg.message == "Modification effectué"){
                        this.toast("Le jalon a été modifié")
                        result = true
                    }
                }
                if(result)
                {
                    super.getModal("#modalAddJalon").close()
                    projetController.initJalon()
                }
            }catch(err){
                console.log(err)
                if(err === 401){
                    this.displayUnauthaurizedError()
                }
                this.displayServiceError
            }
        }
    }

    async getUsers(){
        let content = "<option value='' disabled selected>Sélectionner le charger de projet</option>"
        try{
            for(const user of await this.userModel.getAll()){
                content += `<option value="${user.id}">${user.trigramme}</option>`
            }
            $("#lstUserJalon").innerHTML = content
            M.FormSelect.init($("#lstUserJalon"));
        }catch(err){
            console.log(err)
            this.displayServiceError()
        }
    }

    async livraisonJalon(id){
        this.jalon = await this.jalonModel.getById(id)
        if(confirm("Ce jalon sera marqué comme livré, êtes vous sur ?")){
            try{
                let msg = await this.jalonModel.livraison(this.jalon)
                if(msg.message == "Livraison effectué"){
                    this.toast(msg.message)
                }else{
                    this.toast("une erreur est survenue")
                }
                projetController.initJalon()
            }catch(err){
                console.log(err)
                if(err === 401){
                    this.displayUnauthaurizedError()
                }
                this.displayServiceError
            }
        }
    }
}