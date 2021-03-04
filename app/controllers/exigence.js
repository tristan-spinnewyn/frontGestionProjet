class ExigenceController extends BaseFormController{
    constructor(){
        super(false)
        this.exigenceModel = new ExigenceModel()
        this.typeExigenceModel = new TypeExigenceModel()
        this.exigence = null;
    }

    async openModalAjout(){
        this.exigence = null;
        $("#buttonAddExigence").innerHTML = "Ajouter"
        $("#titleAddExigence").innerHTML = "Ajouter un projet"
        $("#formAddExigence").reset()
        await this.getExigence()
        super.getModal("#modalAddExigence").open()
    }

    async openModalUpdate(id){
        await this.openModalAjout()
        $("#buttonAddExigence").innerHTML = "Modifier"
        $("#titleAddExigence").innerHTML = "Modification de l'exigence"
        this.exigence = await this.exigenceModel.getById(id)
        $("#desc_exigence_field").value = this.exigence.descExigence
        if(!this.exigence.isFonctionnel){
            $("#checkIsFonctionnel").checked = true
            $("#lstTypeExigence").value = this.exigence.typeExigenceId
            M.FormSelect.init($("#lstTypeExigence"))
            $("#isntFonctionnel").style.display = "block"
        }else{
            $("#isntFonctionnel").style.display = "none"
        }
    }

    async addExigence(){
        let descExigence = this.validateRequiredField("#desc_exigence_field","Description de l'exigence");
        let isFonctionnel = true;
        let typeExigence = null;
        let result = false;
        //exigence non fonctionnel
        if($("#checkIsFonctionnel").checked){
            isFonctionnel = false
            typeExigence = $("#lstTypeExigence").value
            if(typeExigence == "" || typeExigence == null){
                this.toast("Veuillez sélectionner un type d'exigence")
                return;
            }
        }
        if(descExigence != null){
            try{
                if(this.exigence == null){
                    let msg = await this.exigenceModel.insert(new Exigence(descExigence,isFonctionnel,projetController.projet.id,typeExigence))
                    if(msg.message == "Insertion effectué"){
                        this.toast("L'exigence a été enregistrer")
                        result = true
                    }
                }else{
                    this.exigence.descExigence = descExigence
                    this.exigence.isFonctionnel = isFonctionnel
                    this.exigence.typeExigenceId = typeExigence
                    let msg = await this.exigenceModel.update(this.exigence)
                    if(msg.message == "Modification effectué"){
                        this.toast("L'exigence a été modifié")
                        result = true
                    }
                }
                if(result)
                {
                    super.getModal("#modalAddExigence").close()
                    projetController.initExigence()
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

    verifIsFonctionnel(element){
        if(element.checked){
            $("#isntFonctionnel").style.display = "block"
        }else{
            $("#isntFonctionnel").style.display = "none"
        }
    }

    async getExigence(){
        let content = "<option value='' disabled selected>Sélectionner le type d'exigence</option>"
        try{
            for(const typeExigence of await this.typeExigenceModel.getAll()){
                content += `<option value="${typeExigence.id}">${typeExigence.nameExigence}</option>`
            }
            $("#lstTypeExigence").innerHTML = content
            M.FormSelect.init($("#lstTypeExigence"));
        }catch(err){
            console.log(err)
            this.displayServiceError()
        }
    }


}