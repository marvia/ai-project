import type { NextApiRequest, NextApiResponse } from "next"
type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: "John Doe" })
  // receive some user data, ask chat gpt to generate something and return to the user
}
