import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest';

import PrimeVue from 'primevue/config'
import Textarea from 'primevue/textarea'
import Ripple from 'primevue/ripple'
import TextInput from '@/components/InputArea/TextInput.vue'

describe('TextInput', () => {
  it('renders and updates modelValue', async () => {
    const wrapper = mount(TextInput, {
      props: {
        modelValue: 'Initial text'
      },
      global: {
        plugins: [
          [PrimeVue, { ripple: true }]
        ],
        components: {
          Textarea
        },
        directives: {
          ripple: Ripple
        }
      }
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.exists()).toBe(true)
    expect((textarea.element as HTMLTextAreaElement).value).toBe('Initial text')

    await textarea.setValue('Updated text')
    // Wait for Vue to process changes
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue']![0]).toEqual(['Updated text'])
  })
})
