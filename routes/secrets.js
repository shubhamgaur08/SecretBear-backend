const express = require('express');
const bodyParser = require('body-parser')
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');
const Secret = require('../models/Secret');
const router = express.Router();



router.post('/submit',fetchuser,async(req,res)=>{
    const newSecret = new Secret({
        ...req.body,
        owner: req.user.id
    })
    try {
        await newSecret.save()
        res.json(newSecret)
        
   } catch (e) {
       res.status(500).json({error:'Internal Server Error'})
       console.log(e);
   }
})



router.get('/secrets',(req,res)=>{
    const secrets = Secret.find({},(err,secrets)=>{
        if (err) {
            console.log(err);
        } else if(secrets){
            //json to array
           // Convert the secrets from JSON object to an array of secrets
           const secretsArray = Array.from(secrets);
           res.send(secretsArray);
            
        
        }
    })
   
})
module.exports = router