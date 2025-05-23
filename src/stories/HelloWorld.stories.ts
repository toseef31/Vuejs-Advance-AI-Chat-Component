import BaseButton from "@/components/HelloWorld.vue";

import type { Meta, StoryFn } from '@storybook/vue3'

type BaseButtonProps = {
  icon: string
  ariaLabel?: string
  disabled?: boolean
  severity?: string
  customClass?: string
}

export default {
  title: 'Components/BaseButton',
  component: BaseButton,
} as Meta<BaseButtonProps>

const Template: StoryFn<BaseButtonProps> = (args) => ({
  components: { BaseButton },
  setup() {
    return { args }
  },
  template: '<BaseButton v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
  icon: 'pi pi-send',
  ariaLabel: 'Send',
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  icon: 'pi pi-sync',
}

export const Disabled = Template.bind({})
Disabled.args = {
  icon: 'pi pi-copy',
  disabled: true,
  severity: 'success',
}

export const LikeButton = Template.bind({})
LikeButton.args = {
  icon: 'pi pi-thumbs-up',
  severity: 'success',
  ariaLabel: 'Like',
  customClass: 'bg-green-600 text-white h-20 w-20 rounded-full shadow-lg',
}
