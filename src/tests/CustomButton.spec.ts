import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomButton from '@/components/CustomButton.vue'

describe('CustomButton', () => {
  it('renders the label properly', () => {
    const wrapper = mount(CustomButton, {
      props: {
        label: 'Click Me',
        icon: 'pi pi-check',
        severity: 'danger',
        variant: 'outlined',
        iconPosition: 'right',
        disabled: false,
        ariaLabel: 'submit-button',
        customClass: 'my-custom-class',
      },
    })

    expect(wrapper.text()).toContain('Click Me')

    const button = wrapper.findComponent({ name: 'Button' })
    expect(button.exists()).toBe(true)
    expect(button.props('icon')).toBe('pi pi-check')
    expect(button.props('label')).toBe('Click Me')
    expect(button.props('severity')).toBe('danger')
    expect(button.props('variant')).toBe('outlined')
    expect(button.props('iconPos')).toBe('right')
    expect(button.props('pt')).toEqual({
      root: { class: 'my-custom-class' }
    })
  })

  it('emits click event', async () => {
    const wrapper = mount(CustomButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})

