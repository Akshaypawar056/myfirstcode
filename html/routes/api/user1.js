const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const config = require('config');
const { UserInfo } = require('git');

router.post(

    '/',
async(req, res) => {
     const { name, email, age, mobile, add, desc, work } = req.body;

       try  {
        let user = await User.findOne({ email });
         
        console.log(user);

        if (user) {
            return res.status(400).json({ errors: [{ alert: 'user already exists' }] });
         } else{
            user = new User({
                name,email,age,mobile,add,desc,work
            });
              await user.save();
              res.status(201).json(user);
              console.log(user);
              
            
         }
    
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');

    }
});

router.get('/list', async (req, res) => {
    try {
        const user = await User.find().sort({ date: -1});
        res.json(user);
        console.log(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

router.get('/list/:id', async (req, res) => {
    try {
        console.log(req.params);
        const {id} = req.params;

        const user = await User.findById({_id: id});
       console.log(user);
       res.status(201).json(user) 
       
    } catch (error) {
        res.status(404).json(error)
    }
    
});

router.delete('/deleteuser/:id', async (req, res) => {
    try {
        console.log(req.params);
        const {id} = req.params;
        //remove user
        await User.findOneAndRemove({ _id: id });
                

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

  
  
module.exports = router;