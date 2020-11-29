const { response, request } = require('express')

let userController = (app) =>{
    // require npm packages
    let bcrypt = require('bcrypt')
    // exported modules
    let connection = require('../modules/db')

    console.log('users connected')

    // sign up Company(post company)
    app.post('/pace-time-sheet/signUp', (req, res) => {
        if(!req.body.email || !req.body.password){
            res.send('User must enter email and password')
        }

        if(/^[a-zA-Z0-9_]{8,16}$/.test(req.body.password)){
            // hash password
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                // handle error
                if(err) throw(err)
                // handle success
                if (hash){
                    // add user/company into database
                    connection.query(`INSERT INTO company (companyName, password, email, companyType)
                    VALUES ('${req.body.companyName}', '${hash}', '${req.body.email}', '${req.body.companyType}')`, 
                    (err, resp) => {
                        // handle error
                        if(err){
                            res.statusCode = 401
                            res.end()
                        }
                        // handle success
                        // Create admin user, add details to staff table
                        if(resp){ 
                            connection.query(`INSERT INTO staff (companyID, password, email, roleID)
                            VALUES (@@IDENTITY, '${hash}', '${req.body.email}', '1')`, (err, resp) => {
                                if(err){
                                    res.statusCode = 401
                                    res.send(err)
                                }

                                if(resp){
                                    res.send("User company has been created")

                                }
                            })
                        }
                    })
                }
            })
        }else{
            res.send('Password must have at least 8 letters')
        }
    })

    // sign up User fromAdmin
    app.post('/pace-time-sheet/newEmployeeSignUP', (req, res) => {
        if(!req.body.email || !req.body.password || !req.body.roleID || !req.body.companyID || !req.body.expectedWorkHours || !req.body.billRateCharge || !req.body.staffRole){
            res.send('All starred fields must be complete')
        }
        // hash password
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            // handle error
            if(err) throw(err)
            // handle success
            if(hash){
                connection.query(`INSERT INTO staff (password, userName, companyID, email, roleID, expectedWorkHours, billRateCharge, staffRole)
                VALUES ('${hash}', '${req.body.userName}', '${req.body.companyID}', '${req.body.email}', '${req.body.roleID}', '${req.body.expectedWorkHours}', '${req.body.billRateCharge}', '${req.body.staffRole}')`, (err, resp) =>{
                    if(err){
                        res.statusCode = 401
                        res.send(err)
                    }

                    if(resp){
                        res.send("User has been created")

                    }
                })
            }
        })
    })

    // **********************************************************************************************************
    // ******************************************* LOGIN USERS **************************************************

    // login user
    app.post('/pace-time-sheet/login', (req, res) => {
        connection.query(`select * from staff where email = ('${req.body.email}')`, (err, resp) => {
            if(err){
                res.statusCode = 401
                res.send("invalid user details")
                res.end()
            }

            if(resp){
                bcrypt.compare(req.body.password, resp[0].password, (hashErr, response) => {
                    if(hashErr){
                        res.send('password incorrect')
                    }

                    if(response){
                        delete resp[0].password
                        res.send(resp[0])
                        res.end()
                    }
                    res.send(resp[0])
                })
            }
        })
    })

    // **********************************************************************************************************
    // ******************************************* READ TABLES **************************************************

    // read company
    app.get('/pace-time-sheet/database', (req, res) => {
        connection.query('select * from company', (err, resp) => {
            if(err) throw err
            res.send(resp)
        })
    })

    // read user
    app.get('/pace-time-sheet/database/staff', (req, res) => {
        connection.query('select * from staff', (err, resp) => {
            if(err) throw err
            res.send(resp)
        })
    })

    // **********************************************************************************************************
    // ******************************************* UPDATE TABLES **************************************************

    // update company details

    // update user details
    app.put('/pace-time-sheet/companyName/employeeSettings', (req, res) => {
        connection.query(`UPDATE users SET firstName = '${req.body.firstName}', lastName='${req.body.lastName}', phoneNumber =  '${req.body.phoneNumber}', address = '${req.body.address}', password = '${req.body.password}', userName = '${req.body.userName}', address = '${req.body.address} WHERE userId = ${req.params.id}`, (err, resp) => {
            if(err){
                res.statusCode = 401
                res.send(err)
            }

            if(resp){
                res.send('User details have been updated')
            }
        })
    })
    // delete company
    // delete user
}


module.exports = userController
