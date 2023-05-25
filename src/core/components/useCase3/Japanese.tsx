import { useState } from "react"
import Layout from "src/core/layouts/Layout"
import { SimpleGrid, Col, Grid, Textarea } from "@mantine/core"
import axios from "axios"
import { set, string } from "zod"

export const Japanese = () => {
  const [inputValue, setInputValue] = useState("")

  const [response1, setResponse1] = useState<String>("")
  const [translateValues, setTranslateValues] = useState<String>("")
  const [stringifiedValues, setStringifiedValues] = useState<String[]>([""])
  const [loading, setLoading] = useState(false)
  const [stringArray, setStringArray] = useState<String[]>([""])

  const changeEvent = (event) => {
    setInputValue(event.target.value)
  }

  const question = "can you translate this to japanese? \n"

  const handleSubmit = async (e) => {
    e.preventDefault()
    const lines = inputValue.split("\n")
    setLoading(true)
    setResponse1("")
    await axios
      .post("/api/chat", { prompt: question + lines.map((line) => line.trim()).join(",") })
      .then((res) => {
        setResponse1(res.data)
        setStringifiedValues(res.data.split("、"))
      })
      .catch(function (error) {
        console.log(error)
      })

    setLoading(false)
  }

  return (
    <Layout>
      <Grid grow>
        <Grid.Col span={2}></Grid.Col>
        <Grid.Col span={6}>
          <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]} spacing={50}>
            Japanese
            <form onSubmit={handleSubmit}>
              <Textarea
                autosize
                label="What to translate to japanese?"
                onChange={changeEvent}
              ></Textarea>
              <button type="submit">Submit</button>
            </form>
          </SimpleGrid>
          {stringifiedValues &&
            stringifiedValues.map((value, index) => <div key={index}>{value}</div>)}
        </Grid.Col>
        <Grid.Col span={2}></Grid.Col>
      </Grid>
    </Layout>
  )
}
