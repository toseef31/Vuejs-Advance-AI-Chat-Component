import CarouselMessage from '@/components/CarouselMessage.vue';
import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/CarouselMessage',
  component: CarouselMessage,
  argTypes: {
    items: {
      description: 'Array of carousel items with title, description, and img',
      control: { type: 'object' },
    },
  },
} as Meta<typeof CarouselMessage>;

const Template: StoryFn<typeof CarouselMessage> = (args) => ({
  components: { CarouselMessage },
  setup() {
    return { args };
  },
  template: '<CarouselMessage v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      title: 'Item 1',
      description: 'This is the description for item 1.',
      img: 'https://via.placeholder.com/400x250?text=Item+1',
    },
    {
      title: 'Item 2',
      description: 'This is the description for item 2.',
      img: 'https://via.placeholder.com/400x250?text=Item+2',
    },
    {
      title: 'Item 3',
      description: 'This is the description for item 3.',
      img: 'https://via.placeholder.com/400x250?text=Item+3',
    },
    {
      title: 'Item 4',
      description: 'This is the description for item 4.',
      img: 'https://via.placeholder.com/400x250?text=Item+4',
    },
  ],
};
