let taskControl = (app) => {
    let connection = require('../modules/db')
    let notification = require('./notificationControl')

    notification(app)

    console.log('Task connected')

    // create task
    app.post('/pace-time-sheet/companyName/createNewTask', (req, res) => {
        connection.query(`INSERT INTO task
        (taskName, assignedID, documentsAttached, taskStatus, taskDescription, staffID, startDate, endDate)
        VALUES
        ('${req.body.taskName}', '${req.body.assignedID}','${req.body.documentsAttached}',
        '1', '${req.body.taskDescription}', '${req.body.staffID}', 
        '${req.body.startDate}', '${req.body.endDate}')
        `, (err, resp) => {
            if(err){
                res.statusCode = 401
                res.send(err)
            }

            if(resp){
                let notified = {
                    'staffID' : req.body.staffID,
                    'heading' : 'New Task',
                    'body' :  req.body.taskName,
                    'status' : 'false'
                }
                logNotification(notified, res)
                connection.query(`INSERT INTO usertask 
                (staffID, employerID, taskName, taskDescription,
                documentsAttached, taskStatus, startDate, endDate) 
                VALUES ('${req.body.assignedID}', '${req.body.staffID}', 
                '${req.body.taskName}', '${req.body.taskDescription}', 
                '${req.body.documentsAttached}', '1', '${req.body.startDate}', 
                '${req.body.endDate}')`, (taskErr, resp) => {
                    if(taskErr){
                        res.statusCode = 401
                        res.send(taskErr)
                    }

                    if(resp){
                        res.send('task created')
                    }
                })
            }
        })
    })

    // read task by ID
    app.get('/pace-time-sheet/companyName/allTask/:id', (req, res) => {
        connection.query(`select* 
        from task where staffID = ${req.params.id}`, (err, resp) => {
            if(err){
                res.send(err)
            }
            res.send(resp)
        })
    })

    // read assigned tasks by ID
    app.get('/pace-time-sheet/companyName/assignedTasks/:id', (req, res) => {
        connection.query(`select* 
        from usertask where staffID = ${req.params.id}`, (err, resp) => {
            if(err){
                res.send(err)
            }
            res.send(resp)
        })
    })

    // read task by status
    app.get('/pace-time-sheet/companyName/pendingTasks/:id', (req, res) => {
        connection.query(`select* 
        from usertask
        JOIN status 
        ON status.statusID = task.statusID`, (err, resp) => {
            if(err){
                res.send(err)
            }
            res.send(resp)
        })
    })

    // read task
    // update task
    // Delete task
}

module.exports = taskControl