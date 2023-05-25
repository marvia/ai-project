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
import { useRouter } from "next/router"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { TARGET_AUDIENCES, TONE_OF_VOICE } from "src/core/copy-creator/constants"
import { CopyCreatorInput } from "src/core/copy-creator/zod"
import Layout from "src/core/layouts/Layout"
import { useTranslations } from "next-intl"
import { GetStaticPropsContext } from "next"
import axios from "axios"
import { DEFAULT_PROMPT } from "src/core/copy-creator/constants"

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
  const [result, setResult] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const { classes } = useStyles(undefined, { name: CopyCreator.name })
  const router = useRouter()
  const activeLocale = router.locale
  const t = useTranslations("copyCreator")
  const copyCreatorForm = useForm({
    defaultValues: {
      toneOfVoice: [],
      targetAudiences: [],
      callToAction: "",
      copyLength: "",
    },
    resolver: zodResolver(CopyCreatorInput),
  })

  const sendPrompt = async ({ toneOfVoice, targetAudiences, callToAction, copyLength }) => {
    const finalPrompt = `${DEFAULT_PROMPT} \`\`\` Tone of voice: ${toneOfVoice.join(
      ", "
    )}. Target audience: ${targetAudiences.join(
      ", "
    )}. Length: ${copyLength} words. Call to action: ${callToAction} \`\`\``

    try {
      const url = "/api/chat"

      await axios
        .post(url, { prompt: finalPrompt })
        .then((response: { data: string }) => setResult(response.data))
        .catch((error) => {
          console.error(error.message)
          throw new Error("FAAAAIIL")
        })
    } catch (e) {
      console.error(e.message)
      throw new Error("FAAAAIIL")
    }
    setLoading(false)
  }

  const handleSubmit = copyCreatorForm.handleSubmit(async (values) => {
    try {
      setLoading(true)
      await sendPrompt(values)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  })

  console.log({ result, router, t })

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
        {t("title")}
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
                    label={t("toneOfVoice.label")}
                    searchable
                    nothingFound={t("toneOfVoice.nothingFound")}
                    classNames={{ root: classes.root }}
                    disabled={loading}
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
                    label={t("targetAudience.label")}
                    searchable
                    nothingFound={t("targetAudience.nothingFound")}
                    classNames={{ root: classes.root }}
                    disabled={loading}
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
                    label={t("copyLength.label")}
                    classNames={{ root: classes.root }}
                    disabled={loading}
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
                    label={t("callToAction.label")}
                    placeholder={t("callToAction.placeholder")}
                    minRows={4}
                    classNames={{ root: classes.root }}
                    disabled={loading}
                    error={fieldState.error && <span>{fieldState.error.message}</span>}
                  />
                )}
              />

              <Button mt="md" type="submit" loading={loading} disabled={loading}>
                ✨ {t("submitButton")} ✨
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

const useStyles = createStyles(() => ({
  root: { width: "100%" },
}))

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../translations/${locale}.json`)).default,
    },
  }
}

export default CopyCreator
