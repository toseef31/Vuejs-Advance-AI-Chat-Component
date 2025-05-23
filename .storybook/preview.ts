import { setup } from '@storybook/vue3'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

setup((app) => {
  app.use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })
})

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
