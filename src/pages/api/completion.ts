import { OpenAIStream, StreamingTextResponse } from "ai"
import { Configuration, OpenAIApi } from "openai-edge"

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

export default async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json()

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "user",
        content: `Create an alternative headline from an initial headline:

    Initial headline: Wake Up to a Better World with ViaMar Coffee
    altnernative: Experience the Perfect Morning Brew with ViaMar Coffee
    Initial headline: Step into Style and Comfort with SoleStride: Your Perfect Pair Awaits!
    altnernative: Discover Footwear Bliss with SoleStride: Elevate Your Style and Embrace Unmatched Comfort!
    Initial headline: ${prompt}
    altnernative:`,
      },
    ],
    max_tokens: 200,
    temperature: 0.9,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
