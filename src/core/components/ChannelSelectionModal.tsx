import { zodResolver } from "@hookform/resolvers/zod"
import { Group, Modal, Select, SelectItem, Title } from "@mantine/core"
import { useForm } from "react-hook-form"
import { ChannelSelectorInput } from "src/core/copy-creator/zod"

const channelOptions: Array<SelectItem> = [
  { label: "Instagram", value: "instagram" },
  { label: "Twitter", value: "twitter" },
  { label: "LinkedIn", value: "linkedin" },
]

interface ChannelSelectionModalProps {
  opened: boolean
  close: () => void
}

function ChannelSelectionModal({ opened, close }: ChannelSelectionModalProps) {
  const channelSelectionForm = useForm({
    defaultValues: {
      channel: "",
      content: "",
    },
    resolver: zodResolver(ChannelSelectorInput),
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
      size="lg"
      centered
    >
      <Group>
        <Select data={channelOptions} />
      </Group>
    </Modal>
  )
}

export default ChannelSelectionModal
