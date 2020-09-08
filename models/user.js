require('dotenv').config()
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

const User = db.get('users')

function generateAuthToken(id) {
    const token = jwt.sign({ id: id }, process.env.JWT_KEY); //get the private key from the config file -> environment variable
    return token;
}

//function to validate user
async function validateUser(user) {
    const schema = Joi.object().keys({
        name: Joi.string().required().alphanum(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    try { var result = await schema.validateAsync({ user }); }
    catch (error) {
        console.error(error);
    }
    return result
}

exports.User = User;
exports.validate = validateUser;
exports.generateToken = generateAuthToken;