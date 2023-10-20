import express from 'express'
// take app from express package
const app = express();

// write listen method to connect from database backend

app.listen(3000, () => {
    console.log("server is running on  port 3000")
})
