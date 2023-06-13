import { zodResolver } from "@hookform/resolvers/zod"
import {
  Badge,
  Button,
  Card,
  Group,
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
import { AvailableLocale } from "src/types"
import { Interface } from "readline"

const lengtSelectData: Array<SelectItem> = [
  { label: "Short", value: "0 - 20" },
  { label: "Medium", value: "20 - 100" },
  { label: "Long", value: "100 - 500" },
]

interface CopyCreatorResponseType {
  headlines: Array<string>
  marketingTexts: Array<string>
}

function CopyCreator(): JSX.Element {
  const [result, setResult] = useState<CopyCreatorResponseType>({
    headlines: [""],
    marketingTexts: [""],
  })
  const [loading, setLoading] = useState<boolean>(false)
  const { classes } = useStyles(undefined, { name: CopyCreator.name })
  const router = useRouter()
  const activeLocale = router.locale as AvailableLocale
  const t = useTranslations("copyCreator")
  const copyCreatorForm = useForm({
    defaultValues: {
      brandIntro:
        "We are ViaMar Coffee. A coffee brand that is all about sustainability and fair trade. Our coffee beans are carefully selected and roasted to perfection. Our supply chain is fully transparent to ensure that the farmer gets a fair price for his coffee beans.",
      toneOfVoice: [],
      targetAudiences: [],
      callToAction: "",
      copyLength: "",
    },
    resolver: zodResolver(CopyCreatorInput),
  })

  const sendPrompt = async ({ toneOfVoice, targetAudiences, callToAction, copyLength }) => {
    setResult({
      headlines: [""],
      marketingTexts: [""],
    })
    const languageSetting = activeLocale === "en" ? "" : "Respond in Dutch."

    // const prompt = `${DEFAULT_PROMPT} \`\`\` Tone of voice: ${toneOfVoice.join(
    //   ", "
    // )}. Target audience: ${targetAudiences.join(
    //   ", "
    // )}. Length: ${copyLength} words. Call to action: ${callToAction}. \`\`\` ${languageSetting}`

    const prompt = {
      intro: DEFAULT_PROMPT,
      toneOfVoice,
      targetAudiences,
      copyLength,
      callToAction,
      languageSetting,
    }

    try {
      const url = "/api/chat"

      await axios
        .post(url, { prompt })
        .then((response) => setResult(response.data))
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

  const toneOfVoiceSelectData: Array<SelectItem> = TONE_OF_VOICE.sort((a, b) =>
    activeLocale === "en" ? a.en.localeCompare(b.en) : a.nl.localeCompare(b.nl)
  ).map((item) => ({
    label: activeLocale === "en" ? item.en : item.nl,
    value: item.en,
  }))

  const targetAudiencesSelectData: Array<SelectItem> = TARGET_AUDIENCES.sort((a, b) =>
    activeLocale === "en" ? a.en.localeCompare(b.en) : a.nl.localeCompare(b.nl)
  ).map((item) => ({
    label: activeLocale === "en" ? item.en : item.nl,
    value: item.en,
  }))

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
          <Card shadow="sm" style={{ width: 500 }}>
            <Stack align="center" mt="xl" spacing="md">
              <Controller
                control={copyCreatorForm.control}
                name="brandIntro"
                render={({ field, fieldState }) => (
                  <Textarea
                    {...field}
                    label={t("brandIntro.label")}
                    placeholder={t("brandIntro.placeholder")}
                    minRows={4}
                    classNames={{ root: classes.root }}
                    disabled={loading}
                    error={fieldState.error && <span>{fieldState.error.message}</span>}
                  />
                )}
              />
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
              {/* <Controller
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
              /> */}
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
        {result.headlines.length > 1 && (
          <Card shadow="sm" style={{ width: 500, minHeight: 300 }}>
            <Group>
              {result.headlines.map((headline, index) => (
                <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
                  <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{headline}</Text>
                    <Badge color="green" variant="light">
                      Live AI content
                    </Badge>
                  </Group>

                  <Text size="sm" color="dimmed">
                    {result.marketingTexts[index]}
                  </Text>

                  <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                    Select this article
                  </Button>
                </Card>
              ))}
            </Group>
          </Card>
        )}
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
