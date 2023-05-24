import {
  Paper,
  Text,
  Textarea,
  Button,
  Group,
  createStyles,
  rem,
  Skeleton,
  Container,
  Grid,
  Card,
  Stack,
  Image,
} from "@mantine/core"
import { Fragment, useEffect, useState } from "react"
import bg from "../bg.svg"
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

export function BrandIntroVariant() {
  interface Response1 {
    brand_story: string
    who_we_are: string
    promise: string
    mission: string
    vision: string
    values: string
    product: string
    slogans: string[]
  }

  interface Response2Object {
    url: string
  }

  interface Response2 extends Array<Response2Object> {}

  const [inputValue, setInputValue] = useState("")
  const firstButtonText =
    "We are ViaMar a sustainable coffee brand that is committed to the environment."
  const [response1, setResponse1] = useState<Response1>({
    brand_story: "",
    who_we_are: "",
    promise: "",
    mission: "",
    vision: "",
    values: "",
    product: "",
    slogans: [""],
  })
  const [response2, setResponse2] = useState<Response2>([{ url: "" }])
  const [loading, setLoading] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { classes, theme } = useStyles()

  const question =
    "Perform the following actions \
    - read the text delimited by triple backticks\
    - output a json object that contains the following keys and values\
    - a brand story with a minimum of 25 words\
    - a who we are with a minimum of 20 words\
    - a promise in more than 10 words\
    - a mission in 20 words or less\
    - a vision 10 words or less\
    - 3 brand values\
    - answer the question: what product or products does the brand sell?\
    - based on the text include an array of 6 brand slogans based on the brand introduction. \
    the brand slogans should be unique and should motivate the reader to buy the product. \
    - the json object should adhere to the following keys\
     keys: brand_story,who_we_are,promise,mission,vision,values,product, slogans.\
     - your output may only contain the json object and nothing else.\
    - your output should be valid json."

  const handleSubmit = async (e) => {
    e.preventDefault()
    setResponse1({
      brand_story: "",
      who_we_are: "",
      promise: "",
      mission: "",
      vision: "",
      values: "",
      product: "",
      slogans: [""],
    })
    setResponse2([{ url: "" }])
    const varPrompt = "```" + inputValue + "```"
    setLoading(true)
    await axios
      .post("https://ai-project-wine.vercel.app/api/chat", { prompt: question + varPrompt })
      .then((res) => {
        setResponse1(res.data)
      })
      .catch(function (error) {
        console.log(error)
      })

    setLoading(false)
  }

  // useeffect to get image when response1 is in

  useEffect(() => {
    if (!response1.who_we_are) return
    setResponse2([{ url: "" }])
    axios
      .post("https://ai-project-wine.vercel.app/api/chat", { prompt: response1.who_we_are })
      .then((res) => {
        setResponse2(res.data)
        setImageLoaded(true)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [response1])

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
                <Grid.Col xs={4}>{child}</Grid.Col>

                <Grid.Col xs={8}>
                  <Stack>
                    {child}
                    {child}
                  </Stack>
                </Grid.Col>
                <Grid.Col xs={4}></Grid.Col>

                <Grid.Col xs={4}>{child}</Grid.Col>
                <Grid.Col xs={4}>{child}</Grid.Col>
                <Grid.Col xs={4}>{child}</Grid.Col>
                <Grid.Col xs={4}>{child}</Grid.Col>
                <Grid.Col xs={4}>{child}</Grid.Col>
              </Grid>
            )}

            {response1.brand_story && (
              <Grid>
                <Grid.Col xs={4}>
                  <Card shadow="sm" padding="xl" component="a" target="_blank">
                    <Text weight={500} size="lg" mt="md">
                      Brand story
                    </Text>

                    <Text mt="xs" color="dimmed" size="sm">
                      {response1.brand_story}
                    </Text>
                  </Card>
                  <Stack>
                    {response1.slogans.map((slogan, index) => (
                      <Card
                        key={index}
                        style={{ backgroundColor: theme.colors.blue[index] }}
                        shadow="sm"
                        padding="xl"
                        component="a"
                        target="_blank"
                      >
                        <Text weight={500} size="lg" mt="md">
                          {slogan}
                        </Text>
                      </Card>
                    ))}
                  </Stack>
                </Grid.Col>
                <Grid.Col xs={8}>
                  <Stack>
                    {" "}
                    <Card shadow="sm" padding="xl" component="a" target="_blank">
                      <Card.Section></Card.Section>

                      <Text weight={500} size="lg" mt="md">
                        Who we are
                      </Text>

                      <Text mt="xs" color="dimmed" size="sm">
                        {response1.who_we_are}
                      </Text>
                    </Card>
                    <Card shadow="sm" padding="xl" component="a" target="_blank">
                      <Text weight={500} size="lg" mt="md">
                        Our promise
                      </Text>

                      <Text mt="xs" color="dimmed" size="sm">
                        {response1.promise}
                      </Text>
                    </Card>
                    <Card shadow="sm" padding="xl" component="a" target="_blank">
                      <Text weight={500} size="lg" mt="md">
                        Mission
                      </Text>

                      <Text mt="xs" color="dimmed" size="sm">
                        {response1.mission}
                      </Text>
                    </Card>
                    <Card shadow="sm" padding="xl" component="a" target="_blank">
                      <Text weight={500} size="lg" mt="md">
                        Vision
                      </Text>

                      <Text mt="xs" color="dimmed" size="sm">
                        {response1.vision}
                      </Text>
                    </Card>
                    <Card shadow="sm" padding="xl" component="a" target="_blank">
                      <Text weight={500} size="lg" mt="md">
                        values
                      </Text>

                      <Text mt="xs" color="dimmed" size="sm">
                        {response1.values}
                      </Text>
                    </Card>
                    <Card shadow="sm" padding="xl" component="a" target="_blank">
                      <Text weight={500} size="lg" mt="md">
                        Product
                      </Text>

                      <Text mt="xs" color="dimmed" size="sm">
                        {response1.product}
                      </Text>
                    </Card>
                  </Stack>
                </Grid.Col>
              </Grid>
            )}
          </Container>
        </div>

        {/* response2 is an array with objects containing url: imageUrl  loop through the array and show the separate images*/}
        {imageLoaded && (
          <div>
            <Container my="md">
              {response2.length > 0 && (
                <Grid>
                  {response2.map((item, index) => (
                    <Grid.Col key={index} xs={4}>
                      <Card shadow="sm" padding="xl" component="a" target="_blank">
                        <Image alt={"generated image"} src={item.url} />
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>
              )}
            </Container>
          </div>
        )}
      </Paper>
    </Fragment>
  )
}
