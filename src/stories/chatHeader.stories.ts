import type { Meta, StoryObj } from '@storybook/vue3'
import ChatHeader from "@/components/ChatHeader.vue";

const meta: Meta<typeof ChatHeader> = {
  title: 'Components/ChatHeader',
  component: ChatHeader,
  argTypes: {
    title: { control: 'text' },
    isConnected: { control: 'boolean' }
  },
}


export default meta

type Story = StoryObj<typeof ChatHeader>


export const Connected: Story = {
  args: {
    isConnected: true,
    title: 'Here is title of the chat component'
  },
}
