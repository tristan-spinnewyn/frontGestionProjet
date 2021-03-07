class FrontJalonController extends BaseFormController{
    constructor(){
        super(true)
        this.jalonModel = new JalonModel()
        this.userModel = new UserModel()
        this.taskModel = new TaskModel()
        this.taskController = new TaskController()
        this.jalon = null;
        if(window.projetController.selectedJalon) {
            this.jalon = projetController.selectedJalon
            projetController.selectedJalon = null
        }
        this.initTask();
    }

    async initTask(){
        let content = ""
        try{
            for(const task of await this.jalonModel.getAllTask(this.jalon.id)){
                let taskDepend = "";
                let start= 0;
                if(task.taskIdDepend != null){
                    let depend = await this.taskModel.getById(task.taskIdDepend)
                    taskDepend = depend.nameTask
                }
                let DateStartTaskPrev = new Date(task.dateStartTaskPrev)
                let DateEndTask
                let dateLivReel;
                let showStart;
                let showEnd;
                if(task.DateStartTaskReal != null){
                    dateLivReel = new Date(task.DateStartTaskReal).toLocaleDateString('fr-FR')
                    showStart = "none"
                    start = "50%"
                }else{
                    dateLivReel = "Non commencé"
                    showStart="block"
                }
                if(task.DateEndTask != null){
                    DateEndTask = new Date(task.DateEndTask).toLocaleDateString('fr-FR')
                    showEnd = "none"
                    start = "100%"
                }else{
                    DateEndTask = "Non terminé"
                    showEnd="block"
                }
                content += `<tr>
                <td><a onclick="frontJalon.taskController.openModalUpdate(${task.id})">${task.nameTask}</a></td>
                <td>${task.nbDays}</td>
                <td>${DateStartTaskPrev.toLocaleDateString('fr-FR')}</td>
                <td>${dateLivReel}</td>
                <td>${DateEndTask}</td>
                <td>${taskDepend}</td>
                <td>${start}</td>
                <td>
                    <a class="waves-effect waves-light btn" onclick="frontJalon.taskController.openModalUpdate(${task.id})">Modifier</a>
                    <a class="waves-effect waves-light btn" style="display:${showStart}" onclick="">Commencé</a>
                    <a class="waves-effect waves-light btn" style="display:${showEnd}" onclick="">Terminé</a>
                </td>`
            }
            $("#contentTableListTask").innerHTML = content
        }catch(err){
            console.log(err)
            this.displayServiceError()
        }
    }

}

window.frontJalon = new FrontJalonController()