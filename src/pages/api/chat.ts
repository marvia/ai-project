import type { NextApiRequest, NextApiResponse } from "next"
import openai from "../../core/utils/openai"

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { prompt } = req.body

  const messages = [
    {
      role: "user",
      content:
        "Our brand introduction:" +
        prompt.intro +
        "give me 5 potential short headlines based on this intro. Also include a marketing text for each headline that is 10 sentences long.",
    },
    { role: "user", content: "Your response must be aimed towards:" + prompt.targetAudiences },
    {
      role: "user",
      content: "The headlines must motivate the audience to:" + prompt.callToAction,
    },
    {
      role: "user",
      content:
        "your response must be valid JSON object. The object must contain a property called 'headlines' which is an array of 5 strings. Each string is a headline. The object must also contain a property called 'marketingTexts' which is an array of 5 strings. Each string is a marketing text.",
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
