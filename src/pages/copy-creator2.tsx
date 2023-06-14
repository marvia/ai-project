import { zodResolver } from "@hookform/resolvers/zod"
import {
  Badge,
  Button,
  Card,
  Center,
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
import { useEffect, useState } from "react"
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
import { text } from "stream/consumers"
import ChannelSelect from "src/core/copy-creator2/ChannelSelect"
import Instagram from "src/core/copy-creator2/Instagram"
import Link from "next/link"
import { IconHome2 } from "@tabler/icons-react"
import Audience from "src/core/copy-creator2/Audience"
import Style from "src/core/copy-creator2/Style"
import ImageSelect from "src/core/copy-creator2/ImageSelect"

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

  return (
    <Layout title="VIAMAR Copy creator">
      <Stack align="center">
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          miw={1000}
          mih={600}
          className={classes.canvas}
          mt={"lg"}
        >
          <Card.Section>
            <Button
              className={classes.button}
              variant="subtle"
              color="blue"
              onClick={() => setState("start")}
            >
              <IconHome2 />
            </Button>

            {state === "start" && <ChannelSelect setState={setState} />}
            {state === "instagram" && <Instagram setState={setState} setCTA={setCTA} />}
            {state === "audience" && <Audience setState={setState} setAudience={setAudience} />}
            {state === "style" && <Style setState={setState} setStyle={setStyle} />}
            {state === "imageselect" && <ImageSelect setState={setState} />}
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
