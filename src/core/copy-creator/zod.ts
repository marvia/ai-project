import { z } from "zod"

export const CopyCreatorInput = z.object({
  toneOfVoice: z.array(z.string()),
  targetAudiences: z.array(z.string()),
  callToAction: z.string(),
  copyLength: z.string(),
})
