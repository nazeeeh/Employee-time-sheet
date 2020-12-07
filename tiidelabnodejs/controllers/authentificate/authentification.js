function authenticateToken(req, res, next){
    //require npm package jasonWebToken
    const jwt = require('jsonwebtoken')

    const authenticationHeader = req.headers['authorization']
    const Token = authenticationHeader && authenticationHeader.split(' ')[1]

    if(Token == null) return res.status(401).send('invalid request')

    jwt.verify(Token, process.env.ACCESS_TOKEN_KEY, (err, data) => {
        if(err) return res.send(err)
        req.respData = data
        next()
    })
}

module.exports = authenticateToken