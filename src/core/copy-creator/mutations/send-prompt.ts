import { resolver } from "@blitzjs/rpc"
import axios from "axios"
import { DEFAULT_PROMPT } from "src/core/copy-creator/constants"
import { CopyCreatorInput } from "src/core/copy-creator/zod"
import { API_URL } from "src/pages/api/constants"
import { AvailableLocalesZodEnum } from "src/types"

const CopyCreatorMutation = resolver.pipe(
  resolver.zod(CopyCreatorInput.extend({ activeLocale: AvailableLocalesZodEnum })),
  async ({ toneOfVoice, targetAudiences, callToAction, copyLength, activeLocale }) => {
    const finalPrompt = `${DEFAULT_PROMPT} \`\`\` Tone of voice: ${toneOfVoice.join(
      ", "
    )}. Target audience: ${targetAudiences.join(
      ", "
    )}. Length: ${copyLength} words. Call to action: ${callToAction} \`\`\` ${
      activeLocale === "nl" ? "Your reply should be in Dutch." : "Your reply should be in English."
    }`

    console.log({ finalPrompt })

    try {
      return await axios
        .post(API_URL, { prompt: finalPrompt })
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

export default CopyCreatorMutation
