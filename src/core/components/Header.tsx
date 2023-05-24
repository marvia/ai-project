import { useRouter } from "next/router"
import { Header, Text, Title } from "@mantine/core"

const AppHeader: React.FC = () => {
  const router = useRouter()
  const { locale, locales, defaultLocale } = router

  const handleChangeLocale = (newLocale: string) => {
    const { pathname, query } = router
    router.push({ pathname, query }, undefined, { locale: newLocale })
  }

  return (
    <Header height={80}>
      <Title>MARVIA AI</Title>
      {/* <nav> */}
      <ul>
        {locales?.map((loc: string) => (
          <li key={loc}>
            <button type="button" onClick={() => handleChangeLocale(loc)} disabled={loc === locale}>
              {loc}
            </button>
          </li>
        ))}
      </ul>
      {/* </nav> */}
    </Header>
  )
}

export default AppHeader
