import { Center, SimpleGrid, Text, createStyles, rem, UnstyledButton } from "@mantine/core"

import { IconBrandInstagram } from "@tabler/icons-react"

const mockdata = [
  { title: "Instagram post", icon: IconBrandInstagram, color: "violet", state: "instagram" },
]

function ChannelSelect({ setState }): JSX.Element {
  const { classes } = useStyles(undefined, { name: ChannelSelect.name })

  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={classes.item} onClick={() => setState(item.state)}>
      <item.icon size="8rem" color={item.color} />
      <Text size="xs" mt={7} color="dimmed">
        {item.title}
      </Text>
    </UnstyledButton>
  ))
  return (
    <Center mih={600}>
      <SimpleGrid cols={1}>{items}</SimpleGrid>
    </Center>
  )
}

export default ChannelSelect
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.dark[6],
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
}))
