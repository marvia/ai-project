import type { NextApiRequest, NextApiResponse } from "next"
import openai from "../../core/utils/openai"

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { prompt } = req.body

  // Generate image from prompt
  const response = await openai
    .createImage({
      prompt: prompt,
      n: 3,
      size: "256x256",
    })
    .catch((err) => {
      console.log(err)
    })
  // Send back image url
  console.log(response.data.data)

  res.send(response.data.data)

  // receive some user data, ask chat gpt to generate something and return to the user
}
