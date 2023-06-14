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
  Menu,
  ActionIcon,
  Skeleton,
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
  IconDotsVertical,
  IconFileZip,
  IconEye,
  IconTrash,
  IconDiscountCheckFilled,
  IconHeart,
  IconAt,
  IconArrowUpRightCircle,
} from "@tabler/icons-react"
import { useState } from "react"

function GeneratePost({ setState, loading, text, image }): JSX.Element {
  const { classes, theme } = useStyles(undefined, { name: GeneratePost.name })
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setState("image")
    }
  }

  const child = <Skeleton width={400} height={500} radius="lg" animate={true} />

  return (
    <Center mih={600} miw={900}>
      {loading ? (
        child
      ) : (
        <Card shadow="lg" radius="lg" maw={400}>
          <Card.Section inheritPadding py="xs">
            <Group position="apart">
              <Group position="left" spacing={6}>
                <Image alt="profile pic" src="profilepic.png" maw={40} />
                <Text weight={900}>ViaMar</Text>
                <Image
                  alt="verified"
                  src="https://static.xx.fbcdn.net/assets/?revision=778363097095560&name=ig-verifiedbadge-shared&density=1"
                  maw={15}
                />
              </Group>
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon>
                    <IconDotsVertical size="1rem" />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item icon={<IconFileZip size={rem(14)} />}>Download zip</Menu.Item>
                  <Menu.Item icon={<IconEye size={rem(14)} />}>Preview all</Menu.Item>
                  <Menu.Item icon={<IconTrash size={rem(14)} />} color="red">
                    Delete all
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Card.Section>

          <Card.Section>
            {image && <Image width={"101%"} alt="picture" src={image[0].url} />}
          </Card.Section>

          <Card.Section mt="sm" pb="md">
            <Group position="left" pl={10}>
              <IconHeart size="1.5rem" />
              <IconAt size="1.5rem" />
              <IconArrowUpRightCircle size="1.5rem" />
            </Group>
            <Text size={"xs"} px={11} pt={5} weight={700} color="black">
              1 million likes in the making
            </Text>
            <Text size={"xs"} p={10} color="black">
              {text}
            </Text>
          </Card.Section>

          <Card.Section></Card.Section>
        </Card>
      )}
    </Center>
  )
}

export default GeneratePost

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
