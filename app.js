const usersRoute = require("./routes/user.route");

const express = require('express')
const app = express()
const port = 3000

// ? lowdb setup
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ posts: [], users: [] })
    .write();



// ? connect routes
app.use(express.json());
//use users route for api/users
app.use("/api/users", usersRoute);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})