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
        "You are a content marketeer who knows how to talk to " +
        prompt.targetAudiences +
        " in an " +
        prompt.toneOfVoice +
        " tone of voice. ",
    },
    {
      role: "user",
      content:
        "---" +
        prompt.intro +
        "---" +
        " give me 3 potential short headlines based on the text between triple dashes and the call to action. Include a marketing text for each headline that is 10 sentences long.",
    },
    {
      role: "user",
      content:
        "your headlines and texts must motivate to execute this call to action: " +
        prompt.callToAction,
    },
    {
      role: "user",
      content:
        "your response must be valid JSON object. The object must contain a property called 'headlines' which is an array of 3 strings. Each string is a headline. The object must also contain a property called 'marketingTexts' which is an array of 3 strings. Each string is a marketing text.",
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
