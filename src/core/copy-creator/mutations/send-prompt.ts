import { resolver } from "@blitzjs/rpc"
import axios from "axios"
import { DEFAULT_PROMPT } from "src/core/copy-creator/constants"
import { CopyCreatorInput } from "src/core/copy-creator/zod"

const CopyCreatorMuation = resolver.pipe(
  resolver.zod(CopyCreatorInput),
  async ({ toneOfVoice, targetAudiences, callToAction, copyLength }) => {
    const finalPrompt =
      DEFAULT_PROMPT +
      "```" +
      "Tone of voice: " +
      toneOfVoice.join(", ") +
      ".\n" +
      "Target audience: " +
      targetAudiences.join(", ") +
      ".\n" +
      "Length: " +
      copyLength +
      " words" +
      ".\n" +
      "Call to action: " +
      callToAction +
      ".\n" +
      "```"

    console.log({ finalPrompt })

    try {
      const url = "http://localhost:3000/api/chat"

      return await axios
        .post(url, { prompt: finalPrompt })
        .then((response: { data: string }) => response.data)
        .catch((error) => {
          console.error(error)
          throw new Error("FAAAAIIL")
        })
    } catch (e) {
      console.error(e)
      throw new Error("FAAAAIIL")
    }
  }
)

export default CopyCreatorMuation
