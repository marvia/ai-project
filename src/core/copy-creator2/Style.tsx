import { C } from "@blitzjs/auth/dist/index-cd820427"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Card,
  Center,
  SimpleGrid,
  Image,
  Group,
  Text,
  Badge,
  Button,
  createStyles,
  Anchor,
  rem,
  UnstyledButton,
  Input,
  Stack,
  Title,
  TextInput,
} from "@mantine/core"
import { useRouter } from "next/router"
import {
  IconCreditCard,
  IconBuildingBank,
  IconRepeat,
  IconReceiptRefund,
  IconReceipt,
  IconReceiptTax,
  IconReport,
  IconCashBanknote,
  IconCoin,
  IconBrandInstagram,
} from "@tabler/icons-react"
import { useState } from "react"

function Style({ setState, setStyle }): JSX.Element {
  const { classes, theme } = useStyles(undefined, { name: Style.name })
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setState("imageselect")
    }
  }

  return (
    <Center mih={600} miw={900}>
      <Stack>
        <Title order={2} color="white" align="center">
          TONE OF VOICE
        </Title>
        <TextInput
          classNames={{ input: classes.input }}
          variant="unstyled"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          value={inputValue}
          miw={600}
        />
        <UnstyledButton
          onKeyDown={handleKeyDown}
          onClick={() => setInputValue("witty, informative, serious")}
        >
          <Text align="center" color="dimmed">
            eg: witty, informative, serious
          </Text>
        </UnstyledButton>
      </Stack>
    </Center>
  )
}

export default Style

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.dark[6],
  },
  button: {
    backgroundColor: "#13b38b",
    borderRadius: "0px",
    ":hover": { backgroundColor: "#54c7aa" },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: rem(150),
    backgroundColor: "#022748",
    transition: "box-shadow 150ms ease, transform 100ms ease",
    padding: rem(20),
    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.05)",
    },
  },
  input: {
    border: "none",
    borderBottom: "2px solid #13b38b",
    color: "#ffffff",
    textAlign: "center",
    fontSize: "1.5rem",
  },
}))
