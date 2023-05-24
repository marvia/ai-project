import { Fragment } from "react"
import { BlitzPage } from "@blitzjs/next"
import { BrandIntroVariant } from "src/core/components/useCase1/brandIntroVariant"
import { GetStaticPropsContext } from "next"

const Home: BlitzPage = () => {
  return (
    <Fragment>
      <BrandIntroVariant />
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
