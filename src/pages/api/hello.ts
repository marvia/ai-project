import type { NextApiRequest, NextApiResponse } from "next"
import openai from "../../core/utils/openai"

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { prompt } = req.body

  console.log(prompt)

  const messages = [
    {
      role: "system",
      content:
        "You are a marketeer who knows how to talk to " +
        prompt.targetAudience +
        " in an " +
        prompt.toneOfVoice +
        " tone of voice. ",
    },
    {
      role: "user",
      content:
        "Rewrite the text between --- and use a maximum of 60 characters and in a way that is more appealing to" +
        prompt.targetAudience +
        "and motivates them to: " +
        prompt.callToAction +
        "---" +
        prompt.headline +
        "---",
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
