const express = require('express')
const fs = require('fs');
const app = express()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const {
  getUsuarios,
  verificarCredenciales,
} = require("./consultas");


app.listen(3000, console.log('Server on'))
app.use(cors())
app.use(express.json())




    

app.post("/login", async (req, res) => {
    try {
      console.log(req.body)
    const { email, password } = req.body

    await verificarCredenciales(email, password)
    console.log(password)
    const token = jwt.sign({ email }, "az_AZ")

    res.send(token)
    } catch (error) {
    console.log(error)
    res.status(error.code || 500).send(error)
    }
    })

    app.post("/usuarios", (req, res) => {
        try {
            const data = fs.readFileSync("./database/usuarios.json", "utf-8");
            const users = JSON.parse(data);
            // res.json(users)
            const newUsers = req.body;
            console.log(req.body)
            users.push(newUsers);
            fs.writeFileSync("./database/usuarios.json", JSON.stringify(users));
            res.status(201).send("Nuevo usuario creado");
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    })

    