const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { User, validate, generateToken } = require("../models/user.js");
const express = require("express");
const router = express.Router();
const shortid = require('shortid')



router.get("/current", auth, async (req, res) => {
    const user = User.find({ id: req.user.id }).value()

    var result = user

    res.send(result);
});

router.post("/", async (req, res) => {
    // validate the request body first
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //find an existing user
    let user = User.find({ email: req.body.email });
    if (user.value() != null) return res.status(400).send("User already registered.");

    var userjson = {
        id: shortid.generate(),
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    };

    //? Hash Password
    userjson.password = await bcrypt.hash(userjson.password, 10);

    //? Write to DB
    User.push(userjson)
        .write()

    const token = generateToken(userjson.id);
    res.header("x-auth-token", token).send({
        id: userjson.id,
        name: userjson.name,
        email: userjson.email
    });
});

router.post("/signin", async (req, res) => {

    //find an existing user
    let user = await User.find({ email: req.body.email });
    if (user.value() == null) return res.status(400).send("Invalid username / password ");

    var hashPassword = user.value().password

    bcrypt.compare(req.body.password, hashPassword, function (err, res) {
        if (res != true) {
            return res.status(400).send("Invalid username / password")
        }
    });

    const token = generateToken(user.value().id);
    res.header("x-auth-token", token).send({
        id: user.value().id,
        name: user.value().name,
        email: user.value().email
    });
});


module.exports = router;