// import User Model
import {User} from '../models/User'
import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export function signup(req: express.Request , res: express.Response){
    let salt = 10
    bcrypt.hash(req.body.password , salt , function(err ,hash){

    let user = new User({emailAddress:req.body.emailAddress , password:hash})
    console.log(req.body)

    user.save()
    .then(user => {
        res.json({user})
    })
    .catch(err => {
        console.log(err)
    })
    })
}

export function signin(req: express.Request , res: express.Response){
    console.log(req.body.email)
    User.findOne({emailAddress:req.body.email})
    .then(data => {

        const userObject = data?.toObject()

        if(!userObject)
        return 
        
        const userPass = userObject.password     
        
        bcrypt.compare(req.body.password , userPass)

        let jwtSecretKey = process.env.SECRET_KEY || "HELLOWORLD"

        // throw err

        const token = jwt.sign(userObject , jwtSecretKey , {expiresIn: 604800})

        try{
            const verified = jwt.verify(token , jwtSecretKey)

            verified ? res.json({token}) : res.json({message: "Unverified"})
            
        }
        
       catch(err){
        console.log(err)
       }

    })
    .catch(err => {
        console.log(err)
    })
   
}
