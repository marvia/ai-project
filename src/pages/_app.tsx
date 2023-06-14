import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React from "react"
import { withBlitz } from "src/blitz-client"
import "src/styles/globals.css"
import { MantineProvider } from "@mantine/core"
import { AbstractIntlMessages, NextIntlProvider } from "next-intl"

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  const messages =
    "messages" in pageProps ? (pageProps.messages as AbstractIntlMessages) : undefined

  return (
    <NextIntlProvider messages={messages}>
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <MantineProvider
          inherit
          theme={{
            components: {
              InputWrapper: {
                styles: (theme) => ({}),
              },

              Input: {
                styles: (theme) => ({}),
              },
            },
          }}
        >
          {getLayout(<Component {...pageProps} />)}
        </MantineProvider>
      </ErrorBoundary>
    </NextIntlProvider>
  )
}

export default withBlitz(MyApp)
