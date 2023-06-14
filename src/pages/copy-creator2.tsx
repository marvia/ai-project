import { Button, Card, SelectItem, Stack, createStyles } from "@mantine/core"
import { useState } from "react"
import Layout from "src/core/layouts/Layout"
import { useTranslations } from "next-intl"
import { GetStaticPropsContext } from "next"
import axios from "axios"
import { DEFAULT_PROMPT } from "src/core/copy-creator/constants"
import ChannelSelect from "src/core/copy-creator2/ChannelSelect"
import Instagram from "src/core/copy-creator2/Instagram"
import { IconHome2 } from "@tabler/icons-react"
import Audience from "src/core/copy-creator2/Audience"
import Style from "src/core/copy-creator2/Style"
import GeneratePost from "src/core/copy-creator2/GeneratePost"

interface Response2Object {
  url: string
}

interface Response2 extends Array<Response2Object> {}

const lengtSelectData: Array<SelectItem> = [
  { label: "Short", value: "0 - 20" },
  { label: "Medium", value: "20 - 100" },
  { label: "Long", value: "100 - 500" },
]

interface CopyCreatorResponseType {
  headlines: Array<string>
  marketingTexts: Array<string>
}

function CopyCreator2(): JSX.Element {
  const t = useTranslations("copyCreator2")
  const { classes } = useStyles(undefined, { name: CopyCreator2.name })

  const [state, setState] = useState("start")
  const [cta, setCTA] = useState("")
  const [audience, setAudience] = useState("")
  const [style, setStyle] = useState("")
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<CopyCreatorResponseType>()
  const [response2, setResponse2] = useState<Response2>([{ url: "" }])

  const prompt = {
    intro: DEFAULT_PROMPT,
    toneOfVoice: style,
    targetAudiences: audience,
    callToAction: cta,
  }

  if (style) {
    try {
      const url = "/api/cc2"

      axios
        .post(url, { prompt })
        .then((response) => {
          setResult(response.data)
          setStyle("")
        })
        .then(() =>
          axios
            .post("/api/image", { prompt: "Coffee beans and cup of coffee: " + cta })
            .then((res) => {
              setResponse2(res.data)
            })
            .catch(function (error) {
              console.log(error)
            })
        )
        .then(() => setLoading(false))
        .then(() => setStyle(""))
        .catch((error) => {
          console.error(error.message)
          throw new Error("FAAAAIIL")
        })
    } catch (e) {
      console.error(e.message)
      throw new Error("FAAAAIIL")
    }
  }

  return (
    <Layout title="VIAMAR Copy creator">
      <Stack align="center">
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          miw={1000}
          mih={700}
          className={classes.canvas}
          mt={"lg"}
        >
          <Card.Section>
            <Button
              className={classes.button}
              variant="subtle"
              color="blue"
              onClick={() => {
                setState("start")
                setResponse2([{ url: "" }])
                setResult(undefined)
                setLoading(true)
                setStyle("")
              }}
            >
              <IconHome2 />
            </Button>

            {state === "start" && <ChannelSelect setState={setState} />}
            {state === "instagram" && <Instagram setState={setState} setCTA={setCTA} />}
            {state === "audience" && <Audience setState={setState} setAudience={setAudience} />}
            {state === "style" && <Style setState={setState} setStyle={setStyle} />}
            {state === "generate" && (
              <GeneratePost setState={setState} loading={loading} text={result} image={response2} />
            )}
          </Card.Section>
        </Card>
      </Stack>
    </Layout>
  )
}

const useStyles = createStyles(() => ({
  root: { width: "100%" },
  button: {
    borderRadius: "0px",
    ":hover": { backgroundColor: "#00386b" },
  },
  canvas: {
    backgroundColor: "#00386b",
  },
}))

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../translations/${locale}.json`)).default,
    },
  }
}

export default CopyCreator2
