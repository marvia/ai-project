import {
  Paper,
  Text,
  Textarea,
  Button,
  Group,
  createStyles,
  rem,
  Divider,
  Skeleton,
  Container,
  Grid,
  Card,
  Stack,
} from "@mantine/core"
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
      borderRadius: theme.radius.lg,
      backgroundImage: `url(${bg.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      border: `${rem(1)} solid transparent`,

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

export function TextControl() {
  const [inputValue, setInputValue] = useState("")
  const firstButtonText =
    "We are ViaMar a sustainable coffee brand that is committed to the environment."
  const [response1, setResponse1] = useState("")
  const [loading, setLoading] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { classes, theme } = useStyles()

  const question =
    "Perform the following actions \
    here comes a text delimited by triple backticks\
    - Answer the following questions about the text\
    - Are there any spelling errors?\
    - Are there any grammar errors?\
    - Do you suggest someone should look at this again, yes/no?\
    - rewrite the text in your own words\
    Answer in Dutch, only output the answers.\
    "

  const handleSubmit = async (e) => {
    e.preventDefault()
    setResponse1("")
    const varPrompt = "```" + inputValue + "```"
    setLoading(true)
    await axios.post("http://localhost:8080/chat", { prompt: question + varPrompt }).then((res) => {
      setResponse1(res.data)
    })

    setLoading(false)
  }

  const child = <Skeleton height={140} radius="md" animate={true} />

  return (
    <Fragment>
      <Paper shadow="md" radius="lg">
        <div className={classes.wrapper}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Text fz="lg" fw={700} className={classes.title}></Text>

            <div className={classes.fields}>
              <Textarea
                mt="md"
                label="Your current brand introduction"
                placeholder=""
                minRows={5}
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
        <div>
          <Container my="md">
            {loading && (
              <Grid>
                <Grid.Col xs={12}>{child}</Grid.Col>
              </Grid>
            )}

            {response1 && (
              <Grid>
                <Grid.Col xs={12}>
                  <Card shadow="sm" padding="xl" component="a" target="_blank">
                    <Text weight={500} size="lg" mt="md">
                      Text analysis
                    </Text>

                    <Text mt="xs" color="dimmed" size="sm">
                      {response1}
                    </Text>
                  </Card>
                </Grid.Col>
              </Grid>
            )}
          </Container>
        </div>

        {/* response2 is an array with objects containing url: imageUrl  loop through the array and show the separate images*/}
      </Paper>
    </Fragment>
  )
}
