import type { Meta, StoryObj } from '@storybook/vue3'
import SendButton from '@/components/InputArea/SendButton.vue'

const meta: Meta<typeof SendButton> = {
  title: 'Components/SendButton',
  component: SendButton,
  argTypes: {

    disabled: { control: 'boolean' },
    customClass: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof SendButton>

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Enabled: Story = {
  args: {
    disabled: false,
  },
}


export const CustomDesign: Story = {
  args: {
    customClass: "custom-btn",
  },
}
