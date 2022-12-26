const {Conflict} = require("http-errors");
const {User} = require("../../models");


const signup = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw new Conflict(`User with ${email} already exist`)
    }
    const newUser = new User({email});
    newUser.setPassword(password);
    newUser.save();
   

    res.status(201).json({
        status: "success",
        code: 201,
        data: {
          user: {
            email,
            subscription: "starter"
          }
        }
    })
}

module.exports = signup;