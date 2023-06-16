import {
  Badge,
  Button,
  Card,
  Group,
  LoadingOverlay,
  ScrollArea,
  Stack,
  Text,
  createStyles,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useCompletion } from "ai/react"
import { useState } from "react"
import toast from "react-hot-toast"
import ChannelSelectionModal from "./ChannelSelectionModal"

export const StreamedHeadline = ({ headline, index, marketingText }) => {
  const [firstRenderHeadline, setFirstRenderHeadline] = useState(true)
  const [loading, setLoading] = useState(false)
  const { classes } = useStyles(undefined, { name: StreamedHeadline.name })

  const handleOpenModal = (id) => {
    const updatedModals = modals.map((modal) =>
      modal.id === id ? { ...modal, isOpen: true } : modal
    )
    setModals(updatedModals)
  }

  const handleCloseModal = (id) => {
    const updatedModals = modals.map((modal) =>
      modal.id === id ? { ...modal, isOpen: false } : modal
    )
    setModals(updatedModals)
  }

  const [modals, setModals] = useState([
    { id: 0, isOpen: false, disclosure: useDisclosure(false) },
    { id: 1, isOpen: false, disclosure: useDisclosure(false) },
    { id: 2, isOpen: false, disclosure: useDisclosure(false) },
  ])

  const { complete, completion, isLoading } = useCompletion({
    api: "/api/completion",
    onResponse: (res) => {
      // trigger something when the response starts streaming in
      // e.g. if the user is rate limited, you can show a toast
      if (res.status === 429) {
        toast.error("You are being rate limited. Please try again later.")
      }
    },
    onFinish: () => {
      // do something with the completion result
      toast.success("Successfully generated completion!")
    },
  })

  const handleStreamHeadline = async () => {
    setFirstRenderHeadline(false)
    await complete(headline)
  }

  return (
    <Card key={index} shadow="sm" padding="lg" radius="md" withBorder maw={395} mih={350}>
      <Stack align="center" justify="space-between" h={400}>
        <Card mih={100}>
          {firstRenderHeadline ? (
            <Text weight={500} pos="relative">
              <LoadingOverlay visible={loading} overlayBlur={2} /> {headline}
            </Text>
          ) : (
            <Text weight={500} pos="relative">
              {completion}
            </Text>
          )}
        </Card>
        <Group position="apart" mb="xs">
          <Button
            onClick={handleStreamHeadline}
            className={classes.button}
            loading={loading}
            disabled={loading}
          >
            New headline
          </Button>
          <Badge color="green" variant="light">
            Live AI content
          </Badge>
        </Group>
        <ChannelSelectionModal
          opened={modals[index]?.isOpen || false}
          close={() => handleCloseModal(index)}
          content={marketingText || ""}
          contentTitle={headline || ""}
        />
        <ScrollArea>
          <Text size="sm" color="dimmed">
            {marketingText}
          </Text>
        </ScrollArea>

        <Button
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={() => handleOpenModal(index)}
        >
          Select a channel for this content
        </Button>
      </Stack>
    </Card>
  )
}

const useStyles = createStyles(() => ({
  root: { width: "100%" },
  button: { backgroundColor: "#00386b" },
}))
