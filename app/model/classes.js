class User{
    constructor(trigramme,firstname,lastname,email,roleUserId,token){
        this.trigramme = trigramme
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.roleUserId = roleUserId
        this.token =token
    }
}

class Project{
    constructor(nameProject,userId){
        this.nameProject =nameProject
        this.userId = userId
    }
}

class TypeExigence{
    constructor(nameExigence){
        this.nameExigence = nameExigence
    }
}

class Exigence{
    constructor(descExigence,isFonctionnel,projectId,typeExigenceId){
        this.descExigence =descExigence
        this.isFonctionnel = isFonctionnel
        this.projectId = projectId
        this.typeExigenceId = typeExigenceId
    }
}

class RoleUser{
    constructor(nameRole){
        this.nameRole = nameRole
    }
}

class Jalon{
    constructor(dateLivPrev,dateLivReel,jalonName,projectId,userId,pourcentageFinish){
        this.dateLivPrev = dateLivPrev
        this.dateLivReel = dateLivReel
        this.jalonName = jalonName
        this.projectId = projectId
        this.userId = userId
        this.pourcentageFinish = pourcentageFinish
    }
}

class Task{
    constructor(nameTask,descTask,nbDays,dateStartTaskPrev,dateStartTaskReal,dateEndTask,jalonId,userId,taskIdDepend){
        this.nameTask = nameTask
        this.descTask = descTask
        this.nbDays = nbDays
        this.dateStartTaskPrev = dateStartTaskPrev
        this.dateStartTaskReal = dateStartTaskReal
        this.dateEndTask = dateEndTask
        this.jalonId = jalonId
        this.userId = userId
        this.taskIdDepend = taskIdDepend
    }
}

class TaskExigence{
    constructor(taskId,exigenceId){
        this.taskId = taskId
        this.exigenceId = exigenceId
    }
}