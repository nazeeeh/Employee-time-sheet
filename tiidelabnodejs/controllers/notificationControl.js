let notificationControl = module.exports = (app) => {
    let connection = require('../modules/db')

    console.log('notifications connected')

    // create notification
    logNotification = (notification, res) => {
        connection.query(`INSERT INTO notification (staffID, heading, body) 
        VALUES ('${notification.staffID}', '${notification.heading}', '${notification.body}')`
        , (err, resp) => {
            if(err){
                return new error
            }

            if(resp){
                res.statusCode = 401
                res.send('updated')
            }
        })
    }

    // get notifications
    app.get('pace-time-sheet/companyName/notifications', (req, res) => {
        connection.query(`select * from notifications`, (err, resp) => {
            if(err) throw err
            res.send(resp)
        })
    })
}