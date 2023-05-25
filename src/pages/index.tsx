import { Fragment } from "react"
import { BlitzPage } from "@blitzjs/next"
import { BrandIntroVariant } from "src/core/components/useCase1/brandIntroVariant"
import { GetStaticPropsContext } from "next"
import Layout from "src/core/layouts/Layout"

const Home: BlitzPage = () => {
  return (
    <Fragment>
      <Layout>Home</Layout>
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
