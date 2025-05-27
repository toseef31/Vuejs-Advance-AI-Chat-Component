import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SendButton from '@/components/InputArea/SendButton.vue';

vi.mock('primevue/button', () => ({
  default: {
    name: 'Button',
    props: ['icon', 'varient', 'ariaLabel', 'severity', 'type', 'disabled'],
    emits: ['click'],
    template: `
      <button
        :disabled="disabled"
        @click="$emit('click', $event)"
      >
        <slot></slot>
      </button>`
  }
}));

describe('SendButton', () => {
  it('renders the PrimeVue button', () => {
    const wrapper = mount(SendButton);
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
  });

  it('applies the custom class', () => {
    const wrapper = mount(SendButton, {
      props: {
        customClass: 'my-custom-class'
      }
    });
    const button = wrapper.find('button');
    expect(button.classes()).toContain('my-custom-class');
  });

  it('disables the button when `disabled` prop is true', () => {
    const wrapper = mount(SendButton, {
      props: {
        disabled: true
      }
    });
    const button = wrapper.find('button');
    expect(button.element.disabled).toBe(true);
  });

  it('emits `click` event when button is clicked', async () => {
    const wrapper = mount(SendButton);
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('does not emit `click` event if disabled', async () => {
    const wrapper = mount(SendButton, {
      props: {
        disabled: true
      }
    });
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });
});
