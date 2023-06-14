import {
  Card,
  Center,
  Image,
  Group,
  Text,
  createStyles,
  rem,
  Menu,
  ActionIcon,
  Skeleton,
} from "@mantine/core"
import {
  IconDotsVertical,
  IconFileZip,
  IconEye,
  IconTrash,
  IconHeart,
  IconAt,
  IconArrowUpRightCircle,
} from "@tabler/icons-react"
import { useEffect, useState } from "react"

function GeneratePost({ setState, text, image, loading }): JSX.Element {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count < 6) {
        setCount(count + 1)
      } else {
        setCount(0)
      }
      console.log(count)
    }, 2000)
    return () => clearTimeout(timer)
  }, [count])

  const child = (
    <Card miw={400} mih={500} radius="lg" bg={"#00386b"}>
      <Center mih={400}>
        {count < 1 && (
          <Text size={"xl"} color="white" weight={700}>
            Calling a Marvian...
          </Text>
        )}
        {count === 1 && (
          <Text size={"xl"} color="white" weight={700}>
            Giving it precice orders...
          </Text>
        )}
        {count === 2 && (
          <Text size={"xl"} color="white" weight={700}>
            Painstaikingly typing out an Instagram post...
          </Text>
        )}
        {count === 3 && (
          <Text size={"xl"} color="white" weight={700}>
            Taking a picture...
          </Text>
        )}
        {count === 4 && (
          <Text size={"xl"} color="white" weight={700}>
            Creating hashtags...
          </Text>
        )}
        {count === 5 && (
          <Text size={"xl"} color="white" weight={700}>
            Taking a break...
          </Text>
        )}
      </Center>
    </Card>
  )

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
                  <Menu.Item icon={<IconEye size={rem(14)} />}>Publish</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Card.Section>

          <Card.Section mah={250} style={{ overflow: "hidden" }}>
            {image && <Image width={"101%"} height={260} alt="picture" src={image[0].url} />}
          </Card.Section>

          <Card.Section mt="sm">
            <Group position="left" pl={15}>
              <IconHeart size="1.5rem" />
              <IconAt size="1.5rem" />
              <IconArrowUpRightCircle size="1.5rem" />
            </Group>
            <Text size={"xs"} px={15} pt={5} weight={700} color="black">
              1 million likes in the making
            </Text>
            <Text size={"xs"} p={15} color="black">
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
