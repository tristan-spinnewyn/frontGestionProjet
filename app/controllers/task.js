class TaskController extends BaseFormController{
    constructor(){
        super(true)
        this.userModel = new UserModel()
        this.taskModel = new TaskModel()
        this.task = null;
    }

    async openModalAjout(){
        this.task = null;
        $("#buttonAddTask").innerHTML = "Ajouter"
        $("#titleAddTask").innerHTML = "Ajouter une tache"
        $("#formAddTask").reset()
        await this.getUsers()
        await this.getTask()
        super.getModal("#modalAddTask").open()
    }

    async openModalUpdate(id){
        await this.openModalAjout()
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
        console.log(this.task.taskIdDepend)
        if(this.task.taskIdDepend != null){
            $("#checkDepend").checked = true
            $("#lstTask").value = this.task.taskIdDepend
        }
        M.FormSelect.init($("#lstTask"));
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
                        this.toast("Le jalon a été modifié")
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
}