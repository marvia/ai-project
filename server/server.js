const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv").config({ path: "../.env" })

const { Configuration, OpenAIApi } = require("openai")

const apiKey = process.env.OPENAI_API_KEY

const configuration = new Configuration({
  apiKey: apiKey,
})
const openai = new OpenAIApi(configuration)

// Set up the server
const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello Marvian!")
})

// Set up the ChatGPT endpoint
app.post("/chat", async (req, res) => {
  // Get the prompt from the request
  const { prompt } = req.body

  // Generate a response with ChatGPT
  const messages = [{ role: "user", content: prompt }]
  const completion = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0,
      max_tokens: 1000,
    })
    .catch((err) => {
      console.log(err)
    })
  console.log(completion.data)
  res.send(completion.data.choices[0].message.content)
})

app.post("/image", async (req, res) => {
  // Get the prompt from the request
  const { prompt } = req.body

  // Generate image from prompt
  const response = await openai.createImage({
    prompt: prompt,
    n: 3,
    size: "256x256",
  })
  // Send back image url
  console.log(response.data.data)
  res.send(response.data.data)
})

// Start the server
const port = 8080
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
