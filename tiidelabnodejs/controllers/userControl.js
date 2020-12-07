let userController = (app) =>{
    // require npm packages
    require('dotenv').config()
    const jwt = require('jsonwebtoken')
    const bcrypt = require('bcrypt')

    // exported modules
    let connection = require('../modules/db')
    const authenticateToken = require('../controllers/authentificate/authentification')

    console.log('users connected')

    // **********************************************************************************************************
    // *********************************************** SIGN UP **************************************************

    // sign up Company(post company)
    app.post('/pace-time-sheet/signUp', (req, res) => {
        if(!req.body.email || !req.body.password){
            res.send('User must enter email and password')
        }

        if(/^[a-zA-Z0-9_]{8,16}$/.test(req.body.password)){
            console.log(req.body.password)
            // hash password
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                // handle error
                if(err) throw(err)
                // handle success
                if (hash){
                    console.log(hash)
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
                            console.log(hash)
                            connection.query(`INSERT INTO staff (companyID, password, email, roleID, username)
                            VALUES (@@IDENTITY, '${hash}', '${req.body.email}', '1', '${req.body.email}')
                            `, (err, resp) => {
                                if(err){
                                    res.statusCode = 401
                                    res.send(err)
                                }

                                if(resp){
                                    connection.query(`INSERT INTO permissions (permitID, staffID, permitItemID) VALUES ('1', @@IDENTITY, '1'), 
                                    ('1', @@IDENTITY, '2'), ('1', @@IDENTITY, '5'), ('1', @@IDENTITY, '6'), 
                                    ('1', @@IDENTITY, '7'), ('1', @@IDENTITY, '8'), ('1', @@IDENTITY, '9'), 
                                    ('1', @@IDENTITY, '10'), ('1', @@IDENTITY, '11'), ('1', @@IDENTITY, '12'), 
                                    ('1', @@IDENTITY, '13'), ('1', @@IDENTITY, '14')`, (err, resp) => {
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
                }
            })
        }else{
            res.send('Password must have at least 8 letters')
        }
    })

    // sign up User fromAdmin
    app.post('/pace-time-sheet/newEmployeeSignUP', (req, res) => {
        permitDetails = req.respData.data.find(x => x.permitItem == 'Add user')
        if(!!permitDetails){
            if(permitDetails.permit = 'allowed'){
                if(!req.body.email || !req.body.password || !req.body.roleID || !req.body.companyID || !req.body.expectedWorkHours || !req.body.billRateCharge || !req.body.staffRole){
                    res.send('All starred fields must be complete')
                }
                // hash password
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    // handle error
                    if(err) throw(err)
                    // handle success
                    if(hash){
                        connection.query(`INSERT INTO staff (password, userName, companyID, email, 
                            roleID, expectedWorkHours, billRateCharge, staffRole)
                            VALUES ('${hash}', '${req.body.userName}', '${req.body.companyID}', 
                            '${req.body.email}', '${req.body.roleID}', '${req.body.expectedWorkHours}', 
                            '${req.body.billRateCharge}', '${req.body.staffRole}')`, 
                            (err, resp) =>{
                            if(err){
                                res.statusCode = 401
                                res.send(err)
                            }
        
                            if(resp){
                                if (req.body.roleID === '2'){
                                    // If user role is co-Admin (i.e roleID = 2)
                                    connection.query(`INSERT INTO permissions (permitID, staffID, permitItemID) VALUES ('2', @@IDENTITY, '1'), 
                                        ('1', @@IDENTITY, '2'), ('1', @@IDENTITY, '5'), ('1', @@IDENTITY, '6'), 
                                        ('1', @@IDENTITY, '7'), ('1', @@IDENTITY, '8'), ('2', @@IDENTITY, '9'), 
                                        ('1', @@IDENTITY, '10'), ('1', @@IDENTITY, '11'), ('1', @@IDENTITY, '12'), 
                                        ('1', @@IDENTITY, '13'), ('1', @@IDENTITY, '13')`, (err, resp) => {
                                        if(err){
                                            res.statusCode = 401
                                            res.send(err)
                                        }
        
                                        if(resp){
                                            res.send("User has been created")
                                        }
                                    })
                                }
                                // If user role is internal Admin (i.e roleID = 4)
                                if (req.body.roleID === '4'){
                                    connection.query(`INSERT INTO permissions (permitID, staffID, permitItemID) VALUES ('2', @@IDENTITY, '1'), 
                                        ('2', @@IDENTITY, '2'), ('2', @@IDENTITY, '5'), ('1', @@IDENTITY, '6'), 
                                        ('2', @@IDENTITY, '7'), ('1', @@IDENTITY, '8'), ('2', @@IDENTITY, '9'), 
                                        ('1', @@IDENTITY, '10'), ('2', @@IDENTITY, '11'), ('1', @@IDENTITY, '12'), 
                                        ('2', @@IDENTITY, '13'), ('2', @@IDENTITY, '13')`, (err, resp) => {
                                        if(err){
                                            res.statusCode = 401
                                            res.send(err)
                                        }
        
                                        if(resp){
                                            res.send("User has been created")
                                        }
                                    })
                                }
                                // If user role is employee (i.e roleID = 5)
                                if (req.body.roleID === '5'){
                                    connection.query(`INSERT INTO permissions (permitID, staffID, permitItemID) VALUES ('2', @@IDENTITY, '2'), 
                                        ('2', @@IDENTITY, '2'), ('2', @@IDENTITY, '5'), ('2', @@IDENTITY, '6'), 
                                        ('2', @@IDENTITY, '7'), ('2', @@IDENTITY, '8'), ('2', @@IDENTITY, '9'), 
                                        ('2', @@IDENTITY, '10'), ('2', @@IDENTITY, '11'), ('2', @@IDENTITY, '12'), 
                                        ('2', @@IDENTITY, '13'), ('2', @@IDENTITY, '13')`, (err, resp) => {
                                        if(err){
                                            res.statusCode = 401
                                            res.send(err)
                                        }
        
                                        if(resp){
                                            res.send("User has been created")
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            }else{
                res.send('You do not have permission to view all company employees')
            }
        } 
       
    })

    // **********************************************************************************************************
    // ******************************************* LOGIN USERS **************************************************

    // login user
    app.post('/pace-time-sheet/login', (req, res) => {
        // get user with user email
        connection.query(`SELECT s.firstName, s.password, s.lastName, s.companyID, permit, permitItem, roleID 
        from permissions p JOIN staff s ON s.staffID = p.staffID 
        JOIN permitItem pi ON pi.permitItemID = p.permitItemID
        JOIN permit pe ON pe.permitID = p.permitID
        WHERE email = '${req.body.email}'`, 
        (err, resp) => {
            if(err){
                res.send(err)
                res.end()
            }

            //if user email not in database
            if(resp == []){
                res.send("User does not exist")
                res.statusCode = 401
            }

            //if user email in database
            if(resp){
                //check if password matches
                bcrypt.compare(req.body.password, resp[0].password, (hashErr, valid) => {
                    //if password does not match
                    if(!valid){
                       return res.send('invalid login details')
                    }

                    if(hashErr){
                        return res.send(err)
                    }
                    // if password matches

                    let  payload = {'data': resp}

                    //get token
                    let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {expiresIn : '3600000'})

                    let respData = {
                        'data' : resp,
                        'accessToken' : accessToken
                    }
                    res.send(respData)
                    // res.end() 
                })
                // res.send(resp[0])
            }
        })
    })

    // **********************************************************************************************************
    // ******************************************* READ TABLES **************************************************

    // read company
    app.get('/pace-time-sheet/database', authenticateToken, (req, res) => {
        // approved = req.user.data.permit.find(x => x.permission == 'allowed')
        connection.query('select * from company', (err, resp) => {
            if(err) throw err
            res.send(req.data)
        })
    })

    // read user
    app.get('/pace-time-sheet/database/staff', authenticateToken, (req, res) => {

        permitDetails = req.respData.data.find(x => x.permitItem == 'View all company users')
        if(!!permitDetails){
            if(permitDetails.permit = 'allowed'){
                connection.query('select * from staff', (err, resp) => {
                    if(err) throw err
                    res.send(resp)
                })
            }else{
                res.send('You do not have permission to view all company employees')
            }
        } 
    })

    // **********************************************************************************************************
    // ******************************************* UPDATE TABLES ************************************************

    // update company details
    app.put('/pace-time-sheet/companyName/employeeSettings/:id', authenticateToken, (req, res) => {
        permitDetails = req.respData.data.find(x => x.permitItem == 'Edit company settings')
        if(!!permitDetails){
            if(permitDetails.permit = 'allowed'){
                connection.query(`UPDATE staff SET firstName = '${req.body.firstName}', lastName='${req.body.lastName}',
                phoneNumber =  '${req.body.phoneNumber}', address = '${req.body.address}', 
                userName = '${req.body.userName}' WHERE staffID = ${req.params.id}`,
                (err, resp) => {
                    if(err){
                        res.statusCode = 401
                        res.send(err)
                    }
        
                    if(resp){
                        res.send('User details have been updated')
                    }
                })
            }else{
                res.send('You do not have permission to edit details')
            }
        }else{
            return res.send('You do not have permission to edit details')
        }
       
    })

    // update user details
    app.put('/pace-time-sheet/companyName/employeeSettings/:id', authenticateToken, (req, res) => {
        connection.query(`UPDATE staff SET firstName = '${req.body.firstName}', lastName='${req.body.lastName}',
        phoneNumber =  '${req.body.phoneNumber}', address = '${req.body.address}', 
        userName = '${req.body.userName}' WHERE staffID = ${req.params.id}`,
        (err, resp) => {
            if(err){
                res.statusCode = 401
                res.send(err)
            }

            if(resp){
                res.send('User details have been updated')
            }
        })    
    })

    // change password
    app.put('/pace-time-sheet/companyName/changePassword', authenticateToken, (req, res) => {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err){
                res.statusCode = 401
                res.send(err)
            }

            if(hash){
                connection.query(`password = '${req.body.hash}'`, (err, resp) => {
                    if(err){
                        res.statusCode = 401
                        res.send(err)
                    }

                    if(resp){
                        res.send('User details have been updated')
                    }
                })
            }
        })
    })

    // delete company

    // delete user
    app.delete('/pace-time-sheet/companyName/deleteUser/:id', authenticateToken, (req, res) => {
            connection.query(`DELETE from staff WHERE staffID = ${req.params.id}`, (err, resp) => {
                if(err){
                    res.statusCode = 401
                    res.send(err)
                }

                if(resp){
                    res.send('User deleted')
                }
            })
    })
}

module.exports = userController
