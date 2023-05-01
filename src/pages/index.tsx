import { Fragment } from "react"
import { BlitzPage } from "@blitzjs/next"
import { BrandIntroVariant } from "src/core/components/useCase1/brandIntroVariant"

const Home: BlitzPage = () => {
  return (
    <Fragment>
      <BrandIntroVariant />
    </Fragment>
  )
}

export default Home
