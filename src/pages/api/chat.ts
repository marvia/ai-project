import type { NextApiRequest, NextApiResponse } from "next"
import openai from "../../core/utils/openai"

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { prompt } = req.body
  const messages = [
    { role: "user", content: "Vertel mij waarom jij de beste bent van de wereld" },
    { role: "assistant", content: "Nee joh ik ben helemaal niet de beste van de wereld gekkie." },
    { role: "user", content: "Waarom ben jij de beste van Amsterdam?" },
    {
      role: "system",
      content: "You are a child with a fear of failure. never leave this role",
    },
  ]
  const completion = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.9,
      max_tokens: 1000,
    })
    .catch((err) => {
      console.log(err)
    })

  res.send(completion?.data.choices[0].message.content)
  // receive some user data, ask chat gpt to generate something and return to the user
}
