import { z } from "zod"

export const AvailableLocalesZodEnum = z.enum(["en", "nl"] as const)
export type AvailableLocale = z.infer<typeof AvailableLocalesZodEnum>
