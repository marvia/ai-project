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
import { useDisclosure } from "@mantine/hooks"
import { useCompletion } from "ai/react"
import axios from "axios"
import { GetStaticPropsContext } from "next"
import { useTranslations } from "next-intl"
import { useRouter } from "next/router"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import ChannelSelectionModal from "src/core/components/ChannelSelectionModal"
import { BRAND_INTRO, TARGET_AUDIENCES, TONE_OF_VOICE } from "src/core/copy-creator/constants"
import { CopyCreatorInput } from "src/core/copy-creator/zod"
import Layout from "src/core/layouts/Layout"
import { AvailableLocale } from "src/types"
;("use client")

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
  const [firstRenderHeadline, setFirstRenderHeadline] = useState(true)
  const [modals, setModals] = useState([
    { id: 0, isOpen: false, disclosure: useDisclosure(false) },
    { id: 1, isOpen: false, disclosure: useDisclosure(false) },
    { id: 2, isOpen: false, disclosure: useDisclosure(false) },
  ])

  const { complete, completion, isLoading } = useCompletion({
    api: "/api/completion",
    onResponse: (res) => {
      // trigger something when the response starts streaming in
      // e.g. if the user is rate limited, you can show a toast
      if (res.status === 429) {
        toast.error("You are being rate limited. Please try again later.")
      }
    },
    onFinish: () => {
      // do something with the completion result
      toast.success("Successfully generated completion!")
    },
  })

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

  const handleOpenModal = (id) => {
    const updatedModals = modals.map((modal) =>
      modal.id === id ? { ...modal, isOpen: true } : modal
    )
    setModals(updatedModals)
  }

  const handleCloseModal = (id) => {
    const updatedModals = modals.map((modal) =>
      modal.id === id ? { ...modal, isOpen: false } : modal
    )
    setModals(updatedModals)
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

  const handleStreamHeadline = async (index) => {
    setFirstRenderHeadline(false)
    await complete(result.headlines[index] || "")
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
                    required
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
                    required
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
                    required
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

        {result.headlines.length > 1 && (
          <Group>
            <Card key={1} shadow="sm" padding="lg" radius="md" withBorder maw={395} mih={350}>
              <Stack align="center" justify="space-between" h={400}>
                <Card mih={100}>
                  {firstRenderHeadline ? (
                    <Text weight={500} pos="relative">
                      <LoadingOverlay visible={loading} overlayBlur={2} /> {result.headlines[0]}
                    </Text>
                  ) : (
                    <Text weight={500} pos="relative">
                      {completion}
                    </Text>
                  )}
                </Card>
                <Group position="apart" mt="md" mb="xs">
                  <Button
                    onClick={handleStreamHeadline}
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
                <ChannelSelectionModal
                  opened={modals[0]?.isOpen || false}
                  close={() => handleCloseModal(0)}
                  content={result.marketingTexts[0] || ""}
                  contentTitle={result.headlines[0] || ""}
                />

                <Text size="sm" color="dimmed">
                  {result.marketingTexts[0]}
                </Text>

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() => handleOpenModal(0)}
                >
                  Select a channel for this content
                </Button>
              </Stack>
            </Card>

            <Card key={0} shadow="sm" padding="lg" radius="md" withBorder maw={395} mih={350}>
              <Stack align="center" justify="space-between" h={400}>
                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500} pos="relative">
                    <LoadingOverlay visible={loading} overlayBlur={2} /> {result.headlines[1]}
                  </Text>

                  <Button
                    onClick={() => handleStreamHeadline(0)}
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
                <ChannelSelectionModal
                  opened={modals[1]?.isOpen || false}
                  close={() => handleCloseModal(1)}
                  content={result.marketingTexts[1] || ""}
                  contentTitle={result.headlines[1] || ""}
                />

                <Text size="sm" color="dimmed">
                  {result.marketingTexts[1]}
                </Text>

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() => handleOpenModal(1)}
                >
                  Select a channel for this content
                </Button>
              </Stack>
            </Card>

            <Card key={2} shadow="sm" padding="lg" radius="md" withBorder maw={395} mih={350}>
              <Stack align="center" justify="space-between" h={400}>
                <Group position="apart" mt="md" mb="xs">
                  <Text weight={500} pos="relative">
                    <LoadingOverlay visible={loading} overlayBlur={2} /> {result.headlines[2]}
                  </Text>

                  <Button
                    onClick={() => handleStreamHeadline}
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
                <ChannelSelectionModal
                  opened={modals[2]?.isOpen || false}
                  close={() => handleCloseModal(2)}
                  content={result.marketingTexts[2] || ""}
                  contentTitle={result.headlines[2] || ""}
                />

                <Text size="sm" color="dimmed">
                  {result.marketingTexts[2]}
                </Text>

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() => handleOpenModal(2)}
                >
                  Select a channel for this content
                </Button>
              </Stack>
            </Card>
          </Group>
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
