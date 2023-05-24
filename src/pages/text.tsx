import { Fragment } from "react"
import { BlitzPage } from "@blitzjs/next"
import { TextControl } from "src/core/components/useCase2/textCheckVariant"
import { GetStaticPropsContext } from "next"

const Text: BlitzPage = () => {
  return (
    <Fragment>
      <TextControl />
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

export default Text
