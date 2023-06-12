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
import { useMemo, useState } from "react"
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

  const [image1, setImage1] = useState<string>("")

  const uploadImage = () => {
    let r = (Math.random() + 1).toString(36).substring(7)
    setImage1("https://picsum.photos/seed/" + r + "/400/400")
  }

  console.log(image1)

  const imageApi = `https://ai-alt-text-generator-nu-liard.vercel.app/api/generate?imageUrl=${image1}`

  const reset = () => {
    setImage1("")
    setResult("")
  }

  const getImageDescription = async () => {
    try {
      await axios
        .get(imageApi)
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

  console.log(result)

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
          {image1 !== "" && (
            <Card.Section>
              <Image src={image1} height={500} alt="example 1" />
            </Card.Section>
          )}

          <Text mt={10} size="lg" align="center">
            {result}
          </Text>

          {image1 === "" && (
            <Button
              variant="light"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
              onClick={uploadImage}
            >
              Upload image
            </Button>
          )}

          {image1 !== "" && (
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
          )}

          {result !== "" && (
            <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={reset}>
              New
            </Button>
          )}
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
