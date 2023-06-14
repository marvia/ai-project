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
        "You are a marketeer who knows how to talk to " +
        prompt.targetAudience +
        " in an " +
        prompt.toneOfVoice +
        " tone of voice. ",
    },
    {
      role: "user",
      content:
        " read the text between the dashes and write an instagram post for me with the text between the dashes in mind. The post should motivate our followers to: " +
        prompt.callToAction +
        "---We are ViaMar Coffee. A coffee brand that is all about sustainability and fair trade. Our coffee beans are carefully selected and roasted to perfection. Our supply chain is fully transparent to ensure that the farmer gets a fair price for his coffee beans.---",
    },

    {
      role: "user",
      content:
        "The post may consist of a maximum of 7 sentences and a minimum of 3 sentences and must contain appropriate hashtags. Also write your post in a " +
        prompt.toneOfVoice +
        " style. Start directly with the first sentence of the post.",
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
