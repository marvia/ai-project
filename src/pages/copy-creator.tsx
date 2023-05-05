import { useMutation } from "@blitzjs/rpc"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Card,
  MultiSelect,
  Select,
  SelectItem,
  Stack,
  Text,
  Textarea,
  Title,
  createStyles,
} from "@mantine/core"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { TARGET_AUDIENCES, TONE_OF_VOICE } from "src/core/copy-creator/constants"
import CopyCreatorMuation from "src/core/copy-creator/mutations/send-prompt"
import { CopyCreatorInput } from "src/core/copy-creator/zod"
import Layout from "src/core/layouts/Layout"

function useCopyCreatorMutation() {
  return useMutation(CopyCreatorMuation)
}

const lengtSelectData: Array<SelectItem> = [
  { label: "Short", value: "0 - 20" },
  { label: "Medium", value: "20 - 100" },
  { label: "Long", value: "100 - 500" },
]

const toneOfVoiceSelectData: Array<SelectItem> = TONE_OF_VOICE.sort().map((item) => ({
  label: item,
  value: item,
}))
const targetAudiencesSelectData: Array<SelectItem> = TARGET_AUDIENCES.sort().map((item) => ({
  label: item,
  value: item,
}))

function CopyCreator(): JSX.Element {
  const [sendPrompt, { isLoading }] = useCopyCreatorMutation()
  const [result, setResult] = useState<string>("")
  const { classes } = useStyles(undefined, { name: CopyCreator.name })
  const copyCreatorForm = useForm({
    defaultValues: {
      toneOfVoice: [],
      targetAudiences: [],
      callToAction: "",
      copyLength: "",
    },
    resolver: zodResolver(CopyCreatorInput),
  })

  const handleSubmit = copyCreatorForm.handleSubmit(async (values) => {
    try {
      await sendPrompt(values, {
        onSuccess(data) {
          setResult(data)
        },
      })
    } catch (error) {
      console.log(error)
    }
  })

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
          <Card shadow="sm" style={{ width: 300 }}>
            <Stack align="center" mt="xl" spacing="md">
              <Controller
                control={copyCreatorForm.control}
                name="toneOfVoice"
                render={({ field, fieldState }) => (
                  <MultiSelect
                    {...field}
                    data={toneOfVoiceSelectData}
                    label="Select keywords for your tone of voice"
                    searchable
                    nothingFound="Nothing found"
                    classNames={{ root: classes.root }}
                    error={fieldState.error && <span>{fieldState.error.message}</span>}
                  />
                )}
              />

              <Controller
                control={copyCreatorForm.control}
                name="targetAudiences"
                render={({ field, fieldState }) => (
                  <MultiSelect
                    {...field}
                    data={targetAudiencesSelectData}
                    label="Select your target audience"
                    searchable
                    nothingFound="Nothing found"
                    classNames={{ root: classes.root }}
                    error={fieldState.error && <span>{fieldState.error.message}</span>}
                  />
                )}
              />

              <Controller
                control={copyCreatorForm.control}
                name="copyLength"
                render={({ field, fieldState }) => (
                  <Select
                    {...field}
                    data={lengtSelectData}
                    label="Length of copy"
                    classNames={{ root: classes.root }}
                    error={fieldState.error && <span>{fieldState.error.message}</span>}
                  />
                )}
              />

              <Controller
                control={copyCreatorForm.control}
                name="callToAction"
                render={({ field, fieldState }) => (
                  <Textarea
                    {...field}
                    label="Call to action"
                    placeholder="What do you want your audience to do?"
                    minRows={4}
                    classNames={{ root: classes.root }}
                    error={fieldState.error && <span>{fieldState.error.message}</span>}
                  />
                )}
              />

              <Button mt="md" type="submit" loading={isLoading} disabled={isLoading}>
                ✨ Create copy ✨
              </Button>
            </Stack>
          </Card>
        </form>
        <Card shadow="sm" style={{ width: 300, minHeight: 300 }}>
          <Text>{result}</Text>
        </Card>
      </Stack>
    </Layout>
  )
}

const useStyles = createStyles((theme) => ({
  root: { width: "100%" },
}))

export default CopyCreator
