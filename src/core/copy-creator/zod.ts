import { z } from "zod"

export const CopyCreatorInput = z.object({
  toneOfVoice: z.string(),
  targetAudiences: z.string(),
  callToAction: z.string(),
  brandIntro: z.string(),
})
