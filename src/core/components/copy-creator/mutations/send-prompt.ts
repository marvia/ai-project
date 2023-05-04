import { resolver } from "@blitzjs/rpc"
import axios from "axios"

const CopyCreatorMuation = resolver.pipe(async ({ prompt }) => {
  try {
    const url = "http://localhost:8080/chat"

    const result = await axios
      .post(url, { prompt })
      .then((response: { data: string }) => response.data)

    return result
  } catch (e) {
    throw new Error("FAAAAIILLLURE")
  }
})

export default CopyCreatorMuation
