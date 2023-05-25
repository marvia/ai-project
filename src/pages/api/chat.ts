import type { NextApiRequest, NextApiResponse } from "next"
import openai from "../../core/utils/openai"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case "GET":
      return handleGET(req, res)
    case "POST":
      return handlePOST(req, res)
    default:
      res.setHeader("Allow", ["GET", "POST"])
      res.status(405).json({
        data: null,
        error: { message: `Method ${method} Not Allowed` },
      })
  }
}

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({
    data: {},
    error: null,
  })
}

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Allow", ["GET", "POST"])
  const { prompt } = req.body
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
  return res.status(200).json(completion.data.choices[0].message.content)
}
