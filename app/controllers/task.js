class TaskController extends BaseFormController{
    constructor(){
        super(true)
        this.userModel = new UserModel()
        this.taskModel = new TaskModel()
        this.exigenceModel = new ExigenceModel()
        this.projetModel = new ProjetModel()
        this.taskExigenceModel = new TaskExigenceModel()
        this.task = null;
    }

    async openModalAjout(){
        this.task = null;
        $("#lstExigContent").style.display = "none"
        $("#buttonAddTask").innerHTML = "Ajouter"
        $("#titleAddTask").innerHTML = "Ajouter une tache"
        $("#isDepend").style.display = "none"
        $("#formAddTask").reset()
        await this.getUsers()
        await this.getTask()
        super.getModal("#modalAddTask").open()
    }

    async openModalUpdate(id){
        await this.openModalAjout()
        await this.initExigence()
        await this.getExigencesLst(id)
        $("#lstExigContent").style.display = "block"
        this.task = await this.taskModel.getById(id)
        $("#buttonAddTask").innerHTML = "Modifier"
        $("#titleAddTask").innerHTML = "Modification de la tache"
        $("#nameTask").value = this.task.nameTask
        $("#lstUserTask").value  = this.task.userId
        M.FormSelect.init($("#lstUserTask"))
        var options = {
            defaultDate:new Date(this.task.dateStartTaskPrev),
            setDefaultDate: true
          };
        M.Datepicker.init($("#dateStartTaskPrev"),options)
        $("#nbDays").value = this.task.nbDays
        $("#desc_task_field").value = this.task.descTask
        $("#task-"+this.task.id).remove()
        if(this.task.taskIdDepend != null){
            $("#checkDepend").checked = true
            $("#lstTask").value = this.task.taskIdDepend
            $("#isDepend").style.display = "block"
        }
        M.FormSelect.init($("#lstTask"));

    }

    async getExigencesLst(id){
        let content = ""
        try{
            for(const exigenceTask of await this.taskModel.getExigence(id)){
                let exigence = await this.exigenceModel.getById(exigenceTask.exigenceId)
                if($("#exigence-"+exigence.id)){
                    $("#exigence-"+exigence.id).remove()
                }
                content += `<tr><td>${exigence.descExigence}</td><td><a class="waves-effect waves-light btn" onclick="frontJalon.taskController.deleteExigence(${exigence.id})">Supprimer</a></td></td>`
            }
            $("#tableLstExigContent").innerHTML = content
            M.FormSelect.init($("#lstExig"));
        }catch(err){
            console.log(err)
            this.displayServiceError()
        }
    }

    async initExigence(){
        let content = "<option value='' disabled selected>Sélectionner l'exigence</option>"
        try{
            for(const exigence of await this.projetModel.getAllExigence(projetController.projet.id)){
                content += `<option id="exigence-${exigence.id}" value="${exigence.id}">${exigence.descExigence}</option>`
            }
            $("#lstExig").innerHTML = content
            M.FormSelect.init($("#lstExig"));
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
            $("#lstUserTask").innerHTML = content
            M.FormSelect.init($("#lstUserTask"));
        }catch(err){
            console.log(err)
            this.displayServiceError()
        }
    }

    async getTask(){
        let content = "<option value='' disabled selected>Sélectionner la tache dépendante</option>"
        try{
            for(const task of await frontJalon.jalonModel.getAllTask(frontJalon.jalon.id)){
                content += `<option id="task-${task.id}" value="${task.id}">${task.nameTask}</option>`
            }
            $("#lstTask").innerHTML = content
            M.FormSelect.init($("#lstTask"));
        }catch(err){
            console.log(err)
            this.displayServiceError()
        }
    }

    async addTask(){
        let nameTask = this.validateRequiredField("#nameTask","Nom du jalon")
        let userId = this.validateRequiredField("#lstUserTask","l'utilisateur chargé de la tache")
        let datePrev = this.validateRequiredField("#dateStartTaskPrev","la date de début")
        let nbDays = this.validateRequiredField("#nbDays","le nombre de jour")
        let descTask = this.validateRequiredField("#desc_task_field")
        let taskId = null
        if($("#checkDepend").checked){
            taskId = $("#lstTask").value
            console.log(taskId)
        }
        let result= false;
        if(nameTask != null && userId != null && datePrev != null && nbDays != null && descTask != null){
            try{
                if(this.task == null){
                    let msg = await this.taskModel.insert(new Task(nameTask,descTask,nbDays,datePrev,null,null,frontJalon.jalon.id,userId,taskId))
                    if(msg.message == "Insertion effectué"){
                        this.toast("La tache a été enregistrer")
                        result = true
                    }
                }else{
                    this.task.nameTask = nameTask
                    this.task.userId = userId
                    this.task.dateStartTaskPrev = datePrev
                    this.task.nbDays = nbDays
                    this.task.taskIdDepend = taskId
                    this.task.descTask = descTask
                    let msg = await this.taskModel.update(this.task)
                    if(msg.message == "Modification effectué"){
                        this.toast("La tache a été modifié")
                        result = true
                    }
                }
                if(result)
                {
                    super.getModal("#modalAddTask").close()
                    $("#isDepend").style.display = "none"
                    frontJalon.initTask()
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

    verifDepend(element){
        if(element.checked){
            $("#isDepend").style.display = "block"
        }else{
            $("#isDepend").style.display = "none"
        }
    }

    async endTask(id){
        this.task = await this.taskModel.getById(id)
        if(confirm("Cette tache sera marqué comme fini, êtes vous sur ?")){
            try{
                let msg = await this.taskModel.end(this.task)
                if(msg.message == "Tache fini"){
                    this.toast(msg.message)
                }else{
                    this.toast("une erreur est survenue")
                }
                frontJalon.initTask()
            }catch(err){
                console.log(err)
                if(err === 401){
                    this.toast("Veuillez vérifier que la tâche a bien une date de démarrage")
                }else{
                    this.displayServiceError()
                }
                
            }
        }
    }

    async startTask(id){
        this.task = await this.taskModel.getById(id)
        if(confirm("Cette tache va commencer, êtes vous sur ?")){
            try{
                let msg = await this.taskModel.start(this.task)
                if(msg.message == "Tache commencé"){
                    this.toast(msg.message)
                }
                frontJalon.initTask()
            }catch(err){
                console.log(err)
                if(err === 401){
                    this.toast("Veuillez vérifier que la tâche précédente est bien terminé")
                }else{
                    this.displayServiceError()
                }
                
            }
        }
    }

    async addExigence(){
        if($("#lstExig").value != null)
        {
            let msg = await this.taskExigenceModel.insert(new TaskExigence(this.task.id,$("#lstExig").value))
            if(msg.message == "Insertion effectué"){
                this.toast("L'exigence a été ajouté a la tache")
                this.getExigencesLst(this.task.id)
            }else{
                this.toast("Une erreur est survenu")
            }
        }else{
            this.toast("Veuillez sélectionner une exigence")
        }
        
    }

    async deleteExigence(id){
        if(confirm("Voulez vous vraiment supprimer cette exigence ?")){
            let msg = await this.taskExigenceModel.delete(new TaskExigence(this.task.id,id))
            if(msg.message == "Suppression effectué"){
                this.toast("L'exigence a été supprimé de la tache")
                this.initExigence()
                this.getExigencesLst(this.task.id)
            }else{
                this.toast("Une erreur est survenu")
            }
        }
    }
}