import { mount } from '@vue/test-utils'
import { InboxPage } from '@/app/decks/inbox/views'


import { config } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
})

config.global.plugins = [i18n]
// config.global.mocks.$t = (key: any) => key

describe('InboxDeck.vue', () => {
  it('renders', async () => {
    const wrapper = mount(InboxPage
      // ,
      //   {
      //   global: {
      //     plugins: [i18n]
      //   }
      // }
    )
    // const savebutton = wrapper.find('#addVerseButton')
    // savebutton.trigger('click')

    // await wrapper.vm.$nextTick()
    // expect(wrapper.text()).toMatch('BG 1.1')
  })
})
