import { Fragment } from "react"
import { BlitzPage } from "@blitzjs/next"
import { GetStaticPropsContext } from "next"
import Layout from "src/core/layouts/Layout"
import { Tile } from "src/core/components/Tile"
import { SimpleGrid, Grid } from "@mantine/core"

const Home: BlitzPage = () => {
  return (
    <Fragment>
      <Layout>
        <Grid grow>
          <Grid.Col span={2}></Grid.Col>
          <Grid.Col span={6}>
            <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]} spacing={50}>
              <Tile
                image="https://www.2foodtrippers.com/wp-content/uploads/2019/08/Flat-White-at-Koffie-Academie-in-Amsterdam-735x490.jpg"
                title="Brand inspiration"
                category="brand"
              />
              <Tile
                image="https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/301941701_385958330371199_4625219536899761725_n.png?_nc_cat=107&ccb=1-7&_nc_sid=e3f864&_nc_ohc=JcLIc7rYpvEAX9hGS-n&_nc_ht=scontent-ams4-1.xx&oh=00_AfD3wxL9TdpG4bEmu_UepwrA5nW4OPz3V5V18Rr8kyogow&oe=64744A70"
                title="Copy creator"
                category="copy-creator"
              />
              <Tile
                image="https://images.jacobinmag.com/2017/03/33488189702_f1eb2cf3d1_k.jpg"
                title="Japanese Translations"
                category="japanese"
              />
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
