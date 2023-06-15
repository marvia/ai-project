import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Modal, Select, SelectItem, Stack, Text, Title, createStyles } from "@mantine/core"
import { useState } from "react"
import { Controller, set, useForm } from "react-hook-form"
import { ChannelSelectorInput } from "src/core/copy-creator/zod"
import axios from "axios"

const channelOptions: Array<SelectItem> = [
  { label: "Instagram", value: "instagram" },
  { label: "Twitter", value: "twitter" },
  { label: "LinkedIn", value: "linkedin" },
]

interface ChannelSelectionModalProps {
  opened: boolean
  close: () => void
  content: string
  contentTitle: string
}

function ChannelSelectionModal({
  opened,
  close,
  content,
  contentTitle,
}: ChannelSelectionModalProps) {
  const { classes } = useStyles(undefined, { name: ChannelSelectionModal.name })
  const [loading, setLoading] = useState<boolean>(false)
  const [result, setResult] = useState("")
  const [channel, setChannel] = useState("")

  const channelSelectionForm = useForm({
    defaultValues: {
      channel: "",
      content,
    },
    resolver: zodResolver(ChannelSelectorInput),
  })

  const handleSubmit = channelSelectionForm.handleSubmit(async (values) => {
    //TODO: send prompt to backend and create endpoint
    const url = "/api/channel-selector"
    try {
      setLoading(true)
      await axios
        .post(url, { prompt: values })
        .then((response) => setResult(response.data))
        .catch((error) => {
          console.error(error.message)
          throw new Error("FAAAAIIL")
        })
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  })

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Title order={1} align="center" style={{ color: "#00386b" }}>
          Social media channels
        </Title>
      }
      overlayProps={{
        opacity: 0.2,
      }}
      centered
      classNames={{ body: classes.modalBody }}
      size="md"
    >
      {!result && (
        <form onSubmit={handleSubmit}>
          <Stack style={{ minHeight: 300 }} justify="space-between">
            <Controller
              control={channelSelectionForm.control}
              name="channel"
              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  onBlur={() => setChannel(field.value)}
                  data={channelOptions}
                  label="Social media channel"
                  classNames={{ root: classes.root }}
                  disabled={loading}
                  error={fieldState.error && <span>{fieldState.error.message}</span>}
                />
              )}
            />
            <Title order={5} align="center" style={{ color: "#00386b" }}>
              {contentTitle}
            </Title>
            <Text>{content}</Text>

            <Button
              mt="md"
              type="submit"
              loading={loading}
              disabled={loading}
              className={classes.button}
            >
              Create content for this channel
            </Button>
          </Stack>
        </form>
      )}
      {result && (
        <Stack mt="md" style={{ minHeight: 300 }}>
          <Title order={1} style={{ color: "#00386b" }}>
            {channel} post
          </Title>
          <Text>{result}</Text>
        </Stack>
      )}
    </Modal>
  )
}

const useStyles = createStyles(() => ({
  root: { width: "100%" },
  button: {
    backgroundColor: "#00386b",
    width: "100%",
  },
  modalBody: {
    minHeight: 300,
  },
}))

export default ChannelSelectionModal
