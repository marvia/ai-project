import { Fragment } from "react"
import { BlitzPage } from "@blitzjs/next"
import { BrandIntroVariant } from "src/core/components/useCase1/brandIntroVariant"
import { GetStaticPropsContext } from "next"
import Layout from "src/core/layouts/Layout"
import { Tile } from "src/core/components/Tile"
import { SimpleGrid, Col, Grid } from "@mantine/core"

const Home: BlitzPage = () => {
  return (
    <Fragment>
      <Layout>
        <Grid grow>
          <Grid.Col span={2}></Grid.Col>
          <Grid.Col span={6}>
            <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]} spacing={50}>
              <Tile
                image="https://oaidalleapiprodscus.blob.core.windows.net/private/org-FnlNP4fmGbsG8Jm62Nm3pbdt/user-JkMRkDYuHBhX7TQ93y3rZfh1/img-sEnsd6pElo7fJCQe49VNzP8r.png?st=2023-05-25T08%3A27%3A06Z&se=2023-05-25T10%3A27%3A06Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-25T00%3A56%3A12Z&ske=2023-05-26T00%3A56%3A12Z&sks=b&skv=2021-08-06&sig=jYm%2BUo/x%2BGj8fTnUmuwhY52xRCpgp8U9J%2BuR4PMbzkc%3D"
                title="Brand inspiration"
                category="brand"
              />
              <Tile
                image="https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/301941701_385958330371199_4625219536899761725_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e3f864&_nc_ohc=JcLIc7rYpvEAX9hGS-n&_nc_ht=scontent-ams4-1.xx&oh=00_AfD3wxL9TdpG4bEmu_UepwrA5nW4OPz3V5V18Rr8kyogow&oe=64744A70"
                title="Copy creator"
                category="copy-creator"
              />
              {/* <Tile
                image="https://uniqueoptiek.nl/wp-content/uploads/2022/11/receptor_black_cx1_indoor_dt_view_600x_kleurenblindbril_enchroma-100x100.jpg"
                title="glass"
                category="chroma"
              /> */}
            </SimpleGrid>
          </Grid.Col>
          <Grid.Col span={2}></Grid.Col>
        </Grid>
      </Layout>
    </Fragment>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../translations/${locale}.json`)).default,
    },
  }
}

export default Home
