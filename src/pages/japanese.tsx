import { Fragment, useState } from "react"
import { BlitzPage } from "@blitzjs/next"
import { GetStaticPropsContext } from "next"
import { Japanese } from "src/core/components/useCase3/Japanese"
import axios from "axios"

const JapanesePage: BlitzPage = () => {
  return (
    <Fragment>
      <Japanese />
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

export default JapanesePage
