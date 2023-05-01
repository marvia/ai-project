import { Paper, Text, Textarea, Button, Group, createStyles, rem, Divider } from "@mantine/core"
import { Fragment, useEffect, useRef, useState } from "react"
import bg from "../bg.svg"
import viaMarBG from "../viamar.jpg"
import axios from "axios"

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan("sm")

  return {
    wrapper: {
      display: "flex",
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      borderRadius: theme.radius.lg,
      padding: rem(4),
      border: `${rem(1)} solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[2]
      }`,

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },

    form: {
      boxSizing: "border-box",
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: `calc(${theme.spacing.xl} * 2)`,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },

    fields: {
      marginTop: rem(-12),
    },

    fieldInput: {
      flex: 1,

      "& + &": {
        marginLeft: theme.spacing.md,

        [BREAKPOINT]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },

    fieldsGroup: {
      display: "flex",

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },

    contacts: {
      boxSizing: "border-box",
      position: "relative",
      borderRadius: theme.radius.lg,
      backgroundImage: `url(${bg.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      border: `${rem(1)} solid transparent`,
      padding: theme.spacing.xl,
      flex: `0 0 ${rem(600)}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },

    slogans: {
      boxSizing: "border-box",
      position: "relative",
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.blue[5],
      backgroundSize: "cover",
      backgroundPosition: "center",
      border: `${rem(1)} solid transparent`,
      padding: theme.spacing.xl,
      flex: `0 0 ${rem(300)}`,
      minHeight: rem(100),
      marginBottom: theme.spacing.md,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },

    title: {
      marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },

    control: {
      [BREAKPOINT]: {
        flex: 1,
      },
    },
  }
})

export function BrandIntroVariant() {
  interface Response1 {
    brand_intro: string
    slogans: string[]
  }

  const [inputValue, setInputValue] = useState("")
  const firstButtonText =
    "We are ViaMar a sustainable coffee brand that is committed to the environment."
  const [response1, setResponse1] = useState<Response1>({ brand_intro: "", slogans: [] })
  const [response2, setResponse2] = useState("")
  const [loading, setLoading] = useState(false)
  const { classes } = useStyles()

  console.log(response1)
  console.log(response2)

  const question =
    "Perform the following actions \
    - read the text delimited by triple backticks\
    - output a json object that contains an enticing brand introduction based on the text you red and an array of 6 brand slogans based on the brand introduction. \
    the brand slogans should be unique and should motivate the reader to buy the product. \
    keys: brand_intro, slogans."

  const handleSubmit = async (e) => {
    e.preventDefault()
    const varPrompt = "```" + inputValue + "```"
    setLoading(true)
    axios.post("http://localhost:8080/chat", { prompt: question + varPrompt }).then((res) => {
      setLoading(false)
      setResponse1(res.data)
    })
  }

  const genereRateImage = async (e) => {
    const brandTags = response1.slogans.join(" ")
    e.preventDefault()

    axios.post("http://localhost:8080/image", { prompt: response1.brand_intro }).then((res) => {
      setLoading(false)
      setResponse2(res.data)
    })
  }

  console.log(response2)

  return (
    <Fragment>
      <Paper shadow="md" radius="lg">
        <div className={classes.wrapper}>
          <div className={classes.contacts}>
            <Text fz="lg" fw={700} className={classes.title} c="#fff">
              Brand intro variant
            </Text>

            <Divider />

            <Text fz="sm" className={classes.title} c="#fff">
              {response1.brand_intro}
            </Text>
          </div>

          <form className={classes.form} onSubmit={handleSubmit}>
            <Text fz="lg" fw={700} className={classes.title}></Text>

            <div className={classes.fields}>
              <Textarea
                mt="md"
                label="Your current brand introduction"
                placeholder=""
                minRows={10}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <Group position="right" mt="md">
                <Button type="submit" className={classes.control} disabled={loading}>
                  Send message
                </Button>
                <Button disabled={loading} onClick={() => setInputValue(firstButtonText)}>
                  {firstButtonText}
                </Button>
              </Group>
            </div>
          </form>
        </div>
      </Paper>
      <Divider mb={50} />
      <Paper>
        <Group>
          {response1.slogans.map((slogan, index) => {
            return (
              <div key={index} className={classes.slogans}>
                <div className={classes.graffiti}>
                  <Text>{slogan}</Text>
                </div>{" "}
              </div>
            )
          })}
        </Group>
      </Paper>

      <Paper>
        <Button onClick={genereRateImage}> Generate Image </Button>
        {response2 && (
          <div>
            {" "}
            <img src={response2} alt="" />
          </div>
        )}
      </Paper>
    </Fragment>
  )
}
