const express = require('express')
const app = express()
const cors = require('cors')
const getUsuarios = () => {}

app.listen(3000, console.log('Server on'))
app.use(cors())
app.use(express.json())

app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await getUsuarios()
        res.json(usuarios)
    } catch(error) {
        res.status(error.code || 500).send(error)
    }
})