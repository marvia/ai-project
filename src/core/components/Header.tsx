import { useRouter } from "next/router"
import { Flex, Header, Select, Title, createStyles, Group, SelectItem } from "@mantine/core"
import Link from "next/link"

const AppHeader: React.FC = () => {
  const router = useRouter()
  const { classes } = useStyles(undefined, { name: AppHeader.name })
  const { locale, locales } = router

  const handleChangeLocale = async (newLocale: string) => {
    const { pathname, query } = router
    await router.push({ pathname, query }, undefined, { locale: newLocale })
  }

  const localeOptions: Array<SelectItem> =
    locales?.map((loc: string) => ({ label: loc.toUpperCase(), value: loc })) || []

  return (
    <Header height={150} classNames={{ root: classes.root }}>
      <Flex align="center" justify="center" direction="column">
        <Group>
          <Link href={"/"}>Home</Link>
          <Link href={"/brand"}>Brand inspirition</Link>
          <Link href={"/copy-creator"}>Copy creator</Link>
          <Link href={"/japanese"}>Japanese</Link>
        </Group>
        <Title mb="lg">MARVIA AI</Title>

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
