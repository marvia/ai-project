import {
  Center,
  Text,
  createStyles,
  rem,
  UnstyledButton,
  Stack,
  Title,
  TextInput,
} from "@mantine/core"
import { useState } from "react"

function Instagram({ setState, setCTA }): JSX.Element {
  const { classes } = useStyles(undefined, { name: Instagram.name })
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setState("audience")
      setCTA(inputValue)
    }
  }

  return (
    <Center mih={600}>
      <Stack>
        <Title order={2} color="white" align="center">
          GOAL OF INSTAGRAM POST
        </Title>

        <TextInput
          classNames={{ input: classes.input }}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          value={inputValue}
          miw={600}
          variant="unstyled"
        />

        <UnstyledButton
          onKeyDown={handleKeyDown}
          onClick={() => setInputValue("buy our double roasted coffee")}
        >
          <Text align="center" color="dimmed">
            eg: buy our double roasted coffee
          </Text>
        </UnstyledButton>
      </Stack>
    </Center>
  )
}

export default Instagram
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
