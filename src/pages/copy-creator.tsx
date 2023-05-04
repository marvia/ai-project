import { BlitzPage } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Button, MultiSelect, Select, Stack, Text, Textarea, Title } from "@mantine/core"
import { useState } from "react"
import { DEFAULT_PROMPT } from "src/core/components/copy-creator/constants"
import CopyCreatorMuation from "src/core/components/copy-creator/mutations/send-prompt"
import Layout from "src/core/layouts/Layout"

function useCopyCreatorMutation() {
  return useMutation(CopyCreatorMuation)
}

const toneOfVoice = [
  "Formal",
  "Informal",
  "Approachable",
  "Professional",
  "Conversational",
  "Friendly",
  "Funny",
  "Confident",
  "Inspiring",
  "Engaging",
  "Witty",
  "Humorous",
  "Approval-seeking",
  "Thoughtful",
  "Supportive",
  "Encouraging",
  "Informative",
  "Assertive",
  "Empathetic",
  "Authentic",
  "Innovative",
  "Optimistic",
  "Playful",
  "Sarcastic",
  "Sincere",
  "Serious",
  "Silly",
  "Expert",
]

const targetAudiences = [
  "Millennials",
  "Generation Z",
  "Baby Boomers",
  "Generation X",
  "High-Income Consumers",
  "Low-Income Consumers",
  "Urban Consumers",
  "Rural Consumers",
  "Suburban Consumers",
  "Male Consumers",
  "Female Consumers",
]

const lengtSelectData = [
  { label: "Short", value: "0 - 20" },
  { label: "Medium", value: "20 - 100" },
  { label: "Long", value: "100 - 500" },
]

const toneOfVoiceSelectData = toneOfVoice.sort().map((item) => ({ label: item, value: item }))
const targetAudiencesSelectData = targetAudiences
  .sort()
  .map((item) => ({ label: item, value: item }))

const CopyCreator: BlitzPage = () => {
  const [toneOfVoice, setToneOfVoice] = useState([])
  const [targetAudiences, setTargetAudiences] = useState([])
  const [cta, setCta] = useState("")
  const [length, setLength] = useState<string | null>(null)
  const [sendPrompt, { isLoading }] = useCopyCreatorMutation()
  const [result, setResult] = useState("")

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
    length +
    " words" +
    ".\n" +
    "Call to action: " +
    cta +
    ".\n" +
    "```"

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await sendPrompt(
        {
          prompt: finalPrompt,
        },
        {
          onSuccess(data) {
            setResult(data)
          },
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  console.log({ finalPrompt })
  console.log({ result })

  return (
    <Layout title="VIAMAR Copy creator">
      <Title
        mt="md"
        order={1}
        align="center"
        sx={({ colors }) => ({
          color: colors.blue[7],
        })}
      >
        VIAMAR Copy creator
      </Title>

      <Stack align="center">
        <form onSubmit={handleSubmit}>
          <Stack align="center" mt="xl" spacing="md" style={{ width: 300 }}>
            <MultiSelect
              data={toneOfVoiceSelectData}
              value={toneOfVoice}
              onChange={setToneOfVoice}
              label="Select keywords for your tone of voice"
              style={{ width: "100%" }}
            />

            <MultiSelect
              data={targetAudiencesSelectData}
              label="Select your target audience"
              value={targetAudiences}
              onChange={setTargetAudiences}
              style={{ width: "100%" }}
            />

            <Select
              data={lengtSelectData}
              label="Length of copy"
              value={length}
              onChange={setLength}
              style={{ width: "100%" }}
            />

            <Textarea
              label="Call to action"
              value={cta}
              onChange={(e) => setCta(e.currentTarget.value)}
              placeholder="What do you want your audience to do?"
              minRows={4}
              style={{ width: "100%" }}
            />
            <Button mt="md" type="submit" loading={isLoading}>
              ✨ Create copy ✨
            </Button>

            {result && <Text>{result}</Text>}
          </Stack>
        </form>
      </Stack>
    </Layout>
  )
}

export default CopyCreator
