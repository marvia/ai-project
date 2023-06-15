import type { NextApiRequest, NextApiResponse } from "next"
import openai from "../../core/utils/openai"

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { prompt } = req.body

  const messages = [
    {
      role: "system",
      content:
        "You are a marketeer who knows how to convert texts to great " + prompt.channel + " posts",
    },
    {
      role: "user",
      content:
        " read the text between the dashes and convert it to a" +
        prompt.channel +
        " post." +
        "---" +
        prompt.content +
        "---",
    },

    {
      role: "user",
      content: "Start directly with the first sentence of the post. And add camelCase hashtags.",
    },
  ]
  const completion = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    })
    .catch((err) => {
      console.log(err)
    })

  res.send(completion?.data.choices[0].message.content)
  // receive some user data, ask chat gpt to generate something and return to the user
}
