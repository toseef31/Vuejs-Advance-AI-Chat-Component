import UserMessage from '@/components/UserMessage.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof UserMessage> = {
  title: 'Components/UserMessage',
  component: UserMessage,
  argTypes: {
    message: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof UserMessage>

export const Default: Story = {
  args: {
    message: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta, veritatis.',
  },
}

