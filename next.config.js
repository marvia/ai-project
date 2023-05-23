// @ts-check
const { withBlitz } = require("@blitzjs/next")

/**
 * @type {import('@blitzjs/next').BlitzConfig}
 **/
const config = {
  i18n: {
    locales: ["en", "nl"],
    defaultLocale: "en",
    localeDetection: false,
  },
}

module.exports = withBlitz(config)
