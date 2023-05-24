import { useRouter } from "next/router"
import { Flex, Header, Select, Title, createStyles } from "@mantine/core"
import { useTranslations } from "next-intl"
import Link from "next/link"

const AppHeader: React.FC = () => {
  const router = useRouter()
  const { classes } = useStyles(undefined, { name: AppHeader.name })
  const { locale, locales } = router
  const t = useTranslations("localeSwitcher")

  const handleChangeLocale = (newLocale: string) => {
    const { pathname, query } = router
    router.push({ pathname, query }, undefined, { locale: newLocale })
  }

  const localeOptions =
    locales?.map((loc: string) => ({ label: loc.toUpperCase(), value: loc })) || []

  return (
    <Header height={150} classNames={{ root: classes.root }}>
      <Flex align="center" justify="center" direction="column">
        <Title mb="lg">
          <Link href="/">MARVIA AI</Link>
        </Title>

        <Select
          className={classes.localeSwitcher}
          data={localeOptions}
          defaultValue={locale}
          onChange={(e) => e && handleChangeLocale(e)}
        />
      </Flex>
    </Header>
  )
}

const useStyles = createStyles(({ colors }) => ({
  root: {
    backgroundColor: colors.blue[7],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  localeSwitcher: {
    width: 80,
  },
}))

export default AppHeader
