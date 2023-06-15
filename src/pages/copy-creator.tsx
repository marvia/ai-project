import { zodResolver } from "@hookform/resolvers/zod"
import {
  Badge,
  Button,
  Card,
  Group,
  LoadingOverlay,
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
import { BRAND_INTRO, TARGET_AUDIENCES, TONE_OF_VOICE } from "src/core/copy-creator/constants"
import { CopyCreatorInput } from "src/core/copy-creator/zod"
import Layout from "src/core/layouts/Layout"
import { useTranslations } from "next-intl"
import { GetStaticPropsContext } from "next"
import axios from "axios"
import { DEFAULT_PROMPT } from "src/core/copy-creator/constants"
import { AvailableLocale } from "src/types"
import { useDisclosure } from "@mantine/hooks"
import ChannelSelectionModal from "src/core/components/ChannelSelectionModal"

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
  const [opened, { open, close }] = useDisclosure(false)

  const [formInput, setFormInput] = useState({
    brandIntro: "",
    toneOfVoice: "",
    targetAudiences: "",
    callToAction: "",
  })

  const copyCreatorForm = useForm({
    defaultValues: {
      brandIntro: BRAND_INTRO,
      toneOfVoice: "",
      targetAudiences: "",
      callToAction: "",
    },
    resolver: zodResolver(CopyCreatorInput),
  })

  const sendPrompt = async ({ toneOfVoice, targetAudiences, callToAction, brandIntro }) => {
    setResult({
      headlines: [""],
      marketingTexts: [""],
    })

    // Not using this for now, but we might want to add this later.
    // const languageSetting = activeLocale === "en" ? "" : "Respond in Dutch."

    const prompt = {
      intro: brandIntro,
      toneOfVoice,
      targetAudiences,
      callToAction,
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
    setFormInput(values)
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

  async function handleRefreshHeading(index) {
    setLoading(true)
    try {
      const url = "/api/hello"
      const prompt = {
        toneOfVoice: formInput.toneOfVoice,
        targetAudience: formInput.targetAudiences,
        callToAction: formInput.callToAction,
        intro: formInput.brandIntro,
      }

      await axios.post(url, { prompt }).then((response) => {
        setResult((prevResult) => {
          const newHeadlines = [...prevResult.headlines]
          newHeadlines[index] = response.data
          return { ...prevResult, headlines: newHeadlines }
        })
      })
    } catch (error) {
      console.error(error.message)
      throw new Error("FAAAAIIL")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="VIAMAR Copy creator">
      <Title mt="md" order={1} align="center" style={{ color: "#00386b" }}>
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
                  <Select
                    {...field}
                    data={toneOfVoiceSelectData}
                    label={t("toneOfVoice.label")}
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
                  <Select
                    {...field}
                    data={targetAudiencesSelectData}
                    label={t("targetAudience.label")}
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
              <Button
                mt="md"
                type="submit"
                loading={loading}
                disabled={loading}
                className={classes.button}
              >
                ✨ {t("submitButton")} ✨
              </Button>
            </Stack>
          </Card>
        </form>
        {result.headlines?.length > 1 && (
          <Card shadow="sm" style={{ width: 500, minHeight: 300 }}>
            <Group>
              {result.headlines.map((headline, index) => (
                <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
                  <Group position="apart" mt="md" mb="xs">
                    <Text weight={500} pos="relative">
                      <LoadingOverlay visible={loading} overlayBlur={2} />
                      {headline}
                    </Text>
                    <Button
                      onClick={() => handleRefreshHeading(index)}
                      className={classes.button}
                      loading={loading}
                      disabled={loading}
                    >
                      New headline
                    </Button>
                    <Badge color="green" variant="light">
                      Live AI content
                    </Badge>
                  </Group>

                  <Text size="sm" color="dimmed">
                    {result.marketingTexts[index]}
                  </Text>

                  <ChannelSelectionModal
                    opened={opened}
                    close={close}
                    content={result.marketingTexts[index] || ""}
                  />

                  <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={open}>
                    Select a channel for this content
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
  button: { backgroundColor: "#00386b" },
}))

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../translations/${locale}.json`)).default,
    },
  }
}

export default CopyCreator
