const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { route } = require('./users');
 


router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
           ['name', 'avatar']
           );
 
          if(!profile) {
            return res.status(400).json({ msg: 'there is no profile for this user'});

        }
        res.json(profile);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
});

router.post(
    '/',
    [
      auth,
      [
        check('email', 'name is required')
      .not()
      .isEmpty(),
      check('name', 'name is required')
      .not()
      .isEmpty()

      ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

       const {
        name,
        email,
        age,
        mobile,
        add,
        desc,
        work,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
       
       } = req.body;

       const profileFields = {};
       profileFields.user = req.user.id;
       if(name) profileFields.name = name;
       if(email) profileFields.email = email;
       if(age) profileFields.age = age;
       if(add) profileFields.add = add;
       if(work) profileFields.work = work;
       if(desc) profileFields.desc = desc;
       if(mobile) profileFields.mobile = mobile;
       if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
       }
       profileFields.social = {};
       if (youtube) profileFields.social.youtube = youtube;
       if (twitter) profileFields.social.twitter = twitter;
       if (facebook) profileFields.social.facebook = facebook;
       if (linkedin) profileFields.social.linkedin = linkedin;
       if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id})
            
        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }   
            );
            return res.json(profile);
        }
            profile = new Profile(profileFields);
          
            await profile.save();
            res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }  
  }
);

// @route GET api/profile
// @desc  Get all profiles
// @access public

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});


// @route GET api/profile/user/:user_id
// @desc  Get profile by user ID
// @access public


router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user',
        ['name', 'avatar']);

        if(!profile)
        return res.status(400).json({ msg: 'profile not found' });

        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'profile not found' });
        }
        res.status(500).send('server error');
    }
});

// @route delete api/profile
// @desc  Gdelete  profile user post
// @access private

router.delete('/', auth, async (req, res) => {
    try {
        //remove profile
        // remover user post
        await Profile.findOneAndRemove({ user: req.user.id });
        //remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

// @route put api/profile/experience
// @desc  add profile experience
// @access private
router.put('/experience',
 [ 
    auth, 
    [
    check('title', 'Title is required')
    .not()
    .isEmpty(),
    check('company', 'Company is required')
    .not()
    .isEmpty(),
    check('from', 'Title is required')
    .not()
    .isEmpty()
  ]
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description

    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
}
);

// @route delete api/profile/experience/:exp_id
// @desc  delete profile experience
// @access private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        
        //get remove index
        const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server Error');
    
    }
});



// @route put api/profile/education
// @desc  add profile education
// @access private
router.put('/education',
 [ 
    auth, 
    [
    check('school', 'school is required')
    .not()
    .isEmpty(),
    check('degree', 'degree is required')
    .not()
    .isEmpty(),
    check('fieldofstudy', 'field of study required')
    .not()
    .isEmpty(),
    check('from', 'from date is required')
    .not()
    .isEmpty()
  ]
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description

    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEdu);

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
}
);


// @route delete api/profile/education/:edu_id
// @desc  delete eduction from profile
// @access private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        
        //get remove index
        const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server Error');
    
    }
});



module.exports = router;