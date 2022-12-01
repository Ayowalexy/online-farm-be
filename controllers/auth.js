const asynchandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../model/usermodel')
const bcrypt = require('bcrypt')
const { signupSchema, loginSchema } = require('../middlewares/schema')


const login = asynchandler(async (req, res) => {

    const { error, value } = loginSchema.validate(req.body);

    if (error) {
        return res
            .status(401)
            .json(
                {
                    status: "error",
                    message: "invalid request",
                    meta: {
                        error: error.message
                    }
                })
    }
    const user = await User.findOne({email: value.email})
    if(user){
        const match = await bcrypt.compareSync(req.body.password, user.password);
        if(match){
            const token = jwt.sign({ email: user.email }, process.env.SECRET || '123456789');
            res.status(201).json({ "status": "success", "data": user, "token": token })
    
        } else {
            res.status(401).json({ "status": "error", "message": "invalid data", "meta": { "error": "email or password does not exist"}})
        }
        
    }


})

const signUp = asynchandler(async (req, res) => {

    const { error, value } = signupSchema.validate(req.body);

    if (error) {
        return res
            .status(401)
            .json(
                {
                    status: "error",
                    message: "invalid request",
                    meta: {
                        error: error.message
                    }
                })
    }

    const hash = await bcrypt.hashSync(value.password, 12);

    const user = new User({...value, password: hash});
    await user.save();
    res.status(201).json({message: "created account successfully", statue: true, data: user, meta: {}})


})

module.exports = {
    login,
    signUp
}