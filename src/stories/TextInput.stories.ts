import TextInput from '@/components/InputArea/TextInput.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  argTypes: {
    modelValue: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof TextInput>

export const Default: Story = {
  args: {
    modelValue: '',
  },
}
