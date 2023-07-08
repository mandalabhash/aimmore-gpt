const PORT = 6969
const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
app.use(express.json())
app.use(cors())

console.log("Hmm server updated again")

const API_KEY = process.env.API_KEY

app.post('/completions', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-16k-0613",
            messages: [{ role: "user", content: req.body.message}],
            max_tokens: 100
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.error(error)
        res.status(500).send("An error occurred")
    }
})

app.listen(PORT, () => {
    console.log("Your Server is running on PORT: " + PORT)
})
