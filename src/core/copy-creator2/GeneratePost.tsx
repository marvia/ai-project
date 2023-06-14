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

function ImageSelect({ setState }): JSX.Element {
  const { classes, theme } = useStyles(undefined, { name: ImageSelect.name })
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setState("image")
    }
  }

  return (
    <Center mih={600} miw={900}>
      <Stack>
        <Title order={2} color="white" align="center">
          SELECT IMAGE
        </Title>

        <UnstyledButton
          onKeyDown={handleKeyDown}
          onClick={() => setInputValue("witty, informative, serious")}
        >
          <Image
            alt="Lekkere koffie"
            src={"sicilia-coffee-double-roast_95a74757-50f8-4b24-8cfa-a307b94e318f_large.webp"}
          />
        </UnstyledButton>
      </Stack>
    </Center>
  )
}

export default ImageSelect

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
