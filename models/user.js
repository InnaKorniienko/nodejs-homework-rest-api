const {Schema, model} = require("mongoose");
const Joi = require('joi');
const bcrypt = require("bcrypt");

const userSchema = Schema({
    password: {
        type: String,
        required: true,
        minlength: 6
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      subscription: {
        type: String,
        // enum: subscriptions,
        // default: "starter"
      },
      token: {
        type: String,
        default: "",
      },
      avatarURL: {
        type: String,
        required: true
      },
      verify: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
      },
}, {versionKey: false, timestamps: true});


userSchema.methods.setPassword = function(password){
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
}


const joiSignupSchema = Joi.object({
 password: Joi.string().min(6).required(),
 email: Joi.string().required(),
});

const joiLoginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().required(),
});

const User = model("user", userSchema);

module.exports = {
    User,
    joiSignupSchema,
    joiLoginSchema
}