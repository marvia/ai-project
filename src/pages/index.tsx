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
              {/* <Tile
                image="https://www.2foodtrippers.com/wp-content/uploads/2019/08/Flat-White-at-Koffie-Academie-in-Amsterdam-735x490.jpg"
                title="Brand inspiration"
                category="brand"
              /> */}
              <Tile
                image="https://i.imgur.com/HGKuuLQ.jpg"
                title="Copy creator"
                category="copy-creator"
              />
              {/* <Tile
                image="https://images.jacobinmag.com/2017/03/33488189702_f1eb2cf3d1_k.jpg"
                title="Japanese Translations"
                category="japanese"
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
