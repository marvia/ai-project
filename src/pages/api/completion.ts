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
  const { prompt } = await req.json()

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 1000,
    stream: true,
    temperature: 0.6,
    prompt: `Create alternatice headlines from a initial headline:

Initial headline: Wake Up to a Better World with ViaMar Coffee
altnernative: Experience the Perfect Morning Brew with ViaMar Coffee
Initial headline: Step into Style and Comfort with SoleStride: Your Perfect Pair Awaits!
altnernative: Discover Footwear Bliss with SoleStride: Elevate Your Style and Embrace Unmatched Comfort!
Initial headline: ${prompt}
altnernative:`,
  })
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}
