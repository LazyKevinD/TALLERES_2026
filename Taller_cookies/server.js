import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser())

app.get(`/`, (req, res) => {
    res.send("Hola Mundo")
})

app.get(`/setcookie`, (req, res) => {
    res.cookie('my_cookie_name', 'cookie del taller XD', {
        maxAge:7000,
        httpOnly:true,
    })
    res.send("Hola Mundo again")
})

app.get(`/getcookie`, (req, res) => {
    console.log(req.cookies)
    res.send("leyendo potro galletas :D")
})


app.listen(3000)
console.log(`Servidor escuchando desde el puerto 3000`)