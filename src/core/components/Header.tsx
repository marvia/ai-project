import { useRouter } from "next/router"
import { Flex, Header, Select, Title, createStyles, Group, SelectItem, Image } from "@mantine/core"
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
    <Header height={200} classNames={{ root: classes.root }}>
      <Flex align="center" justify="center" direction="column">
        <Title mb="lg">
          <Link href="/">
            <Image alt="Logo" src="Marvia_logo_02_RGB White.svg" maw={200}></Image>
          </Link>
        </Title>
        <Group mt="lg">
          <Link href={"/"} className={classes.link}>
            Home
          </Link>
          {/* <Link href={"/brand"}>Brand inspiration</Link>
          <Link href={"/japanese"}>Japanese</Link> */}
          <Link href={"/copy-creator"} className={classes.link}>
            Copy creator
          </Link>
          <Link href={"/copy-creator2"} className={classes.link}>
            Copy creator 2
          </Link>
          <Link href={"/image-descriptor"} className={classes.link}>
            Image descriptor
          </Link>

          <Select
            className={classes.localeSwitcher}
            data={localeOptions}
            defaultValue={locale}
            onChange={(e) => e && handleChangeLocale(e)}
            size="xs"
          />
        </Group>
      </Flex>
    </Header>
  )
}

const useStyles = createStyles(({ colors }) => ({
  root: {
    backgroundColor: "#13b38b",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  link: {
    color: "white",
  },

  localeSwitcher: {
    width: 80,
  },
}))

export default AppHeader
