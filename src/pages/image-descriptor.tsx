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
  Image,
  Group,
  Badge,
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

const lengtSelectData: Array<SelectItem> = [
  { label: "Short", value: "0 - 20" },
  { label: "Medium", value: "20 - 100" },
  { label: "Long", value: "100 - 500" },
]

function ImageDescriptor(): JSX.Element {
  const [result, setResult] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const { classes } = useStyles(undefined, { name: ImageDescriptor.name })
  const router = useRouter()
  const activeLocale = router.locale as AvailableLocale
  const t = useTranslations("imageDescriptor")
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
    const languageSetting = activeLocale === "en" ? "" : "Respond in Dutch."

    const prompt = `${DEFAULT_PROMPT} \`\`\` Tone of voice: ${toneOfVoice.join(
      ", "
    )}. Target audience: ${targetAudiences.join(
      ", "
    )}. Length: ${copyLength} words. Call to action: ${callToAction}. \`\`\` ${languageSetting}`

    try {
      const url = "/api/chat"

      console.log(prompt)

      await axios
        .post(url, { prompt })
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

  console.log({ result })

  const image1 = "https://i.imgur.com/vRq5YWt.png"
  const imageApi = "https://alt-text-generator.vercel.app/api/generate?imageUrl="

  const getImageDescription = async () => {
    try {
      const url = `${imageApi}${image1}`
      await axios

        .get(url)
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

  return (
    <Layout title="VIAMAR Image Descriptor">
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
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image src={image1} height={500} alt="example 1" />
          </Card.Section>

          <Text size="sm" color="dimmed">
            {result}
          </Text>

          <Button
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            onClick={getImageDescription}
          >
            Describe image
          </Button>
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

export default ImageDescriptor