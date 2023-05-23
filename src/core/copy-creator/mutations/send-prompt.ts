import { resolver } from "@blitzjs/rpc"
import axios from "axios"
import { DEFAULT_PROMPT } from "src/core/copy-creator/constants"
import { CopyCreatorInput } from "src/core/copy-creator/zod"

const CopyCreatorMutation = resolver.pipe(
  resolver.zod(CopyCreatorInput),
  async ({ toneOfVoice, targetAudiences, callToAction, copyLength }) => {
    const finalPrompt = `${DEFAULT_PROMPT} \`\`\` Tone of voice: ${toneOfVoice.join(
      ", "
    )}. Target audience: ${targetAudiences.join(
      ", "
    )}. Length: ${copyLength} words. Call to action: ${callToAction} \`\`\``

    console.log({ finalPrompt })

    try {
      const url = "http://13.53.134.133:5001/chat"

      const result = await axios
        .post(url, { prompt: finalPrompt })
        .then((response: { data: string }) => response.data)

      return result
    } catch (e) {
      console.error(e)
      throw new Error("FAAAAIIL")
    }
  }
)

export default CopyCreatorMutation
