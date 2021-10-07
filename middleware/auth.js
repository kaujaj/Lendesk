const dbclient = require('../config/database');
const router = require("express").Router();
const { passwordStrength } = require('check-password-strength')

router.post('/register',async (req,res)=>{
   
    const {username,password} = req.body;
    
    
    try{
        await dbclient.exists(username,(err,reply)=>{
            if(reply === 1)
            {
                res.status(401);
                res.json({
                    status: "ERROR",
                    error: "User exists"
                })
                return
            }
            else
            {
                if(passwordStrength(password).value !== 'Strong')
                {
                    res.status(401);
                    res.json({
                        status: "ERROR",
                        error: "Weak password"
                    })
                    return;
                }
                else
                    dbclient.set(username,password,(err,reply)=>{
                        res.status(200)
                        res.json({
                            status:"SUCCESS"
                        })
                    })
            }
        })
    }catch(err){
        console.log(err)
        res.status(500);
        res.json({
            status: "ERROR",
            error: "Internal server error"
        })
    }
    
})

router.get('/authenticate',async (req,res)=>{
    const {username,password} = req.query;
    
    try{
        await dbclient.get(username,(err,reply)=>{
            if(reply===password)
            {
                res.status(200)
                res.json({
                    status:"SUCCESS"
                })
            }
            else
            {
                res.status(401);
                res.json({
                    status: "ERROR",
                    error: "Incorrect username/password"
                })
            }
        })
    }
    catch(err){
        console.log(err)
        res.status(500);
        res.json({
            status: "ERROR",
            error: "Internal server error"
        })
    }
    
})

module.exports = router;