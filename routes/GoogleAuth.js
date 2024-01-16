const express = require("express");
const GoogleUser = require("../models/GoogleUser");
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'shubhamgaur672@gmail.com';
const router = express.Router();

// *adding user details into mongoDB
router.post("/login", async (req, res) => {
  let success=false;
  try {
    const { name, email, uid, } = req.body;

    const userFound = await GoogleUser.findOne({ email });
    if (!userFound) {
     
     
      const newUser = new GoogleUser({
        name,
        uid,
        email,
        
      });
      console.log(newUser);
      const data = {
        user: {
          id: newUser.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
  
  
      // res.json(user)
      res.json({ success,authtoken })
      const loginUser = await newUser.save();
      res.send(loginUser);

      res.status(201).json({ message: "account created" });
    }else if(userFound){
      // console.log(userFound)
      const data = {
        user: {
          id: userFound.id
        }
      }
      console.log(data);
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken);

      success=true;
      res.json({ success,authtoken })
      
    }
  } catch (error) {
    console.log(`error occured : ${error.message}`);
  }
});



module.exports = router